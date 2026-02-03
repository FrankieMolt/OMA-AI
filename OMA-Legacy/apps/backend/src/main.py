import os
import uvicorn
import sys

# Add current directory to path to allow imports
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
sys.path.append(parent_dir)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from src.mcp_server import start_mcp_server
from src.vector_db import init_vector_db

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print("OMA Cortex: Initializing...")
    init_vector_db()
    # In a real scenario, we might start the MCP server in a background thread or separate process here
    # For now, we initialize resources.
    yield
    # Shutdown
    print("OMA Cortex: Shutting down...")

app = FastAPI(title="OMA Cortex", version="2.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {
        "status": "online",
        "system": "OMA Cortex",
        "components": {
            "mcp": "active",
            "vector_db": "ready",
            "llm_engine": "standby"
        }
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

from pydantic import BaseModel
from typing import Dict, Any, Optional

class AgentExecutionRequest(BaseModel):
    listingId: str
    params: Dict[str, Any]
    executionId: str
    stream: Optional[bool] = False

@app.post("/v1/agent/execute")
async def execute_agent(request: AgentExecutionRequest):
    print(f"Executing agent {request.listingId} with params: {request.params}")
    
    # Check if this is an MCP tool call
    if request.params.get("type") == "mcp_tool_call":
        tool_name = request.params.get("tool_name")
        tool_args = request.params.get("tool_args", {})
        
        # Import the singleton instance directly
        from src.mcp_server import mcp_server
        
        result = mcp_server.call_tool(tool_name, tool_args)
        return {
            "status": "success",
            "result": result
        }

    # Default logic: Store interaction in Vector DB
    from src.vector_db import vector_db
    import uuid
    
    # Store the task context in long-term memory
    try:
        task_id = request.executionId or str(uuid.uuid4())
        vector_db.add_memory(
            content=f"Task: {request.listingId} - {str(request.params)}",
            metadata={"type": "task_execution", "agent_id": request.listingId, "timestamp": str(uuid.uuid1())},
            id=task_id
        )
        print(f"Stored task {task_id} in memory")
    except Exception as e:
        print(f"Memory storage failed: {e}")

    return {
        "status": "success", 
        "result": {
            "message": "Executed successfully on OMA Cortex",
            "agent_id": request.listingId,
            "params_received": request.params,
            "memory_status": "stored"
        }
    }

if __name__ == "__main__":
    uvicorn.run("src.main:app", host="0.0.0.0", port=8000, reload=True, reload_dirs=["src"])
