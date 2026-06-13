import { test, expect } from '@playwright/test';

test.describe('GitHub MCP API', () => {
  test('search_repos should return JSON with results array', async ({ request }) => {
    const response = await request.get('http://localhost:3000/api/mcp/github?tool=search_repos&query=Solana');
    
    // Should return 200 OK
    expect(response.status()).toBe(200);
    
    const json = await response.json();
    
    // Should have results array
    expect(json).toHaveProperty('results');
    expect(Array.isArray(json.results)).toBe(true);
    
    // Should have query echo
    expect(json.query).toBe('Solana');
    
    // Results should have repository data
    if (json.results.length > 0) {
      const firstResult = json.results[0];
      expect(firstResult).toHaveProperty('name');
      expect(firstResult).toHaveProperty('description');
      expect(firstResult).toHaveProperty('stars');
      expect(firstResult).toHaveProperty('url');
    }
  });

  test('get_issues should return JSON with issues', async ({ request }) => {
    const response = await request.get('http://localhost:3000/api/mcp/github?tool=get_issues&owner=tinygrad&repo=tinygrad');
    
    // Should return 200 OK
    expect(response.status()).toBe(200);
    
    const json = await response.json();
    
    // Should have issues array
    expect(json).toHaveProperty('issues');
    expect(Array.isArray(json.issues)).toBe(true);
    
    // Should echo the repo
    expect(json.repo).toBe('tinygrad/tinygrad');
    
    // Issues should have expected fields
    if (json.issues.length > 0) {
      const firstIssue = json.issues[0];
      expect(firstIssue).toHaveProperty('number');
      expect(firstIssue).toHaveProperty('title');
      expect(firstIssue).toHaveProperty('state');
      expect(firstIssue).toHaveProperty('url');
    }
  });

  test('get_file with valid ref should return file content', async ({ request }) => {
    // Use master branch which is what tinygrad uses
    const response = await request.get('http://localhost:3000/api/mcp/github?tool=get_file&owner=tinygrad&repo=tinygrad&path=README.md&ref=master');
    
    // Should return 200 OK
    expect(response.status()).toBe(200);
    
    const json = await response.json();
    
    // Should have content
    expect(json).toHaveProperty('content');
    expect(typeof json.content).toBe('string');
    expect(json.content.length).toBeGreaterThan(0);
    
    // Should have repo and path info
    expect(json.repo).toBe('tinygrad/tinygrad');
    expect(json.path).toBe('README.md');
  });

  test('missing params should return 400 error', async ({ request }) => {
    // search_repos without query
    const response = await request.get('http://localhost:3000/api/mcp/github?tool=search_repos');
    expect(response.status()).toBe(400);
    
    // get_issues without owner
    const response2 = await request.get('http://localhost:3000/api/mcp/github?tool=get_issues&repo=tinygrad');
    expect(response2.status()).toBe(400);
  });
});
