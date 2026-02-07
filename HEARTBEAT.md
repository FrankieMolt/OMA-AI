# HEARTBEAT.md

# Periodic Checks

## Self-Improvement (every 24 hours)
If 24 hours since last review:
1. Review `.learnings/LEARNINGS.md` and `.learnings/ERRORS.md`
2. Identify learnings that should be promoted to core docs
3. Promote to AGENTS.md, TOOLS.md, SOUL.md based on relevance
4. Update timestamp in `memory/heartbeat-state.json`

## Capability Evolution (every 12 hours)
If 12 hours since last evolution:
1. Run capability evolver to analyze runtime history
2. Apply protocol-constrained evolution if improvements found
3. Log evolution events to `.learnings/`
4. Update timestamp in `memory/heartbeat-state.json`

## Timestamp Tracking
Create/update `memory/heartbeat-state.json`:
```json
{
  "lastSelfImprovementReview": null,
  "lastCapabilityEvolution": null
}
```

---

*Last updated: 2026-02-07*
*Frankie 🧟‍♂️*
