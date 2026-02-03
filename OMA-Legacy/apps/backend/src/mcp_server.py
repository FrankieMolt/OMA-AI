from typing import List, Optional, Dict, Any
from pydantic import BaseModel
import os
import subprocess

class Tool(BaseModel):
    name: str
    description: str
    input_schema: dict

class MCPServer:
    def __init__(self):
        self.tools = []

    def register_tool(self, tool: Tool):
        self.tools.append(tool)
        print(f"MCP: Registered tool {tool.name}")

    def list_tools(self) -> List[Tool]:
        return self.tools

    def call_tool(self, name: str, arguments: dict):
        print(f"MCP: Calling tool {name} with args {arguments}")
        
        if name == "read_file":
            path = arguments.get("path")
            if not path or not os.path.exists(path):
                return {"status": "error", "error": "File not found"}
            try:
                with open(path, "r", encoding="utf-8") as f:
                    content = f.read()
                return {"status": "success", "content": content}
            except Exception as e:
                return {"status": "error", "error": str(e)}
        
        if name == "execute_python":
            code = arguments.get("code")
            if not code:
                return {"status": "error", "error": "No code provided"}
            try:
                # Safe execution sandbox (simplified for demo)
                result = subprocess.run(
                    ["python", "-c", code], 
                    capture_output=True, 
                    text=True, 
                    timeout=5
                )
                return {
                    "status": "success", 
                    "stdout": result.stdout,
                    "stderr": result.stderr
                }
            except Exception as e:
                return {"status": "error", "error": str(e)}

        return {"status": "error", "error": "Tool not found"}

# Singleton instance
mcp_server = MCPServer()

def start_mcp_server():
    # Register default system tools
    mcp_server.register_tool(Tool(
        name="read_file",
        description="Read a file from the local filesystem",
        input_schema={"type": "object", "properties": {"path": {"type": "string"}}}
    ))
    
    mcp_server.register_tool(Tool(
        name="execute_python",
        description="Execute a Python script in a secure sandbox",
        input_schema={"type": "object", "properties": {"code": {"type": "string"}}}
    ))
    
    return mcp_server
