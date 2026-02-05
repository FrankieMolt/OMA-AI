# Test OMA-AI Model Providers

import os
import asyncio
import sys

# Add current directory and api directory to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "api")))

# Mock providers to avoid relative import issues if they exist
# Or better, just run it from the root with proper PYTHONPATH
os.environ["PYTHONPATH"] = os.path.abspath(os.path.join(os.path.dirname(__file__), "api"))

async def test_providers():
    try:
        from api.providers.router import ProviderManager
    except ImportError:
        # Fallback for different path structures
        sys.path.append(os.path.abspath(os.path.dirname(__file__)))
        from api.providers.router import ProviderManager

    manager = ProviderManager()
    
    print("🚀 Starting Provider Audit...")
    
    # 1. Health Check
    # We skip actual API calls if keys are missing to avoid 401s
    print("\n📊 Configuration Status:")
    providers = ["VENICE", "OPENROUTER", "GROQ", "TOGETHER", "OPENAI", "ANTHROPIC"]
    for p in providers:
        key = os.getenv(f"{p}_API_KEY")
        status = "🔑 SET" if key else "⚠️ MISSING"
        print(f"  {p:<12}: {status}")

    # 2. Router Logic Test
    print("\n🧠 Testing Smart Router Logic...")
    route = await manager.router.route("I need a private and uncensored analysis of crypto regulations.")
    print(f"  Sovereign Task -> {route.provider} ({route.model})")
    
    route = await manager.router.route("Write a complex python script for trading.")
    print(f"  Coding Task    -> {route.provider} ({route.model})")
    
    route = await manager.router.route("What's the weather like?")
    print(f"  General Task   -> {route.provider} ({route.model})")

if __name__ == "__main__":
    asyncio.run(test_providers())
