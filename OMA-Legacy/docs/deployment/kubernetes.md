# Kubernetes Deployment

Deploy OpenMarketAccess on Kubernetes.

## Prerequisites

- Kubernetes 1.25 or higher
- kubectl configured
- Helm 3.0 or higher (optional)

## Quick Start

### Using Helm Chart

```bash
# Add repository
helm repo add openmarketaccess https://charts.openmarketaccess.com

# Install chart
helm install oma openmarketaccess/oma \
  --set apikey=your_api_key \
  --set webhookSecret=your_webhook_secret
```

### Manual Deployment

Create `deployment.yaml`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: oma-app
  labels:
    app: oma-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: oma-app
  template:
    metadata:
      labels:
        app: oma-app
    spec:
      containers:
      - name: oma-app
        image: openmarketaccess/app:latest
        ports:
        - containerPort: 3000
        env:
        - name: OMA_API_KEY
          valueFrom:
            secretKeyRef:
              name: oma-secrets
              key: api-key
        - name: OMA_API_URL
          value: "https://api.openmarketaccess.com/v1"
        - name: OMA_WEBHOOK_SECRET
          valueFrom:
            secretKeyRef:
              name: oma-secrets
              key: webhook-secret
        - name: NODE_ENV
          value: "production"
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: oma-app
spec:
  selector:
    app: oma-app
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3000
  type: LoadBalancer
```

Apply deployment:

```bash
kubectl apply -f deployment.yaml
```

## Secrets

Create `secrets.yaml`:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: oma-secrets
type: Opaque
stringData:
  api-key: your_api_key_here
  webhook-secret: your_webhook_secret_here
  redis-password: your_redis_password_here
```

Apply secrets:

```bash
kubectl apply -f secrets.yaml
```

## ConfigMaps

Create `configmap.yaml`:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: oma-config
data:
  NODE_ENV: "production"
  PORT: "3000"
  LOG_LEVEL: "info"
```

Apply configmap:

```bash
kubectl apply -f configmap.yaml
```

## Ingress

Create `ingress.yaml`:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: oma-ingress
  annotations:
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
spec:
  ingressClassName: nginx
  tls:
  - hosts:
    - yourdomain.com
    secretName: oma-tls
  rules:
  - host: yourdomain.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: oma-app
            port:
              number: 80
```

Apply ingress:

```bash
kubectl apply -f ingress.yaml
```

## Horizontal Pod Autoscaler

Create `hpa.yaml`:

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: oma-app-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: oma-app
  minReplicas: 3
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
```

Apply HPA:

```bash
kubectl apply -f hpa.yaml
```

## Redis Deployment

Create `redis.yaml`:

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: redis
spec:
  serviceName: redis
  replicas: 1
  selector:
    matchLabels:
      app: redis
  template:
    metadata:
      labels:
        app: redis
    spec:
      containers:
      - name: redis
        image: redis:7-alpine
        ports:
        - containerPort: 6379
        env:
        - name: REDIS_PASSWORD
          valueFrom:
            secretKeyRef:
              name: oma-secrets
              key: redis-password
        volumeMounts:
        - name: redis-data
          mountPath: /data
  volumeClaimTemplates:
  - metadata:
      name: redis-data
    spec:
      accessModes: ["ReadWriteOnce"]
      resources:
        requests:
          storage: 1Gi
---
apiVersion: v1
kind: Service
metadata:
  name: redis
spec:
  selector:
    app: redis
  ports:
  - port: 6379
    targetPort: 6379
```

Apply Redis:

```bash
kubectl apply -f redis.yaml
```

## Monitoring

### Prometheus ServiceMonitor

Create `servicemonitor.yaml`:

```yaml
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: oma-app
  labels:
    app: oma-app
spec:
  selector:
    matchLabels:
      app: oma-app
  endpoints:
  - port: http
    path: /metrics
    interval: 30s
```

## Helm Chart Values

Create `values.yaml`:

```yaml
image:
  repository: openmarketaccess/app
  tag: latest
  pullPolicy: Always

replicaCount: 3

resources:
  requests:
    memory: 256Mi
    cpu: 250m
  limits:
    memory: 512Mi
    cpu: 500m

autoscaling:
  enabled: true
  minReplicas: 3
  maxReplicas: 10
  targetCPUUtilizationPercentage: 70
  targetMemoryUtilizationPercentage: 80

ingress:
  enabled: true
  className: nginx
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
  hosts:
    - host: yourdomain.com
      paths:
        - path: /
          pathType: Prefix
  tls:
    - secretName: oma-tls
      hosts:
        - yourdomain.com

redis:
  enabled: true
  persistence:
    enabled: true
    size: 1Gi
```

Install with custom values:

```bash
helm install oma openmarketaccess/oma -f values.yaml
```

## Rollout Strategies

### Rolling Update

```bash
kubectl set image deployment/oma-app oma-app=openmarketaccess/app:v2
```

### Canary Deployment

```yaml
apiVersion: flagger.app/v1beta1
kind: Canary
metadata:
  name: oma-app
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: oma-app
  service:
    port: 80
  analysis:
    interval: 1m
    threshold: 5
    maxWeight: 50
    stepWeight: 10
    metrics:
    - name: request-success-rate
      thresholdRange:
        min: 99
      interval: 1m
```

## Backup and Restore

### Velero Backup

```bash
# Install Velero
velero install --provider aws --plugins velero/velero-plugin-for-aws:v1.5.0

# Create backup
velero backup create oma-backup --include-namespaces oma

# Restore backup
velero restore create --from-backup oma-backup
```

## Troubleshooting

### View Logs

```bash
kubectl logs -f deployment/oma-app
```

### Describe Pod

```bash
kubectl describe pod <pod-name>
```

### Scale Deployment

```bash
kubectl scale deployment oma-app --replicas=5
```

### Rollback

```bash
kubectl rollout undo deployment/oma-app
```

## See Also

- [Docker Deployment](docker.md)
- [Environment Variables](env-vars.md)
- [Scaling Guide](scaling.md)
