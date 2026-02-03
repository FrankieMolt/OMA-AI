# Docker Deployment

Deploy OpenMarketAccess using Docker and Docker Compose.

## Prerequisites

- Docker 20.10 or higher
- Docker Compose 2.0 or higher

## Quick Start

### Using Docker Image

```bash
docker run -d \
  --name oma-app \
  -p 3000:3000 \
  -e OMA_API_KEY=your_api_key \
  -e OMA_API_URL=https://api.openmarketaccess.com/v1 \
  openmarketaccess/app:latest
```

### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  oma-app:
    image: openmarketaccess/app:latest
    ports:
      - "3000:3000"
    environment:
      - OMA_API_KEY=${OMA_API_KEY}
      - OMA_API_URL=${OMA_API_URL}
      - OMA_WEBHOOK_SECRET=${OMA_WEBHOOK_SECRET}
      - NODE_ENV=production
    restart: unless-stopped
    depends_on:
      - redis
    networks:
      - oma-network

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data
    restart: unless-stopped
    networks:
      - oma-network

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
    depends_on:
      - oma-app
    restart: unless-stopped
    networks:
      - oma-network

volumes:
  redis-data:

networks:
  oma-network:
    driver: bridge
```

Run with Docker Compose:

```bash
docker-compose up -d
```

## Configuration

### Environment Variables

Create `.env` file:

```env
OMA_API_KEY=your_api_key_here
OMA_API_URL=https://api.openmarketaccess.com/v1
OMA_WEBHOOK_SECRET=your_webhook_secret_here
NODE_ENV=production
PORT=3000
REDIS_URL=redis://redis:6379
```

### Custom Dockerfile

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy application code
COPY . .

# Build application
RUN npm run build

# Expose port
EXPOSE 3000

# Start application
CMD ["node", "dist/index.js"]
```

Build custom image:

```bash
docker build -t oma-app:latest .
```

## Nginx Configuration

Create `nginx.conf`:

```nginx
events {
    worker_connections 1024;
}

http {
    upstream oma-app {
        server oma-app:3000;
    }

    server {
        listen 80;
        server_name yourdomain.com;

        location / {
            proxy_pass http://oma-app;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        location /webhook {
            proxy_pass http://oma-app;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_read_timeout 300s;
        }
    }

    server {
        listen 443 ssl http2;
        server_name yourdomain.com;

        ssl_certificate /etc/nginx/ssl/fullchain.pem;
        ssl_certificate_key /etc/nginx/ssl/privkey.pem;

        location / {
            proxy_pass http://oma-app;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
```

## Health Checks

```yaml
services:
  oma-app:
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

## Monitoring

### Logging

```yaml
services:
  oma-app:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

### Monitoring with Prometheus

```yaml
services:
  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus-data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3001:3000"
    volumes:
      - grafana-data:/var/lib/grafana

volumes:
  prometheus-data:
  grafana-data:
```

## Scaling

### Docker Swarm

```bash
# Initialize swarm
docker swarm init

# Deploy stack
docker stack deploy -c docker-compose.yml oma

# Scale service
docker service scale oma_oma-app=3
```

### Kubernetes

See [Kubernetes Deployment](kubernetes.md) for K8s deployment.

## Backup and Restore

### Backup

```bash
# Backup volumes
docker run --rm \
  -v oma_redis-data:/data \
  -v $(pwd):/backup \
  alpine tar czf /backup/redis-backup.tar.gz /data
```

### Restore

```bash
# Restore volumes
docker run --rm \
  -v oma_redis-data:/data \
  -v $(pwd):/backup \
  alpine tar xzf /backup/redis-backup.tar.gz -C /
```

## Security Best Practices

1. **Use non-root user** in Dockerfile
2. **Scan images** for vulnerabilities
3. **Use secrets** for sensitive data
4. **Limit resource usage**
5. **Keep images updated**
6. **Use read-only filesystems**

## Troubleshooting

### View Logs

```bash
docker-compose logs -f oma-app
```

### Restart Services

```bash
docker-compose restart oma-app
```

### Clean Up

```bash
docker-compose down -v
```

## See Also

- [Kubernetes Deployment](kubernetes.md)
- [Environment Variables](env-vars.md)
- [Scaling Guide](scaling.md)
