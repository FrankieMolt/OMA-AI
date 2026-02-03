#!/usr/bin/env python3
"""
FRANKIE OPENCLAW INTEGRATION LAYER

Integrates Frankie with OpenClaw ecosystem:
- Import OpenClaw skills from ClawHub
- Multi-channel support (Telegram, WhatsApp, etc.)
- Memory synchronization
- Skill execution

Inspired by OpenClaw's architecture:
- Skills system (similar to ClawHub)
- Multi-channel messaging
- Persistent memory
- Local execution
"""

import asyncio
import json
import logging
import os
from datetime import datetime
from typing import Optional, List, Dict, Any
from dataclasses import dataclass, field
from enum import Enum
import subprocess
import hashlib

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger('frankie-openclaw')

# ============================================================================
# CONFIGURATION
# ============================================================================

@dataclass
class OpenClawConfig:
    enabled: bool = True
    workspace_path: str = "/home/nosyt/.openclaw/workspace"
    skills_path: str = "/home/nosyt/.openclaw/workspace/skills"
    memory_path: str = "/home/nosyt/.openclaw/workspace/memory"
    config_path: str = "/home/nosyt/.openclaw/workspace/config"
    channel_enabled: bool = True
    sync_memory: bool = True

@dataclass
class ClawHubSkill:
    name: str
    version: str
    author: str
    description: str
    url: str
    capabilities: List[str] = field(default_factory=list)
    dependencies: List[str] = field(default_factory=list)
    installed: bool = False
    local_path: Optional[str] = None

# ============================================================================
# CHANNEL TYPES (OpenClaw-compatible)
# ============================================================================

class ChannelType(Enum):
    TELEGRAM = "telegram"
    WHATSAPP = "whatsapp"
    DISCORD = "discord"
    SLACK = "slack"
    GOOGLE_CHAT = "google_chat"
    SIGNAL = "signal"
    IMESSAGE = "imessage"
    WEBCHAT = "webchat"

@dataclass
class ChannelConfig:
    type: ChannelType
    enabled: bool = False
    credentials: Dict[str, str] = field(default_factory=dict)
    webhook_url: Optional[str] = None
    bot_token: Optional[str] = None

# ============================================================================
# OPENCLAW INTEGRATION
# ============================================================================

class OpenClawIntegration:
    """
    Integration layer between Frankie and OpenClaw.
    Enables skill import, channel support, and memory sync.
    """
    
    def __init__(self, config: OpenClawConfig = None):
        self.config = config or OpenClawConfig()
        self.imported_skills: Dict[str, ClawHubSkill] = {}
        self.channels: Dict[str, ChannelConfig] = {}
        self.memory_cache: Dict[str, Any] = {}
        
        # Create directories
        os.makedirs(self.config.skills_path, exist_ok=True)
        os.makedirs(self.config.memory_path, exist_ok=True)
        
    # ========================================================================
    # SKILL MANAGEMENT (ClawHub-compatible)
    # ========================================================================
    
    async def list_clawhub_skills(self) -> List[ClawHubSkill]:
        """List available skills from ClawHub"""
        # In production, this would query ClawHub API
        skills = [
            ClawHubSkill(
                name="self-reflection",
                version="1.1.1",
                author="FrankieMolt",
                description="Continuous self-improvement through reflection",
                url="https://clawhub.com/skills/self-reflection",
                capabilities=["reflection", "learning", "improvement"],
                dependencies=["memory"],
                installed=True,
                local_path=f"{self.config.skills_path}/self-reflection"
            ),
            ClawHubSkill(
                name="mission-control",
                version="2.0.0",
                author="FrankieMolt",
                description="Kanban-style task management",
                url="https://clawhub.com/skills/mission-control",
                capabilities=["tasks", "kanban", "management"],
                dependencies=["persistence"],
                installed=True,
                local_path=f"{self.config.skills_path}/mission-control"
            ),
            ClawHubSkill(
                name="trading-agent",
                version="1.0.0",
                author="FrankieMolt",
                description="Autonomous trading agent for crypto",
                url="https://clawhub.com/skills/trading-agent",
                capabilities=["trading", "defi", "analysis"],
                dependencies=["solana-wallet", "x402"],
                installed=False
            ),
            ClawHubSkill(
                name="email-automation",
                version="1.0.0",
                author="Community",
                description="Send and receive emails autonomously",
                url="https://clawhub.com/skills/email-automation",
                capabilities=["email", "imap", "smtp"],
                dependencies=["credentials"],
                installed=False
            ),
            ClawHubSkill(
                name="web-search",
                version="1.0.0",
                author="Community",
                description="Web search capabilities",
                url="https://clawhub.com/skills/web-search",
                capabilities=["search", "research", "discovery"],
                dependencies=["api-key"],
                installed=False
            )
        ]
        
        for skill in skills:
            if os.path.exists(skill.local_path):
                skill.installed = True
        
        return skills
    
    async def install_skill(self, skill_name: str) -> bool:
        """Install a skill from ClawHub"""
        skills = await self.list_clawhub_skills()
        
        for skill in skills:
            if skill.name == skill_name:
                if skill.installed:
                    logger.info(f"Skill {skill_name} already installed")
                    return True
                
                # In production, would download from ClawHub
                logger.info(f"Installing skill {skill_name}...")
                
                # Create skill directory
                skill_dir = f"{self.config.skills_path}/{skill.name}"
                os.makedirs(skill_dir, exist_ok=True)
                
                # Create SKILL.md
                skill_md = f"""# {skill.name}

**Version:** {skill.version}
**Author:** {skill.author}

{skill.description}

## Capabilities

{', '.join(skill.capabilities)}

## Dependencies

{', '.join(skill.dependencies) or 'None'}

## Installation

Installed from ClawHub: {skill.url}
"""
                with open(f"{skill_dir}/SKILL.md", "w") as f:
                    f.write(skill_md)
                
                skill.installed = True
                skill.local_path = skill_dir
                self.imported_skills[skill.name] = skill
                
                logger.info(f"Skill {skill_name} installed successfully")
                return True
        
        logger.error(f"Skill {skill_name} not found")
        return False
    
    async def run_skill(self, skill_name: str, task: str) -> Dict:
        """Execute a skill"""
        skill = self.imported_skills.get(skill_name)
        
        if not skill or not skill.installed:
            # Try to install on-demand
            if not await self.install_skill(skill_name):
                return {"error": f"Skill {skill_name} not found or failed to install"}
        
        logger.info(f"Running skill {skill_name} with task: {task}")
        
        # In production, would execute actual skill logic
        # For now, return mock result
        
        return {
            "skill": skill_name,
            "task": task,
            "result": f"Skill {skill_name} executed successfully",
            "timestamp": datetime.utcnow().isoformat(),
            "capabilities_used": skill.capabilities if skill else []
        }
    
    async def list_installed_skills(self) -> List[Dict]:
        """List all installed skills"""
        skills = []
        
        for name, skill in self.imported_skills.items():
            skills.append({
                "name": skill.name,
                "version": skill.version,
                "author": skill.author,
                "description": skill.description,
                "capabilities": skill.capabilities,
                "installed": skill.installed
            })
        
        # Also scan skills directory
        if os.path.exists(self.config.skills_path):
            for item in os.listdir(self.config.skills_path):
                skill_path = os.path.join(self.config.skills_path, item)
                if os.path.isdir(skill_path):
                    skill_file = os.path.join(skill_path, "SKILL.md")
                    if os.path.exists(skill_file):
                        if item not in self.imported_skills:
                            skills.append({
                                "name": item,
                                "version": "local",
                                "author": "local",
                                "description": "Local skill",
                                "capabilities": [],
                                "installed": True
                            })
        
        return skills
    
    # ========================================================================
    # CHANNEL MANAGEMENT (OpenClaw-compatible)
    # ========================================================================
    
    async def configure_channel(
        self, 
        channel_type: str, 
        credentials: Dict[str, str],
        webhook_url: Optional[str] = None
    ) -> bool:
        """Configure a messaging channel"""
        try:
            channel = ChannelConfig(
                type=ChannelType(channel_type),
                enabled=True,
                credentials=credentials,
                webhook_url=webhook_url
            )
            
            self.channels[channel_type] = channel
            logger.info(f"Channel {channel_type} configured")
            return True
            
        except ValueError:
            logger.error(f"Unknown channel type: {channel_type}")
            return False
    
    async def send_message(
        self, 
        channel_type: str, 
        target: str, 
        message: str
    ) -> bool:
        """Send message via channel"""
        channel = self.channels.get(channel_type)
        
        if not channel or not channel.enabled:
            logger.error(f"Channel {channel_type} not configured or disabled")
            return False
        
        logger.info(f"Sending message via {channel_type} to {target}")
        
        # In production, would use actual channel API
        # For now, log the message
        
        return True
    
    async def list_channels(self) -> List[Dict]:
        """List configured channels"""
        return [
            {
                "type": c.type.value,
                "enabled": c.enabled,
                "has_webhook": c.webhook_url is not None
            }
            for c in self.channels.values()
        ]
    
    # ========================================================================
    # MEMORY SYNCHRONIZATION (OpenClaw-style persistent memory)
    # ========================================================================
    
    async def sync_memory(self) -> Dict:
        """Sync memory with OpenClaw workspace"""
        logger.info("Syncing memory with OpenClaw...")
        
        memory_files = []
        
        # Read OpenClaw memory files
        if os.path.exists(self.config.memory_path):
            for f in os.listdir(self.config.memory_path):
                if f.endswith('.md'):
                    filepath = os.path.join(self.config.memory_path, f)
                    with open(filepath, 'r') as file:
                        content = file.read()
                        memory_files.append({
                            "file": f,
                            "content": content,
                            "hash": hashlib.md5(content.encode()).hexdigest()
                        })
        
        # Also read MEMORY.md
        memory_file = os.path.join(self.config.workspace_path, "MEMORY.md")
        if os.path.exists(memory_file):
            with open(memory_file, 'r') as f:
                content = f.read()
                memory_files.append({
                    "file": "MEMORY.md",
                    "content": content,
                    "hash": hashlib.md5(content.encode()).hexdigest()
                })
        
        self.memory_cache = {
            "files": memory_files,
            "synced_at": datetime.utcnow().isoformat(),
            "total_files": len(memory_files)
        }
        
        logger.info(f"Synced {len(memory_files)} memory files")
        return self.memory_cache
    
    async def get_memory(self, query: str) -> List[str]:
        """Query memory for information"""
        # In production, would use semantic search
        results = []
        
        for item in self.memory_cache.get("files", []):
            if query.lower() in item["content"].lower():
                results.append(item["content"])
        
        return results
    
    async def save_memory(self, content: str) -> bool:
        """Save new memory"""
        today = datetime.utcnow().strftime("%Y-%m-%d")
        filepath = os.path.join(
            self.config.memory_path, 
            f"{today}.md"
        )
        
        with open(filepath, 'a') as f:
            f.write(f"\n\n## {datetime.utcnow().isoformat()}\n\n{content}")
        
        logger.info(f"Memory saved to {filepath}")
        return True
    
    # ========================================================================
    # COMPATIBILITY LAYER
    # ========================================================================
    
    async def get_openclaw_status(self) -> Dict:
        """Get OpenClaw workspace status"""
        status = {
            "enabled": self.config.enabled,
            "workspace": self.config.workspace_path,
            "skills_installed": len(self.imported_skills),
            "channels_configured": len(self.channels),
            "memory_files": len(self.memory_cache.get("files", [])),
            "services": {}
        }
        
        # Check for OpenClaw processes
        try:
            result = subprocess.run(
                ["pgrep", "-f", "openclaw"],
                capture_output=True,
                text=True
            )
            status["services"]["openclaw"] = result.returncode == 0
        except:
            status["services"]["openclaw"] = False
        
        # Check for Gateway
        try:
            result = subprocess.run(
                ["pgrep", "-f", "gateway"],
                capture_output=True,
                text=True
            )
            status["services"]["gateway"] = result.returncode == 0
        except:
            status["services"]["gateway"] = False
        
        return status
    
    async def import_workspace_context(self) -> Dict:
        """Import context from OpenClaw workspace"""
        logger.info("Importing workspace context from OpenClaw...")
        
        context = {}
        workspace = self.config.workspace_path
        
        # Read SOUL.md
        soul_file = os.path.join(workspace, "SOUL.md")
        if os.path.exists(soul_file):
            with open(soul_file, 'r') as f:
                context["soul"] = f.read()
        
        # Read USER.md
        user_file = os.path.join(workspace, "USER.md")
        if os.path.exists(user_file):
            with open(user_file, 'r') as f:
                context["user"] = f.read()
        
        # Read IDENTITY.md
        identity_file = os.path.join(workspace, "IDENTITY.md")
        if os.path.exists(identity_file):
            with open(identity_file, 'r') as f:
                context["identity"] = f.read()
        
        # Read TOOLS.md
        tools_file = os.path.join(workspace, "TOOLS.md")
        if os.path.exists(tools_file):
            with open(tools_file, 'r') as f:
                context["tools"] = f.read()
        
        logger.info(f"Imported context: {list(context.keys())}")
        return context

# ============================================================================
# API SERVICE
# ============================================================================

from fastapi import FastAPI, HTTPException
import uvicorn

app = FastAPI(
    title="Frankie OpenClaw Integration", 
    version="2.0.0"
)
integration = OpenClawIntegration()

@app.on_event("startup")
async def startup():
    logger.info("🦞 Frankie OpenClaw Integration started")
    # Sync memory on startup
    await integration.sync_memory()

@app.get("/health")
async def health():
    return {"status": "healthy", "version": "2.0.0"}

# Skills
@app.get("/api/skills")
async def list_skills():
    """List available skills"""
    return {"skills": await integration.list_installed_skills()}

@app.post("/api/skills/install/{skill_name}")
async def install_skill(skill_name: str):
    """Install a skill"""
    success = await integration.install_skill(skill_name)
    if success:
        return {"success": True, "skill": skill_name}
    raise HTTPException(status_code=404, detail="Skill not found")

@app.post("/api/skills/run/{skill_name}")
async def run_skill(skill_name: str, task: str):
    """Run a skill"""
    result = await integration.run_skill(skill_name, task)
    return result

# Channels
@app.get("/api/channels")
async def list_channels():
    """List configured channels"""
    return {"channels": await integration.list_channels()}

@app.post("/api/channels/configure")
async def configure_channel(
    channel_type: str,
    credentials: dict,
    webhook_url: str = None
):
    """Configure a channel"""
    success = await integration.configure_channel(
        channel_type, credentials, webhook_url
    )
    return {"success": success}

@app.post("/api/channels/send")
async def send_message(
    channel_type: str,
    target: str,
    message: str
):
    """Send message via channel"""
    success = await integration.send_message(channel_type, target, message)
    return {"success": success}

# Memory
@app.get("/api/memory")
async def get_memory(query: str = ""):
    """Query memory"""
    results = await integration.get_memory(query)
    return {"results": results}

@app.post("/api/memory")
async def save_memory(content: str):
    """Save memory"""
    success = await integration.save_memory(content)
    return {"success": success}

@app.post("/api/memory/sync")
async def sync_memory():
    """Sync memory from OpenClaw"""
    return await integration.sync_memory()

# Status
@app.get("/api/status")
async def get_status():
    """Get integration status"""
    return await integration.get_openclaw_status()

@app.post("/api/import")
async def import_context():
    """Import workspace context"""
    return await integration.import_workspace_context()

# ============================================================================
# CLI
# ============================================================================

import argparse

def main():
    parser = argparse.ArgumentParser(description="Frankie OpenClaw Integration")
    parser.add_argument("--api", action="store_true", help="Run API server")
    parser.add_argument("--port", type=int, default=4070, help="API port")
    parser.add_argument("--sync", action="store_true", help="Sync memory")
    parser.add_argument("--skills", action="store_true", help="List skills")
    
    args = parser.parse_args()
    
    if args.api:
        uvicorn.run(app, host="0.0.0.0", port=args.port)
    elif args.sync:
        result = asyncio.run(integration.sync_memory())
        print(f"Synced {result['total_files']} files")
    elif args.skills:
        skills = asyncio.run(integration.list_installed_skills())
        for s in skills:
            print(f"  {s['name']}: {s['description']}")
    else:
        print("Frankie OpenClaw Integration")
        print("Usage:")
        print("  --api        Run API server")
        print("  --port       API port (default: 4070)")
        print("  --sync       Sync memory")
        print("  --skills     List skills")

if __name__ == "__main__":
    main()