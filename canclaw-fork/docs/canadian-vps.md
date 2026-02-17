# Deploy CanClaw on Canadian VPS

## 🦞🇨🇦 Sovereign Canadian AI in the Cloud

This guide helps you deploy CanClaw on a Canadian VPS (Virtual Private Server), keeping your data in Canada while enjoying cloud convenience.

---

## Why a Canadian VPS?

### Benefits:
- **Data Residency**: Your data stays in Canadian data centers
- **PIPEDA Compliance**: Subject to Canadian privacy law
- **Always Online**: 24/7 availability
- **Access Anywhere**: Use CanClaw from any device
- **Cheap**: Starting at $5-15/month

### Recommended Providers:

| Provider | Location | Price/Month | Link |
|----------|----------|-------------|------|
| **IONOS.ca** | Toronto, ON | $5-12 | [ionos.ca](https://ionos.ca) |
| **OVHcloud Canada** | Beauharnois, QC | $5-15 | [ovhcloud.com](https://ovhcloud.com) |
| **HostPapa** | Toronto, ON | $10-20 | [hostpapa.ca](https://hostpapa.ca) |
| **Websavers** | Halifax, NS | $15-30 | [websavers.ca](https://websavers.ca) |

**Recommendation**: Start with IONOS.ca (cheapest) or OVHcloud (good balance).

---

## Quick Start (5 Minutes)

### 1. Create VPS

```bash
# Sign up at your chosen provider
# Recommended specs for CanClaw:
# - RAM: 4GB minimum (8GB recommended)
# - CPU: 2 cores minimum
# - Storage: 40GB SSD
# - OS: Ubuntu 22.04 LTS
# - Location: Toronto or Montreal (Canada)
```

### 2. Connect to VPS

```bash
# SSH into your VPS
ssh root@YOUR_VPS_IP

# Or use SSH key:
ssh -i ~/.ssh/your_key user@YOUR_VPS_IP
```

### 3. Install Docker

```bash
# Update system
apt update && apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Install Docker Compose
apt install docker-compose-plugin -y

# Add user to docker group
usermod -aG docker $USER
newgrp docker
```

### 4. Deploy CanClaw

```bash
# Create directory
mkdir -p /opt/canclaw
cd /opt/canclaw

# Clone repository
git clone https://github.com/canclaw/canclaw.git .

# Copy environment config
cp .env.example .env

# Edit config (optional)
nano .env

# Deploy with Docker Compose
docker compose -f docker/docker-compose.sovereign.yml up -d

# Check status
docker compose -f docker/docker-compose.sovereign.yml ps
docker logs -f canclaw-app
```

### 5. Access CanClaw

```bash
# CanClaw is now running on:
http://YOUR_VPS_IP:3000

# To make it accessible via HTTPS, set up a reverse proxy
# See "HTTPS Setup" section below
```

---

## Detailed Setup

### Step 1: Choose Your Plan

#### Budget Option (~$5/month)
```
Provider: IONOS.ca
Plan: VPS Linux XS
Specs: 1 vCPU, 512MB RAM, 10GB SSD
Note: Minimum viable, slower performance
Recommendation: Use smaller models (gemma3:4b)
```

#### Recommended Option (~$10/month)
```
Provider: OVHcloud
Plan: Starter
Specs: 2 vCPUs, 4GB RAM, 20GB SSD
Note: Good balance of price/performance
Recommendation: Use qwen3:8b or llama3.1:8b
```

#### Performance Option (~$15/month)
```
Provider: IONOS.ca
Plan: VPS Linux L
Specs: 2 vCPUs, 8GB RAM, 80GB SSD
Note: Great performance
Recommendation: Use larger models or multiple models
```

### Step 2: Security Hardening

```bash
# Update system
apt update && apt upgrade -y

# Install fail2ban
apt install fail2ban -y

# Configure firewall
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 3000/tcp
ufw enable

# Create non-root user
adduser canclaw
usermod -aG sudo canclaw
usermod -aG docker canclaw

# Disable root login
sed -i 's/PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config
systemctl restart sshd
```

### Step 3: HTTPS Setup (Recommended)

```bash
# Install Nginx
apt install nginx certbot python3-certbot-nginx -y

# Create Nginx config
cat > /etc/nginx/sites-available/canclaw << 'EOF'
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

# Enable site
ln -s /etc/nginx/sites-available/canclaw /etc/nginx/sites-enabled/
rm /etc/nginx/sites-enabled/default
nginx -t
systemctl restart nginx

# Get SSL certificate
certbot --nginx -d your-domain.com

# Auto-renewal
systemctl enable certbot.timer
```

### Step 4: Model Management

```bash
# SSH into VPS
ssh canclaw@YOUR_VPS_IP

# Pull models
docker exec -it canclaw-ollama ollama pull qwen3:8b
docker exec -it canclaw-ollama ollama pull llama3.1:8b

# List models
docker exec -it canclaw-ollama ollama list

# Remove model if needed
docker exec -it canclaw-ollama ollama rm gemma3:4b
```

### Step 5: Backup Strategy

```bash
# Create backup script
cat > /opt/canclaw/backup.sh << 'EOF'
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/canclaw"
mkdir -p $BACKUP_DIR

# Backup CanClaw memory
tar czf $BACKUP_DIR/memory_$DATE.tar.gz /opt/canclaw/memory

# Backup Ollama models (optional, large)
# tar czf $BACKUP_DIR/ollama_$DATE.tar.gz /var/lib/docker/volumes/canclaw_ollama-data

# Keep only last 7 backups
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete

echo "Backup completed: $DATE"
EOF

chmod +x /opt/canclaw/backup.sh

# Add to crontab (daily at 2 AM)
crontab -l | { cat; echo "0 2 * * * /opt/canclaw/backup.sh >> /var/log/canclaw-backup.log 2>&1"; } | crontab -
```

---

## Provider-Specific Guides

### IONOS.ca

```bash
# 1. Sign up at ionos.ca
# 2. Choose "VPS Linux" plan
# 3. Select location: Toronto
# 4. Choose OS: Ubuntu 22.04
# 5. Complete setup
# 6. Note your IP address

# Default credentials sent via email
# Change password on first login

# Follow general setup above
```

### OVHcloud Canada

```bash
# 1. Sign up at ovhcloud.com
# 2. Choose "VPS" product
# 3. Select datacenter: Beauharnois (Quebec)
# 4. Choose distribution: Ubuntu 22.04
# 5. Complete setup

# OVH uses different SSH key setup
# Upload your SSH key in control panel

# Follow general setup above
```

### HostPapa

```bash
# 1. Sign up at hostpapa.ca
# 2. Choose "VPS Hosting"
# 3. Select location: Toronto
# 4. Complete setup

# HostPapa uses cPanel for management
# SSH access available

# Follow general setup above
```

---

## Monitoring & Maintenance

### Check Status

```bash
# View containers
docker compose -f docker/docker-compose.sovereign.yml ps

# View logs
docker logs -f canclaw-app
docker logs -f canclaw-ollama

# System resources
htop
df -h
free -h
```

### Update CanClaw

```bash
cd /opt/canclaw

# Pull latest code
git pull origin main

# Rebuild and restart
docker compose -f docker/docker-compose.sovereign.yml down
docker compose -f docker/docker-compose.sovereign.yml up -d --build

# Check status
docker compose -f docker/docker-compose.sovereign.yml ps
```

### Troubleshooting

**CanClaw not responding:**
```bash
# Check if running
docker ps

# Restart
docker compose -f docker/docker-compose.sovereign.yml restart canclaw

# Check logs
docker logs canclaw-app
```

**Out of memory:**
```bash
# Check memory usage
free -h
docker stats

# Stop unused containers
docker compose -f docker/docker-compose.sovereign.yml down

# Use smaller model
# Edit .env: OLLAMA_MODEL=gemma3:4b
```

**Ollama not starting:**
```bash
# Check GPU availability (if applicable)
nvidia-smi

# Pull model manually
docker exec -it canclaw-ollama ollama pull qwen3:8b

# Check Ollama logs
docker logs canclaw-ollama
```

---

## Security Checklist

- [ ] Firewall enabled (UFW)
- [ ] Fail2ban installed
- [ ] SSH key authentication only
- [ ] Root login disabled
- [ ] Regular system updates
- [ ] HTTPS enabled
- [ ] Backups configured
- [ ] Log monitoring
- [ ] Docker security options enabled
- [ ] No unnecessary ports open

---

## Cost Breakdown

### Monthly Costs (CAD)

| Component | Cost |
|-----------|------|
| VPS (IONOS XS) | $5 |
| VPS (OVH Starter) | $10 |
| Domain (optional) | $15/year |
| Backups (S3) | $2 |
| **Total (minimum)** | **~$7/month** |
| **Total (recommended)** | **~$12/month** |

---

## Next Steps

1. **Set up domain name** (optional but recommended)
2. **Configure backups** (essential)
3. **Set up monitoring** (recommended)
4. **Invite users** (if sharing)
5. **Customize skills** (optional)

---

## Support

- **GitHub Issues**: https://github.com/canclaw/canclaw/issues
- **Documentation**: https://docs.canclaw.ca
- **Community**: https://discord.gg/canclaw

---

*Deploy CanClaw and enjoy sovereign Canadian AI! 🦞🇨🇦*
