/**
 * Demo GitHub MCP - actually works!
 * Proxies GitHub API calls. GitHub is free tier on OMA-AI.
 * 
 * GET  /api/demo/github  — healthcheck
 * POST /api/demo/github — tool call { tool: string, args: object }
 */

import { NextRequest, NextResponse } from 'next/server';
import { createPaymentRequirement, encodePaymentRequirement } from '@/lib/x402/server';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';
const RECIPIENT = process.env.NEXT_PUBLIC_WALLET_ADDRESS || '0x0000000000000000000000000000000000000000';

function createGitHubPaymentReq() {
  return createPaymentRequirement({
    recipientAddress: RECIPIENT,
    network: 'base',
    price: '$0.00',
    description: 'GitHub MCP -- free tier',
  });
}

async function githubApiGet(endpoint: string) {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  if (GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
  } else {
    headers['User-Agent'] = 'OMA-AI-MCP-Demo/1.0';
  }

  const res = await fetch(`https://api.github.com${endpoint}`, { headers });
  
  if (!res.ok) {
    if (res.status === 403 && !GITHUB_TOKEN) {
      return { rateLimited: true, message: 'GitHub API rate limit reached. Set GITHUB_TOKEN env var for higher limits.' };
    }
    throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

async function handleToolCall(tool: string, args: Record<string, unknown>) {
  switch (tool) {
    case 'search_repos': {
      const q = args.query as string || '';
      const page = (args.page as number) || 1;
      const per_page = Math.min((args.per_page as number) || 10, 100);
      const data = await githubApiGet(`/search/repositories?q=${encodeURIComponent(q)}&page=${page}&per_page=${per_page}`);
      return {
        items: (data.items || []).map((r: Record<string, unknown>) => ({
          name: r.name,
          full_name: r.full_name,
          description: r.description,
          stars: r.stargazers_count,
          language: r.language,
          url: r.html_url,
          owner: { login: (r.owner as Record<string, unknown>)?.login, avatar_url: (r.owner as Record<string, unknown>)?.avatar_url },
        })),
        total_count: data.total_count,
      };
    }

    case 'get_issues': {
      const owner = args.owner as string;
      const repo = args.repo as string;
      const state = (args.state as string) || 'open';
      const data = await githubApiGet(`/repos/${owner}/${repo}/issues?state=${state}&per_page=20`);
      return Array.isArray(data) ? data.map((i: Record<string, unknown>) => ({
        number: i.number, title: i.title, state: i.state,
        labels: (i.labels as Record<string, unknown>[])?.map((l: Record<string, unknown>) => l.name),
        url: i.html_url, created_at: i.created_at,
      })) : [];
    }

    case 'get_pulls': {
      const owner = args.owner as string;
      const repo = args.repo as string;
      const data = await githubApiGet(`/repos/${owner}/${repo}/pulls?state=open&per_page=20`);
      return Array.isArray(data) ? data.map((pr: Record<string, unknown>) => ({
        number: pr.number, title: pr.title, state: pr.state,
        head: { ref: (pr.head as Record<string, unknown>)?.ref, sha: (pr.head as Record<string, unknown>)?.sha },
        base: { ref: (pr.base as Record<string, unknown>)?.ref },
        url: pr.html_url, draft: pr.draft,
      })) : [];
    }

    case 'get_file': {
      const owner = args.owner as string;
      const repo = args.repo as string;
      const path = args.path as string;
      const ref = (args.ref as string) || 'main';
      const data = await githubApiGet(`/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}?ref=${ref}`);
      return {
        name: data.name,
        path: data.path,
        sha: data.sha,
        content: data.content ? Buffer.from(data.content, 'base64').toString('utf-8') : null,
        encoding: data.encoding,
      };
    }

    case 'get_commits': {
      const owner = args.owner as string;
      const repo = args.repo as string;
      const per_page = Math.min((args.per_page as number) || 10, 100);
      const data = await githubApiGet(`/repos/${owner}/${repo}/commits?per_page=${per_page}`);
      return Array.isArray(data) ? data.map((c: Record<string, unknown>) => {
        const commitMsg = (c.commit as Record<string, unknown>)?.message as string | undefined;
        const firstLine = commitMsg ? commitMsg.split('\n')[0] : undefined;
        const commitAuthor = (c.commit as Record<string, unknown>)?.author as Record<string, unknown> | undefined;
        return {
          sha: (c.sha as string)?.slice(0, 7),
          message: firstLine,
          author: { name: commitAuthor?.name, date: commitAuthor?.date },
          url: c.html_url,
        };
      }) : [];
    }

    case 'create_issue': {
      if (!GITHUB_TOKEN) {
        return { error: 'create_issue requires GITHUB_TOKEN to be set', requires_auth: true };
      }
      const owner = args.owner as string;
      const repo = args.repo as string;
      const title = args.title as string;
      const body = args.body as string || '';
      const labels = (args.labels as string[]) || [];
      const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, body, labels }),
      });
      const data = await res.json();
      return { number: data.number, title: data.title, url: data.html_url, state: data.state };
    }

    default:
      return { error: `Unknown tool: ${tool}`, available_tools: ['search_repos', 'get_issues', 'get_pulls', 'get_file', 'get_commits', 'create_issue'] };
  }
}

export async function GET() {
  return NextResponse.json({
    name: 'GitHub MCP (Demo)',
    status: 'operational',
    x402_enabled: false,
    tier: 'free',
    token_configured: !!GITHUB_TOKEN,
    tools: ['search_repos', 'get_issues', 'get_pulls', 'get_file', 'get_commits', 'create_issue'],
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tool, args = {} } = body as { tool: string; args?: Record<string, unknown> };

    if (!tool) {
      return NextResponse.json({ error: 'Missing tool name' }, { status: 400 });
    }

    const paymentReq = createGitHubPaymentReq();
    const paymentHeader = encodePaymentRequirement(paymentReq);
    const result = await handleToolCall(tool, args);

    return NextResponse.json(
      { result, tool, payment_required: false },
      {
        headers: {
          'X-Payment-Required': paymentHeader,
          'X-MCP-Tool': tool,
        },
      }
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Internal error';
    console.error('[/api/demo/github]', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
