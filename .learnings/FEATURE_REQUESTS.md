# Feature Requests

## [FEAT-20260209-001] workspace_cleanup_and_maintenance

**Logged**: 2026-02-09T08:28:00Z
**Priority**: high
**Status**: resolved
**Area**: infra | docs

### Requested Capability
Automatic and manual workspace cleanup:
- Check all .md files for relevance and organization
- Clean old logs from memory/ directory
- Clean old archives from archive/ directories
- Remove redundant/junk files and folders
- Keep only current, relevant documentation

### User Context
Workspace had accumulated:
- Old memory files (memory/YYYY-MM-DD.md)
- Old archives (archive/YYYY-MM-DD/)
- Redundant documentation files
- Outdated reports and audit files

User wanted clean, organized workspace with only current docs.

### Complexity Estimate
complex

### Suggested Implementation
1. Audit all .md files in workspace root
2. Archive old memory files (older than 7 days) to archive/memory/
3. Remove outdated reports (archive/YYYY-MM-DD/ for old content)
4. Keep only essential docs:
   - AGENTS.md
   - CLAUDE.md
   - IDENTITY.md
   - MEMORY.md
   - README.md
   - SOUL.md
   - TOOLS.md
   - USER.md
   - HEARTBEAT.md
5. Clean up junk folders (old screenshots, temp files)
6. Update HEARTBEAT.md with current status
7. Document cleanup summary in MEMORY.md

### Resolution
- **Resolved**: 2026-02-09T08:30:00Z
- **Notes**: Workspace successfully cleaned

**Actions taken:**
1. Created `archive/2026-02-09/` for old reports
2. Moved 4 old report files to archive:
   - AUDIT-REPORT.md (3.7K)
   - AUDIT_REPORT_2026-02-09.md (13K)
   - AUDIT_REPORT_2026-02-09_FINAL.md (13K)
   - FINAL-REPORT.md (15K)
3. Moved old screenshot folders:
   - audit-screenshots/
   - screenshots/
   - reports/
4. Created `archive/memory/` for old memory files
5. Moved 3 old memory files:
   - 2026-02-06.md (9.5K)
   - 2026-02-07-DEBUG-SESSION.md (7.2K)
   - 2026-02-08-seo-optimization.md (4.2K)

**Result:**
- 8 essential .md files remain in workspace root
- All old content properly archived by date
- Workspace is clean and organized

### Metadata
- Frequency: recurring (should run weekly)
- Related Features: workspace organization, documentation management

---
