/**
 * GitHub MCP Endpoint
 * Supports BYOK: users can add their own GITHUB_TOKEN in /settings/keys
 */

import { NextRequest, NextResponse } from 'next/server';
import { getCredentialsForMCP } from '@/lib/credentials';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const wallet = request.headers.get('x-wallet-address') || null;
  const { searchParams } = new URL(request.url);
  const tool = searchParams.get('tool') || 'search_repos';
  const query = searchParams.get('query') || '';
  const owner = searchParams.get('owner') || '';
  const repo = searchParams.get('repo') || '';
  const path = searchParams.get('path') || '';
  const per_page = searchParams.get('per_page') || '10';

  let token = '';
  let source = 'anonymous';
  if (wallet) {
    const creds = getCredentialsForMCP(wallet, 'github');
    if (creds['GITHUB_TOKEN']) {
      token = creds['GITHUB_TOKEN'];
      source = 'BYOK';
    }
  }
  if (!token && process.env.GITHUB_TOKEN) {
    token = process.env.GITHUB_TOKEN;
    source = 'env';
  }

  async function githubFetch(url: string) {
    const headers: Record<string, string> = { 'Accept': 'application/vnd.github.v3+json' };
    if (token) headers['Authorization'] = 'Bearer ' + token;
    return fetch(url, { headers });
  }

  try {
    switch (tool) {
      case 'search_repos': {
        if (!query) return NextResponse.json({ error: 'query parameter required' }, { status: 400 });
        const url = 'https://api.github.com/search/repositories?q=' + encodeURIComponent(query) + '&per_page=' + per_page;
        const res = await githubFetch(url);
        if (!res.ok) {
          if (res.status === 401) return NextResponse.json({
            error: 'GitHub authentication failed. Add your GITHUB_TOKEN in /settings/keys',
            hint: 'Generate a token at github.com/settings/tokens with repo scope',
          }, { status: 401 });
          return NextResponse.json({ error: 'GitHub API error', status: res.status }, { status: 502 });
        }
        const data = await res.json();
        return NextResponse.json({
          tool: 'search_repos', query, token_source: source,
          total: data.total_count || 0,
          results: (data.items || []).slice(0, 10).map((r: Record<string, unknown>) => ({
            name: r.full_name, description: r.description, stars: r.stargazers_count,
            language: r.language, url: r.html_url, created: r.created_at,
          })),
        });
      }

      case 'get_issues': {
        if (!owner || !repo) return NextResponse.json({ error: 'owner and repo required' }, { status: 400 });
        const state = searchParams.get('state') || 'open';
        const url = 'https://api.github.com/repos/' + owner + '/' + repo + '/issues?state=' + state + '&per_page=' + per_page;
        const res = await githubFetch(url);
        const data = await res.json();
        return NextResponse.json({
          tool: 'get_issues', repo: owner + '/' + repo, token_source: source,
          count: Array.isArray(data) ? data.length : 0,
          issues: (Array.isArray(data) ? data : []).map((i: Record<string, unknown>) => ({
            number: i.number, title: i.title, state: i.state, url: i.html_url,
            created: i.created_at,
            labels: (i.labels as Array<{name: string}> || []).map(l => l.name),
          })),
        });
      }

      case 'get_file': {
        if (!owner || !repo || !path) return NextResponse.json({ error: 'owner, repo, and path required' }, { status: 400 });
        const ref = searchParams.get('ref') || 'main';
        const url = 'https://api.github.com/repos/' + owner + '/' + repo + '/contents/' + path + '?ref=' + ref;
        const res = await githubFetch(url);
        if (!res.ok) return NextResponse.json({ error: (await res.json()).message || 'File not found' }, { status: res.status });
        const data = await res.json();
        return NextResponse.json({ tool: 'get_file', repo: owner + '/' + repo, path, ref, content: Buffer.from(data.content || '', 'base64').toString('utf-8'), sha: data.sha, size: data.size });
      }

      case 'get_commits': {
        if (!owner || !repo) return NextResponse.json({ error: 'owner and repo required' }, { status: 400 });
        const url = 'https://api.github.com/repos/' + owner + '/' + repo + '/commits?per_page=' + per_page;
        const res = await githubFetch(url);
        const data = await res.json();
        return NextResponse.json({
          tool: 'get_commits', repo: owner + '/' + repo, token_source: source,
          commits: (Array.isArray(data) ? data : []).map((c: Record<string, unknown>) => ({
            sha: (c as {sha: string}).sha?.slice(0, 7),
            message: ((c as {commit: {message: string}}).commit?.message || '').split('\n')[0],
            author: (c as {commit: {author: {name: string}}}).commit?.author?.name,
            date: (c as {commit: {author: {date: string}}}).commit?.author?.date,
            url: c.html_url,
          })),
        });
      }

      case 'get_pulls': {
        if (!owner || !repo) return NextResponse.json({ error: 'owner and repo required' }, { status: 400 });
        const state = searchParams.get('state') || 'open';
        const url = 'https://api.github.com/repos/' + owner + '/' + repo + '/pulls?state=' + state + '&per_page=' + per_page;
        const res = await githubFetch(url);
        const data = await res.json();
        return NextResponse.json({
          tool: 'get_pulls', repo: owner + '/' + repo, token_source: source,
          count: Array.isArray(data) ? data.length : 0,
          pulls: (Array.isArray(data) ? data : []).map((p: Record<string, unknown>) => ({
            number: p.number, title: p.title, state: p.state, url: p.html_url, created: p.created_at, merged: p.merged,
          })),
        });
      }

      default:
        return NextResponse.json({
          available_tools: [
            { name: 'search_repos', params: ['query', 'per_page'], description: 'Search GitHub repositories' },
            { name: 'get_issues', params: ['owner', 'repo', 'state', 'per_page'], description: 'List repository issues' },
            { name: 'get_pulls', params: ['owner', 'repo', 'state', 'per_page'], description: 'List pull requests' },
            { name: 'get_file', params: ['owner', 'repo', 'path', 'ref'], description: 'Read a file from a repository' },
            { name: 'get_commits', params: ['owner', 'repo', 'per_page'], description: 'Get commit history' },
          ],
        });
    }
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: { 'Access-Control-Allow-Origin': '*' } });
}
