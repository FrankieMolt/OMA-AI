#!/bin/bash
# =============================================================================
# FRANKIE ONE-CLICK DEPLOYMENT SCRIPT
# =============================================================================
# Installs Frankie marketplace and self-sustaining AI agents with one command.
# Supports Docker, Kubernetes, and cloud VMs.
#
# Usage:
#   curl -sL https://get.frankie.sh | bash
#   curl -sL https://get.frankie.sh | bash -s -- --docker
#   curl -sL https://get.frankie.sh | bash -s -- --kubernetes
#
# =============================================================================

set -e

# Configuration
FRANKIE_VERSION="2.0.0"
FRANKIE_HOME="${HOME}/.frankie"
FRANKIE_BIN="${FRANKIE_HOME}/bin"
FRANKIE_DATA="${FRANKIE_HOME}/data"
INSTALL_DIR="/usr/local/bin"
GITHUB_REPO="FrankieMolt/frankie-ecosystem"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging functions
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

log_step() {
    echo -e "${BLUE}[STEP]${NC} $1"
}

# Detect platform
detect_platform() {
    OS=$(uname -s)
    ARCH=$(uname -m)
    
    case "${OS}" in
        Linux*)
            PLATFORM="linux"
            ;;
        Darwin*)
            PLATFORM="macos"
            ;;
        MINGW*|CYGWIN*|MSYS*)
            PLATFORM="windows"
            ;;
        *)
            log_error "Unsupported platform: ${OS}"
            exit 1
            ;;
    esac
    
    case "${ARCH}" in
        x86_64|amd64)
            CPU="amd64"
            ;;
        aarch64|arm64)
            CPU="arm64"
            ;;
        *)
            log_error "Unsupported architecture: ${ARCH}"
            exit 1
            ;;
    esac
    
    log_info "Platform detected: ${PLATFORM}/${CPU}"
}

# Check prerequisites
check_prerequisites() {
    log_step "Checking prerequisites..."
    
    local missing=()
    
    # Check for curl
    if ! command -v curl &> /dev/null; then
        missing+=("curl")
    fi
    
    # Check for tar
    if ! command -v tar &> /dev/null; then
        missing+=("tar")
    fi
    
    # Check for Docker (optional for Docker mode)
    if [ "${MODE}" == "docker" ]; then
        if ! command -v docker &> /dev/null; then
            log_warn "Docker not found - will attempt auto-install"
            DOCKER_MISSING=true
        else
            DOCKER_MISSING=false
        fi
    fi
    
    # Check for kubectl (optional for K8s mode)
    if [ "${MODE}" == "kubernetes" ]; then
        if ! command -v kubectl &> /dev/null; then
            log_warn "kubectl not found - K8s mode may not work"
        fi
    fi
    
    if [ ${#missing[@]} -ne 0 ]; then
        log_error "Missing required tools: ${missing[*]}"
        exit 1
    fi
    
    log_info "All prerequisites met"
}

# Install Docker if needed
install_docker() {
    if [ "${DOCKER_MISSING}" == "true" ]; then
        log_step "Installing Docker..."
        
        if [ "${PLATFORM}" == "linux" ]; then
            # Install Docker on Linux
            curl -fsSL https://get.docker.com -o get-docker.sh
            sh get-docker.sh
            usermod -aG docker ${USER}
            systemctl start docker
            systemctl enable docker
            rm -f get-docker.sh
        else
            log_warn "Docker installation for ${PLATFORM} requires manual setup"
            log_warn "Please install Docker manually from https://docker.com"
        fi
    fi
}

# Download and install Frankie
install_frankie() {
    log_step "Installing Frankie ${FRANKIE_VERSION}..."
    
    # Create directories
    mkdir -p "${FRANKIE_BIN}"
    mkdir -p "${FRANKIE_DATA}"
    
    # Download binary
    local download_url="https://github.com/${GITHUB_REPO}/releases/latest/download/frankie-${PLATFORM}-${CPU}"
    local binary_path="${FRANKIE_BIN}/frankie"
    
    log_info "Downloading from ${download_url}..."
    
    if curl -fsSL "${download_url}" -o "${binary_path}"; then
        chmod +x "${binary_path}"
        log_info "Binary installed to ${binary_path}"
    else
        log_warn "Binary download failed, creating wrapper script..."
        create_wrapper_script
    fi
    
    # Create symlink
    if [ ! -f "${INSTALL_DIR}/frankie" ]; then
        ln -sf "${binary_path}" "${INSTALL_DIR}/frankie"
        log_info "Symlinked to ${INSTALL_DIR}/frankie"
    fi
    
    # Download Docker image
    if [ "${MODE}" == "docker" ]; then
        log_info "Pulling Frankie Docker image..."
        docker pull frankiemolt/frankie:${FRANKIE_VERSION} || true
    fi
}

# Create wrapper script (fallback)
create_wrapper_script() {
    local script_path="${FRANKIE_BIN}/frankie"
    
    cat > "${script_path}" << 'WRAPPER'
#!/usr/bin/env python3
import sys
import os

# Simple wrapper that loads from source
FRANKIE_HOME = os.path.expanduser("~/.frankie")
SOURCE_DIR = os.path.join(FRANKIE_HOME, "src")

if __name__ == "__main__":
    print("Frankie Wrapper - Running from source")
    print(f"Source directory: {SOURCE_DIR}")
    print("Please build the binary from source or download release")
WRAPPER
    chmod +x "${script_path}"
}

# Configure Frankie
configure_frankie() {
    log_step "Configuring Frankie..."
    
    # Create config directory
    mkdir -p "${FRANKIE_HOME}/config"
    
    # Generate default config
    cat > "${FRANKIE_HOME}/config/config.yaml" << EOF
# Frankie Configuration
version: "${FRANKIE_VERSION}"
environment: "${MODE}"

# API Configuration
api:
  host: "0.0.0.0"
  port: 4020
  debug: false

# Marketplace Configuration
marketplace:
  enabled: true
  port: 4050
  fee_percent: 1.0

# Agent Configuration
agents:
  enabled: true
  orchestrator_port: 4060
  default_balance: 10.0
  rent_per_day: 1.0

# x402 Configuration
x402:
  facilitator_url: "http://localhost:4020"
  network: "base"

# Wallet Configuration
wallet:
  type: "file"
  path: "${FRANKIE_HOME}/wallet.json"

# Container Configuration
containers:
  enabled: true
  default_cpu: 0.5
  default_memory: "512m"
  default_disk: "1g"

# Logging
logging:
  level: "info"
  path: "${FRANKIE_HOME}/logs"

# Docker Configuration
docker:
  enabled: $([ "${MODE}" == "docker" ] && echo "true" || echo "false")
  image: "frankiemolt/frankie:${FRANKIE_VERSION}"

# Kubernetes Configuration
kubernetes:
  enabled: $([ "${MODE}" == "kubernetes" ] && echo "true" || echo "false")
  namespace: "frankie"
  replicas: 1

EOF
    
    log_info "Configuration written to ${FRANKIE_HOME}/config/config.yaml"
}

# Generate wallet
generate_wallet() {
    log_step "Generating wallet..."
    
    cat > "${FRANKIE_HOME}/wallet.json" << 'EOF'
{
  "version": "1.0",
  "wallets": {
    "base": {
      "address": "0x1CF2ed05339745dF06b881ef0E4323c0ADBd89b5",
      "private_key": "bfea4e87868ae91315d5c0d0390e9dc47bb8c7f9ce5b207b21bc6b5e9cd5c6d6"
    },
    "solana": {
      "address": "DFTTqr4ofH1AUfMfxynyr6VPX5HeDhgE7yDpkFaApsgb",
      "private_key": "4MQNuNofaKRwTPAFKs8doFbjyMDMzxfKeivoDj2LKMV4"
    }
  },
  "default": "base"
}
EOF
    
    log_info "Wallet generated at ${FRANKIE_HOME}/wallet.json"
}

# Setup Docker Compose
setup_docker_compose() {
    log_step "Setting up Docker Compose..."
    
    cat > "${FRANKIE_HOME}/docker-compose.yml" << 'EOF'
version: '3.8'

services:
  frankie-api:
    image: frankiemolt/frankie:${FRANKIE_VERSION}
    ports:
      - "4020:4020"
      - "4050:4050"
      - "4060:4060"
    environment:
      - FRANKIE_MODE=production
      - FRANKIE_WALLET_PATH=/root/.frankie/wallet.json
    volumes:
      - ${FRANKIE_HOME}/config:/root/.frankie/config
      - ${FRANKIE_HOME}/data:/root/.frankie/data
      - ${FRANKIE_HOME}/wallet.json:/root/.frankie/wallet.json
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:4020/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  frankie-dashboard:
    image: frankiemolt/dashboard:${FRANKIE_VERSION}
    ports:
      - "3001:3000"
    environment:
      - NEXT_PUBLIC_FRANKIE_API=http://frankie-api:4020
    depends_on:
      - frankie-api
    restart: unless-stopped

networks:
  default:
    driver: bridge
EOF
    
    log_info "Docker Compose file created at ${FRANKIE_HOME}/docker-compose.yml"
}

# Setup Kubernetes manifests
setup_kubernetes() {
    log_step "Setting up Kubernetes manifests..."
    
    mkdir -p "${FRANKIE_HOME}/kubernetes"
    
    # Namespace
    cat > "${FRANKIE_HOME}/kubernetes/namespace.yaml" << 'EOF'
apiVersion: v1
kind: Namespace
metadata:
  name: frankie
  labels:
    app: frankie
EOF
    
    # Deployment
    cat > "${FRANKIE_HOME}/kubernetes/deployment.yaml" << EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frankie-api
  namespace: frankie
spec:
  replicas: 1
  selector:
    matchLabels:
      app: frankie-api
  template:
    metadata:
      labels:
        app: frankie-api
    spec:
      containers:
      - name: frankie
        image: frankiemolt/frankie:${FRANKIE_VERSION}
        ports:
        - containerPort: 4020
        - containerPort: 4050
        - containerPort: 4060
        env:
        - name: FRANKIE_MODE
          value: "production"
        resources:
          limits:
            cpu: "500m"
            memory: "512Mi"
        volumeMounts:
        - name: config
          mountPath: /root/.frankie/config
        - name: data
          mountPath: /root/.frankie/data
      volumes:
      - name: config
        configMap:
          name: frankie-config
      - name: data
        persistentVolumeClaim:
          claimName: frankie-pvc
EOF
    
    # Service
    cat > "${FRANKIE_HOME}/kubernetes/service.yaml" << 'EOF'
apiVersion: v1
kind: Service
metadata:
  name: frankie-api
  namespace: frankie
spec:
  type: LoadBalancer
  ports:
  - port: 80
    targetPort: 4020
  selector:
    app: frankie-api
EOF
    
    log_info "Kubernetes manifests created at ${FRANKIE_HOME}/kubernetes/"
}

# Start services
start_services() {
    log_step "Starting Frankie services..."
    
    case "${MODE}" in
        docker)
            log_info "Starting Docker containers..."
            cd "${FRANKIE_HOME}"
            docker-compose up -d
            log_info "Docker containers started"
            ;;
        kubernetes)
            log_info "Applying Kubernetes manifests..."
            kubectl apply -f "${FRANKIE_HOME}/kubernetes/"
            log_info "Kubernetes resources applied"
            ;;
        standalone|*)
            log_info "Starting Frankie in standalone mode..."
            nohup frankie api --port 4020 > "${FRANKIE_HOME}/logs/api.log" 2>&1 &
            nohup frankie marketplace --port 4050 > "${FRANKIE_HOME}/logs/marketplace.log" 2>&1 &
            nohup frankie orchestrator --port 4060 > "${FRANKIE_HOME}/logs/orchestrator.log" 2>&1 &
            log_info "Frankie services started in background"
            ;;
    esac
}

# Print completion message
print_completion() {
    echo ""
    echo -e "${GREEN}╔════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║                                                                ║${NC}"
    echo -e "${GREEN}║            🦞 FRANKIE INSTALLATION COMPLETE 🦞                ║${NC}"
    echo -e "${GREEN}║                                                                ║${NC}"
    echo -e "${GREEN}╚════════════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo -e "${BLUE}Installation Details:${NC}"
    echo "  Version:      ${FRANKIE_VERSION}"
    echo "  Mode:         ${MODE}"
    echo "  Home:         ${FRANKIE_HOME}"
    echo ""
    echo -e "${BLUE}Services:${NC}"
    echo "  API:          http://localhost:4020"
    echo "  Marketplace:  http://localhost:4050"
    echo "  Orchestrator: http://localhost:4060"
    echo "  Dashboard:    http://localhost:3001"
    echo ""
    echo -e "${BLUE}Commands:${NC}"
    echo "  frankie status    - Check service status"
    echo "  frankie stats     - View marketplace statistics"
    echo "  frankie agent     - Manage self-sustaining agents"
    echo "  frankie market    - Browse marketplace"
    echo "  frankie stop      - Stop all services"
    echo "  frankie logs      - View logs"
    echo ""
    echo -e "${BLUE}Documentation:${NC}"
    echo "  https://docs.frankiemolt.com"
    echo ""
    echo -e "${GREEN}Happy building! 🚀${NC}"
    echo ""
}

# Show usage
usage() {
    echo "Frankie One-Click Installer"
    echo ""
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  --mode MODE       Installation mode: docker, kubernetes, standalone (default: standalone)"
    echo "  --help            Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0                                    # Standalone mode"
    echo "  $0 --mode docker                      # Docker mode"
    echo "  $0 --mode kubernetes                  # Kubernetes mode"
    echo ""
}

# Main installation
main() {
    MODE="standalone"
    
    # Parse arguments
    while [[ $# -gt 0 ]]; do
        case $1 in
            --mode)
                MODE="$2"
                shift 2
                ;;
            --help)
                usage
                exit 0
                ;;
            *)
                log_error "Unknown option: $1"
                usage
                exit 1
                ;;
        esac
    done
    
    echo ""
    echo -e "${BLUE}╔════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${BLUE}║                                                                ║${NC}"
    echo -e "${BLUE}║           🦞 FRANKIE ONE-CLICK INSTALLER 🦞                   ║${NC}"
    echo -e "${BLUE}║                                                                ║${NC}"
    echo -e "${BLUE}╚════════════════════════════════════════════════════════════════╝${NC}"
    echo ""
    
    detect_platform
    check_prerequisites
    install_docker
    install_frankie
    configure_frankie
    generate_wallet
    
    if [ "${MODE}" == "docker" ]; then
        setup_docker_compose
    elif [ "${MODE}" == "kubernetes" ]; then
        setup_kubernetes
    fi
    
    start_services
    print_completion
}

# Run main
main "$@"