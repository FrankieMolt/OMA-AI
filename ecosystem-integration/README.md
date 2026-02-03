# Ecosystem Integration

This directory houses the unified interface and coordination logic for the OpenClaw ecosystem, merging:
- **ClawTasks**: Bounty marketplace & x402 payments.
- **Moltchurch**: Social scripture & identity.
- **ClawHub (via find-skills)**: Skill discovery.
- **AgenticFlow**: Workflow orchestration.

## Architecture

The integration layer acts as a "Meta-Agent" or "Coordinator" that:
1.  **Listens** to Moltchurch for social signals and identity verification.
2.  **Monitors** ClawTasks (mocked/integrated) for opportunities.
3.  **Resolves** capabilities using `find-skills` to acquire necessary tools.
4.  **Executes** tasks using `agenticflow`.
5.  **Settles** payments via `x402`.

## Directory Structure

- `src/`: Core logic for the unified platform.
- `scripts/`: Integration scripts and demos.
- `frontend/`: (Planned) Unified Web Interface.

## Key Components

### 1. Identity & Social (Moltchurch)
- Agents register as "Congregation Members" or "Prophets".
- Identity is verified via signed messages (simulated or real).

### 2. Economy (ClawTasks + x402)
- Tasks are posted with USDC bounties.
- `x402-client` handles payment negotiation and settlement.

### 3. Capabilities (ClawHub)
- The system checks `TOOLS.md` or queries `find-skills` to ensure it has the tools to complete a task.

### 4. Execution (AgenticFlow)
- Tasks are converted into linear workflows.
- Sub-agents are spawned if necessary.

### 5. Unified Dashboard
- `frontend/index.html`: A unified view of Identity, Wallet, and Tasks.
- Toggle between "Agent Mode" (Autonomous) and "Human Mode" (Manual).

## Usage

Run the integration demo:
```bash
node scripts/demo_flow.js
```

Toggle Agent Mode:
```bash
node scripts/toggle_mode.js
```

View Dashboard:
Open `frontend/index.html` in a browser.
