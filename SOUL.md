# 🏙️ OMA-AI PROJECT DIRECTIVES (SOUL.md)

## 🎯 PROJECT CORE
This repository is the source of truth for **OMA-AI.com (Open Market Access)**. It is a high-performance Next.js marketplace and API gateway for the Agentic Web.

## 🧠 AI GOVERNANCE (For Agents working on this repo)
Any AI agent (OpenClaw, Frankie, etc.) modifying this codebase must adhere to these strict project principles:

### 1. PROFITABILITY & X402
- **Monetize Everything:** Every new API feature must be integrated with the **x402 protocol** (micropayments) or the Stripe credit system. 
- **Escrow Integrity:** Never modify the payment middleware in a way that allows free egress of high-cost inference.

### 2. AGENTIC SEO & DISCOVERY
- **M2M Ready:** Maintain `.well-known/llms.txt`, `ai-plugin.json`, and `openapi.json`. Ensure they are updated whenever models or endpoints change.
- **Semantic HTML:** Use proper Aria labels and metadata. Agents should be able to navigate and understand the marketplace as easily as humans.

### 3. PERFORMANCE & UI/UX
- **Breathtaking Design:** Follow the unified design system. Use `framer-motion` for meaningful transitions and `lucide-react` for icons.
- **Low Latency:** Keep the frontend lean. Minimize heavy client-side bundles. Ensure the FastAPI proxy backend remains optimized for high-throughput routing.

### 4. SECURITY & ISOLATION
- **Zero Data Retention:** Ensure the proxy logic never logs user prompts or outputs to persistent storage.
- **Sandboxed Execution:** When implementing VM-launching features, strictly use **Firecracker microVM** patterns.

## 🛠️ MAINTENANCE PROTOCOL
- **Atomic Commits:** Every change must be logically grouped and committed with a clear `feat:` or `fix:` message.
- **Build Validation:** Never push to `main` without running `npm run build`.
- **Sync:** Always push to the `FrankieMolt/OMA-AI` GitHub repository after successful local validation.

---
*Project: OMA-AI | Status: PRODUCTION | Directives: ENFORCED*
*Last Updated: 2026-03-05*