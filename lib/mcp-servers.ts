// MCP Servers Available on OMA-AI

export const mcpServers = [
  {
    id: 'mcp-database',
    name: 'PostgreSQL',
    description: 'Connect to PostgreSQL databases from AI agents',
    category: 'Database',
    price: '0.002',
    downloads: 1250,
    rating: 4.8,
    x402_enabled: true,
    config_schema: {
      type: 'object',
      properties: {
        host: { type: 'string' },
        port: { type: 'number' },
        database: { type: 'string' },
        credentials: { type: 'object' },
        connection_string: { type: 'string' }
      }
    },
    endpoints: [
      { method: 'query', description: 'Execute SQL queries' },
      { method: 'schema', description: 'Get database schema' },
      { method: 'health', description: 'Check connection health' }
    ]
  },
  {
    id: 'mcp-vector',
    name: 'Pinecone Vector DB',
    description: 'Vector embeddings for AI agents',
    category: 'Database',
    price: '0.003',
    downloads: 980,
    rating: 4.7,
    x402_enabled: true,
    config_schema: {
      type: 'object',
      properties: {
        api_key: { type: 'string' },
        environment: { type: 'string', enum: ['us-east-1', 'us-west-2', 'eu-west-1'] }
      }
    },
    endpoints: [
      { method: 'upsert', description: 'Upsert vectors' },
      { method: 'query', description: 'Query vectors by similarity' },
      { method: 'delete', description: 'Delete vectors' }
    ]
  },
  {
    id: 'mcp-filesystem',
    name: 'File System Access',
    description: 'Read/write files for AI agents',
    category: 'Utilities',
    price: '0.001',
    downloads: 2340,
    rating: 4.9,
    x402_enabled: false,
    config_schema: {
      type: 'object',
      properties: {
        allowed_paths: { type: 'array', items: { type: 'string' } },
        max_file_size: { type: 'number', default: 10485760 }, // 100MB
        read_only: { type: 'boolean' }
      }
    },
    endpoints: [
      { method: 'read', description: 'Read file' },
      { method: 'write', description: 'Write file' },
      { method: 'list', description: 'List directory' },
      { method: 'search', description: 'Search files' }
    ]
  },
  {
    id: 'mcp-sqlite',
    name: 'SQLite Database',
    description: 'Lightweight SQL database for AI agents',
    category: 'Database',
    price: '0.001',
    downloads: 1890,
    rating: 4.6,
    x402_enabled: false,
    config_schema: {
      type: 'object',
      properties: {
        db_path: { type: 'string' },
        read_only: { type: 'boolean' }
      }
    },
    endpoints: [
      { method: 'query', description: 'Execute SQL query' },
      { method: 'table', description: 'Get table list' },
      { method: 'schema', description: 'Get database schema' }
    ]
  },
  {
    id: 'mcp-redis',
    name: 'Redis Cache',
    description: 'In-memory caching for AI agents',
    category: 'Database',
    price: '0.0015',
    downloads: 1560,
    rating: 4.7,
    x402_enabled: true,
    config_schema: {
      type: 'object',
      properties: {
        host: { type: 'string' },
        port: { type: 'number' },
        password: { type: 'string' },
        db: { type: 'number', default: 0 }
      }
    },
    endpoints: [
      { method: 'get', description: 'Get value' },
      { method: 'set', description: 'Set value' },
      { method: 'delete', description: 'Delete value' },
      { method: 'exists', description: 'Check if key exists' }
    ]
  },
  {
    id: 'mcp-graphql',
    name: 'GraphQL Client',
    description: 'GraphQL queries for AI agents',
    category: 'Database',
    price: '0.002',
    downloads: 870,
    rating: 4.5,
    x402_enabled: false,
    config_schema: {
      type: 'object',
      properties: {
        endpoint: { type: 'string' },
        headers: { type: 'object' }
      }
    },
    endpoints: [
      { method: 'query', description: 'Execute GraphQL query' },
      { method: 'introspection', description: 'Get schema' }
    ]
  },
  {
    id: 'mcp-firebase',
    name: 'Firebase Realtime DB',
    description: 'Real-time database for AI agents',
    category: 'Database',
    price: '0.0025',
    downloads: 1120,
    rating: 4.6,
    x402_enabled: true,
    config_schema: {
      type: object',
      properties: {
        apiKey: { type: 'string' },
        authDomain: { type: 'string' },
        databaseUrl: { type: 'string' }
      }
    },
    endpoints: [
      { method: 'get', description: 'Get document' },
      { method: 'set', description: 'Set document' },
      { method: 'subscribe', description: 'Subscribe to changes' }
    ]
  },
  {
    id: 'mcp-s3',
    name: 'S3 Compatible Storage',
    description: 'AWS S3 object storage for AI agents',
    category: 'Storage',
    price: '0.001',
    downloads: 2100,
    rating: 4.8,
    x402_enabled: false,
    config_schema: {
      type: 'object',
      properties: {
        endpoint: { type: 'string' },
        accessKey: { type: 'string' },
        secretKey: { type: 'string' },
        region: { type: 'string' }
      }
    },
    endpoints: [
      { method: 'get', description: 'Get object' },
      { method: 'put', description: 'Upload object' },
      { method: 'list', description: 'List objects' },
      { method: 'delete', description: 'Delete object' }
    ]
  },
  {
    id: 'mcp-mongodb',
    name: 'MongoDB',
    description: 'Document database for AI agents',
    category: 'Database',
    price: '0.002',
    downloads: 1940,
    rating: 4.7,
    x402_enabled: true,
    config_schema: {
      type: 'object',
      properties: {
        connectionString: { type: 'string' },
        databaseName: { type: 'string' }
      }
    },
    endpoints: [
      { method: 'find', description: 'Find documents' },
      { method: 'insert', description: 'Insert document' },
      { method: 'update', description: 'Update document' },
      {method: 'aggregate', description: 'Run aggregation' }
    ]
  }
];

export async function getAllMCPServers(): Promise<typeof mcpServers> {
  return mcpServers;
}

export function getMCPById(id: string) {
  return mcpServers.find(m => m.id === id);
}

export function getMCPsByCategory(category: string) {
  return mcpServers.filter(m => m.category === category);
}

export function getFreeMCPServers() {
  return mcpServers.filter(m => !m.x402_enabled);
}

export function getPremiumMCPServers() {
  return mcpServers.filter(m => m.x402_enabled);
}
