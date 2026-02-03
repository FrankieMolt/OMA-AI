from fastapi.testclient import TestClient
from backend.main import app, db

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy", "service": "oma-ai", "version": "1.0.0"}

def test_get_status():
    response = client.get("/api/status")
    assert response.status_code == 200
    data = response.json()
    assert "total_agents" in data
    assert "services" in data

def test_marketplace_services():
    response = client.get("/api/marketplace")
    assert response.status_code == 200
    data = response.json()
    assert "services" in data
    assert len(data["services"]) > 0

def test_create_agent():
    agent_data = {
        "name": "test-agent",
        "balance": 15.0,
        "capabilities": ["testing"]
    }
    response = client.post("/api/agents", json=agent_data)
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "test-agent"
    assert data["balance"] == 15.0
    assert "testing" in data["capabilities"]

def test_get_agents():
    response = client.get("/api/agents")
    assert response.status_code == 200
    data = response.json()
    assert len(data["agents"]) > 0

def test_create_bounty():
    bounty_data = {
        "title": "Test Bounty",
        "description": "Test description",
        "amount": 10.0,
        "creator": "tester"
    }
    response = client.post("/api/bounties", json=bounty_data)
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Test Bounty"
    assert data["status"] == "open"

def test_list_bounties():
    response = client.get("/api/bounties")
    assert response.status_code == 200
    data = response.json()
    assert len(data["bounties"]) > 0

def test_spawn_child_insufficient_funds():
    # Create poor agent
    agent_data = {
        "name": "poor-agent",
        "balance": 1.0,
        "capabilities": []
    }
    create_res = client.post("/api/agents", json=agent_data)
    agent_id = create_res.json()["id"]
    
    # Try to spawn
    response = client.post(f"/api/agents/{agent_id}/spawn-child")
    assert response.status_code == 400
    assert "Insufficient balance" in response.json()["detail"]

def test_spawn_child_success():
    # Create rich agent
    agent_data = {
        "name": "rich-agent",
        "balance": 20.0,
        "capabilities": []
    }
    create_res = client.post("/api/agents", json=agent_data)
    agent_id = create_res.json()["id"]
    
    # Spawn
    response = client.post(f"/api/agents/{agent_id}/spawn-child")
    assert response.status_code == 200
    data = response.json()
    assert "child" in data
    assert data["child"]["parent_id"] == agent_id
