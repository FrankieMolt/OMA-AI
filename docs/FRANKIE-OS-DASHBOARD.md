# Frankie OS Internal Dashboard

Internal dashboard for Frankie - your autonomous AI assistant.

## Features

### 1. Activity Feed 📋
- Real-time activity tracking across tasks, events, files, and system events
- Chronological timeline with icons and timestamps
- Filterable by activity type
- Auto-logged when actions occur

### 2. Calendar View 📅
- Monthly calendar with event visualization
- Event types: Meeting, Deadline, Reminder, Milestone
- Color-coded events by type
- Navigate between months
- Shows upcoming events at a glance

### 3. Global Search 🔍
- Full-text search across all workspace files
- Indexed search for fast results
- Search across: MD, TXT, JSON, JS, TS, TSX, JSX, CSS, HTML, Python, Rust, Go, YAML, TOML files
- Reindex workspace on demand
- Shows file path, content preview, and metadata

### 4. Kanban Board 📊
- 5-column board: Backlog, Todo, In Progress, Review, Done
- Drag and drop task management
- Priority levels: Low, Medium, High, Urgent
- Due date tracking
- Task descriptions and tags
- Visual priority indicators

## Tech Stack

### Frontend
- **Next.js 16.1.6** - React framework with App Router
- **React 18** - UI library
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Lucide React** - Icon library
- **date-fns** - Date formatting
- **@dnd-kit** - Drag and drop for Kanban

### Backend
- **better-sqlite3** - Local SQLite database
- **Next.js API Routes** - RESTful API endpoints

## Database Schema

### Tables

#### `tasks`
```sql
- id (TEXT PRIMARY KEY)
- title (TEXT NOT NULL)
- description (TEXT)
- status (TEXT: todo | in-progress | done | blocked)
- priority (TEXT: low | medium | high | urgent)
- column (TEXT: backlog | todo | in-progress | review | done)
- due_date (TEXT - ISO datetime)
- created_at (TEXT - ISO datetime)
- updated_at (TEXT - ISO datetime)
- tags (TEXT)
- assignee (TEXT)
```

#### `events`
```sql
- id (TEXT PRIMARY KEY)
- title (TEXT NOT NULL)
- description (TEXT)
- start_date (TEXT NOT NULL - ISO datetime)
- end_date (TEXT - ISO datetime)
- location (TEXT)
- type (TEXT: meeting | deadline | reminder | milestone)
- status (TEXT: scheduled | ongoing | completed | cancelled)
- created_at (TEXT - ISO datetime)
- updated_at (TEXT - ISO datetime)
- tags (TEXT)
```

#### `activities`
```sql
- id (TEXT PRIMARY KEY)
- type (TEXT: task | event | file | system)
- title (TEXT NOT NULL)
- description (TEXT)
- entity_type (TEXT)
- entity_id (TEXT)
- created_at (TEXT - ISO datetime)
```

#### `file_index`
```sql
- id (TEXT PRIMARY KEY)
- path (TEXT UNIQUE)
- filename (TEXT NOT NULL)
- content (TEXT)
- last_modified (TEXT - ISO datetime)
- indexed_at (TEXT - ISO datetime)
- file_type (TEXT)
- size (INTEGER)
```

## API Endpoints

### Tasks
- `GET /api/frankie/tasks` - Get all tasks or by column
- `POST /api/frankie/tasks` - Create new task
- `PATCH /api/frankie/tasks` - Update task or move between columns
- `DELETE /api/frankie/tasks?id={id}` - Delete task

### Events
- `GET /api/frankie/events` - Get all events or by date range
- `POST /api/frankie/events` - Create new event
- `PATCH /api/frankie/events` - Update event
- `DELETE /api/frankie/events?id={id}` - Delete event

### Activities
- `GET /api/frankie/activities` - Get activities (optional `type` filter, `limit` param)
- `POST /api/frankie/activities` - Log activity

### Search
- `GET /api/frankie/search?q={query}&limit={n}` - Search files
- `POST /api/frankie/search` - Manage index (`action: index` or `rebuild`)

## Setup & Initialization

### 1. Install Dependencies
```bash
npm install better-sqlite3 @types/better-sqlite3 date-fns @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

### 2. Initialize Database
```bash
npx tsx scripts/init-frankie-os.ts
```

This will:
- Create SQLite database at `.frankie-os/frankie-os.db`
- Create all tables and indexes
- Seed sample data (6 tasks, 5 events, 3 activities)
- Index workspace files (~366 files)

### 3. Run Development Server
```bash
npm run dev
```

### 4. Access Dashboard
Open browser to: http://localhost:3000/frankie-os

## Usage

### Activity Feed
- View all recent activities
- Click icons to filter by type
- Shows timestamp and description

### Calendar
- Click month arrows to navigate
- View events on specific dates
- Events show type with color coding:
  - 🟦 Blue: Meeting
  - 🔴 Red: Deadline
  - 🟡 Yellow: Reminder
  - 🟩 Green: Milestone

### Global Search
- Type in search bar (min 2 characters)
- Results appear in real-time
- Click "Reindex Files" to refresh index
- Shows filename, path, content preview

### Kanban Board
- View tasks by column
- Drag tasks between columns
- Click tasks to edit
- Priority colors:
  - 🟢 Green: Low
  - 🔵 Blue: Medium
  - 🟠 Orange: High
  - 🔴 Red: Urgent

## File Structure

```
.
├── app/
│   ├── api/
│   │   └── frankie/
│   │       ├── tasks/
│   │       │   └── route.ts
│   │       ├── events/
│   │       │   └── route.ts
│   │       ├── activities/
│   │       │   └── route.ts
│   │       └── search/
│   │           └── route.ts
│   └── frankie-os/
│       └── page.tsx
├── lib/
│   ├── db/
│   │   ├── schema.ts
│   │   └── queries.ts
│   ├── indexer.ts
│   └── seed-data.ts
├── scripts/
│   └── init-frankie-os.ts
└── .frankie-os/
    └── frankie-os.db
```

## Responsive Design

The dashboard is fully responsive:
- **Desktop**: Full-width layout with all features visible
- **Tablet**: Compact navigation, scrollable Kanban columns
- **Mobile**: Tab navigation, stacked layout, horizontal scroll for Kanban

## Future Enhancements

- [ ] Task detail modal with edit form
- [ ] Event creation modal with date picker
- [ ] Filtering and sorting options
- [ ] Export/Import data
- [ ] Dark/Light theme toggle
- [ ] User authentication
- [ ] Real-time updates with WebSockets
- [ ] File attachments for tasks
- [ ] Subtasks and dependencies
- [ ] Analytics and reports

## Troubleshooting

### Database Locked Error
The database uses WAL mode for better performance. If you encounter lock errors, ensure only one process is accessing the database.

### Search Not Working
Click "Reindex Files" button in the Search tab to rebuild the index.

### Drag and Drop Issues
Ensure you're using a modern browser with pointer events support.

## Performance

- **Database**: SQLite with WAL mode for concurrent reads/writes
- **Search**: Full-text index on filename and content
- **Caching**: React Query for API data (if added)
- **Bundle Size**: Optimized with Next.js code splitting

## Security

- Local database only (no cloud storage)
- File access limited to workspace directory
- Input validation on all API endpoints
- No sensitive data stored in plain text

## License

Internal use for Frankie OS project.

---

Built with 🧟‍♂️ by Frankie - Your Autonomous AI Assistant
