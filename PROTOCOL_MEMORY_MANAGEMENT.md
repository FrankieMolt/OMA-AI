# 🧠 MEMORY MANAGEMENT PROTOCOLS

## Memory Types

### MEMORY.md (Long-Term)
**Use for:**
- Permanent learnings about MASTA, OMA-AI
- Critical decisions and their reasoning
- Project architecture and patterns
- Important contacts/credentials
- Bug fixes with root cause analysis

**When to update:**
- After solving complex problems
- When documenting decisions
- After security incidents
- When MASTA says "remember this"

### memory/YYYY-MM-DD.md (Daily Logs)
**Use for:**
- Raw session logs
- What I did today
- Temporary notes
- Meeting notes
- Quick observations

**When to update:**
- Daily at end of session
- During complex tasks
- When gathering data

## Promotion Criteria

### Promote to MEMORY.md
1. **High value**: Will be needed in future sessions
2. **Permanent**: Not time-sensitive
3. **Actionable**: Contains decisions or solutions
4. **Critical**: Security, deployment, or major features

### Keep in Daily Files
1. **Temporary**: Context for current session only
2. **Time-sensitive**: Meeting times, daily tasks
3. **Detailed**: Raw data that can be summarized
4. **Redundant**: Already in MEMORY.md

## Memory Pruning Strategy

### Weekly Pruning
1. Review daily files older than 7 days
2. Extract valuable info → promote to MEMORY.md
3. Delete redundant daily files
4. Keep only last 7 daily files

### Monthly Deep Clean
1. Review entire MEMORY.md
2. Remove outdated info
3. Consolidate related entries
4. Update project status
5. Archive old decisions (move to separate file if needed)

## Search Before Write
Before writing to MEMORY.md:
1. Run `memory_search()` on the topic
2. Check if already documented
3. Update existing entry instead of duplicating
4. Add source reference (date, context)

## Memory Structure

### MEMORY.md Format
```
## [LRN-YYYYMMDD-###] Title
**Logged:** YYYY-MM-DD
**Priority:** low|medium|high|critical
**Status:** pending|resolved

### Summary
Brief description (1-2 sentences)

### Details
Full details, steps, reasoning

### Lessons
What to remember for future

### Related
- Files changed
- Other entries
- External references
```

## Access Control
- MEMORY.md: Main session only (not in shared contexts)
- Daily files: Main session only
- Never share MASTA's private data in groups

## Backup
- MEMORY.md backed up via openclaw-self-backup
- Daily files included in backups
- Retention: 7 daily, 4 weekly, 12 monthly
