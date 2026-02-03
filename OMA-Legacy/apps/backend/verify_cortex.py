import requests
import json
import uuid
import sys

# Color codes
GREEN = '\033[92m'
RED = '\033[91m'
RESET = '\033[0m'

BASE_URL = "http://localhost:8000"

def log(msg, status="INFO"):
    if status == "SUCCESS":
        print(f"{GREEN}[SUCCESS]{RESET} {msg}")
    elif status == "FAIL":
        print(f"{RED}[FAIL]{RESET} {msg}")
    else:
        print(f"[INFO] {msg}")

def test_health():
    try:
        response = requests.get(f"{BASE_URL}/health")
        if response.status_code == 200:
            log("Health check passed", "SUCCESS")
            return True
        else:
            log(f"Health check failed: {response.status_code}", "FAIL")
            return False
    except Exception as e:
        log(f"Health check exception: {e}", "FAIL")
        return False

def test_execute_agent_normal():
    payload = {
        "listingId": "test-agent-v1",
        "params": {"prompt": "Hello world"},
        "executionId": str(uuid.uuid4())
    }
    
    try:
        response = requests.post(f"{BASE_URL}/v1/agent/execute", json=payload)
        data = response.json()
        
        if response.status_code == 200 and data["status"] == "success":
            if data["result"].get("memory_status") == "stored":
                log("Normal execution + Memory storage passed", "SUCCESS")
                return True
            else:
                log("Memory storage flag missing", "FAIL")
                return False
        else:
            log(f"Normal execution failed: {response.text}", "FAIL")
            return False
    except Exception as e:
        log(f"Normal execution exception: {e}", "FAIL")
        return False

def test_execute_mcp_tool():
    # Test the built-in 'execute_python' tool
    code_to_run = "print('Hello from MCP Sandbox')"
    payload = {
        "listingId": "system-mcp",
        "params": {
            "type": "mcp_tool_call",
            "tool_name": "execute_python",
            "tool_args": {"code": code_to_run}
        },
        "executionId": str(uuid.uuid4())
    }
    
    try:
        response = requests.post(f"{BASE_URL}/v1/agent/execute", json=payload)
        data = response.json()
        
        if response.status_code == 200 and data["status"] == "success":
            result = data["result"]
            if result.get("status") == "success" and "Hello from MCP Sandbox" in result.get("stdout", ""):
                log("MCP Tool Execution passed", "SUCCESS")
                return True
            else:
                log(f"MCP Tool Output Mismatch: {result}", "FAIL")
                return False
        else:
            log(f"MCP Tool Execution failed: {response.text}", "FAIL")
            return False
    except Exception as e:
        log(f"MCP Tool exception: {e}", "FAIL")
        return False

if __name__ == "__main__":
    log("Starting OMA Cortex Verification...")
    
    if not test_health():
        log("Backend might not be running. Start it with: uvicorn src.main:app --reload", "FAIL")
        sys.exit(1)
        
    normal_ok = test_execute_agent_normal()
    mcp_ok = test_execute_mcp_tool()
    
    if normal_ok and mcp_ok:
        log("ALL TESTS PASSED", "SUCCESS")
        sys.exit(0)
    else:
        log("SOME TESTS FAILED", "FAIL")
        sys.exit(1)
