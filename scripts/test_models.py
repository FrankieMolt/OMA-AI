# Test OMA-AI Model Providers

import os
import asyncio
import sys
from dotenv import load_dotenv

# Add api directory to path
sys.path.append(os.path.join(os.path.dirname(__file__), "..", "api"))

from providers.router import ProviderManager

async def test_providers():
    load_dotenv()
    manager = ProviderManager()
    
    print("🚀 Starting Provider Audit...")
    
    # 1. Health Check
    health = await manager.health_check_all()
    print("\n📊 Health Check Results:")
    for name, ok in health.items():
        status = "✅ OK" if ok else "❌ FAIL"
        key_status = "🔑 SET" if os.getenv(f"{name.upper()}_API_KEY") else "⚠️ MISSING"
        print(f"  {name:<12}: {status} (Key: {key_status})")

    # 2. Test Venice (Sovereign)
    venice = manager.get_provider("venice")
    if venice and os.getenv("VENICE_API_KEY"):
        print("\n🧪 Testing Venice (Sovereign AI)...")
        messages = [{"role": "user", "content": "Explain the concept of sovereign AI in one sentence."}]
        resp = await venice.complete("llama-3.3-70b", messages)
        if "error" in resp:
            print(f"  ❌ Venice Error: {resp['error']}")
        else:
            content = resp["choices"][0]["message"]["content"]
            print(f"  ✅ Venice Response: {content[:100]}...")

    # 3. Test OpenRouter
    openrouter = manager.get_provider("openrouter")
    if openrouter and os.getenv("OPENROUTER_API_KEY"):
        print("\n🧪 Testing OpenRouter...")
        messages = [{"role": "user", "content": "What is the fastest way to bridge USDC to Base?"}]
        resp = await openrouter.complete("google/gemini-2.0-flash-001", messages)
        if "error" in resp:
            print(f"  ❌ OpenRouter Error: {resp['error']}")
        else:
            content = resp["choices"][0]["message"]["content"]
            print(f"  ✅ OpenRouter Response: {content[:100]}...")

    # 4. Router Logic Test
    print("\n🧠 Testing Smart Router Logic...")
    route = await manager.router.route("I need a private and uncensored analysis of crypto regulations.")
    print(f"  Sovereign Task -> {route.provider} ({route.model})")
    
    route = await manager.router.route("Write a complex python script for trading.")
    print(f"  Coding Task    -> {route.provider} ({route.model})")

if __name__ == "__main__":
    asyncio.run(test_providers())
