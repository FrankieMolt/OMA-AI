import { createTask, createEvent, logActivity } from "./db/queries";

export async function seedSampleData() {
  console.log("Seeding sample data...");

  // Sample tasks
  const sampleTasks = [
    {
      title: "Build Frankie OS Dashboard",
      description:
        "Create internal dashboard with Activity Feed, Calendar, Global Search, and Kanban Board",
      status: "in-progress" as const,
      priority: "high" as const,
      column: "in-progress" as const,
      due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      tags: "frankie-os,dashboard,next.js",
      assignee: "Frankie",
    },
    {
      title: "Integrate SQLite Database",
      description: "Set up better-sqlite3 for local data persistence",
      status: "done" as const,
      priority: "high" as const,
      column: "done" as const,
      tags: "database,sqlite",
      assignee: "Frankie",
    },
    {
      title: "Implement Drag and Drop",
      description: "Add @dnd-kit for Kanban board drag and drop functionality",
      status: "todo" as const,
      priority: "medium" as const,
      column: "todo" as const,
      tags: "ui,drag-drop",
      assignee: "Frankie",
    },
    {
      title: "Build Global Search Indexer",
      description: "Create file indexing system for workspace-wide search",
      status: "done" as const,
      priority: "high" as const,
      column: "done" as const,
      tags: "search,indexing",
      assignee: "Frankie",
    },
    {
      title: "Add Calendar View",
      description: "Implement calendar component with event management",
      status: "todo" as const,
      priority: "medium" as const,
      column: "todo" as const,
      tags: "calendar,events",
      assignee: "Frankie",
    },
    {
      title: "Polish UI/UX",
      description: "Improve responsive design, animations, and overall polish",
      status: "todo" as const,
      priority: "low" as const,
      column: "todo" as const,
      tags: "ui,ux,polish",
      assignee: "Frankie",
    },
  ];

  // Sample events
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);

  const sampleEvents = [
    {
      title: "Frankie OS Sprint Review",
      description: "Review progress on dashboard implementation",
      start_date: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 2,
        14,
        0,
      ).toISOString(),
      end_date: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 2,
        15,
        0,
      ).toISOString(),
      location: "Virtual",
      type: "meeting" as const,
      status: "scheduled" as const,
      tags: "frankie-os,review",
    },
    {
      title: "Dashboard Deadline",
      description: "Complete Frankie OS internal dashboard",
      start_date: nextWeek.toISOString(),
      type: "deadline" as const,
      status: "scheduled" as const,
      tags: "deadline,frankie-os",
    },
    {
      title: "Code Review Session",
      description: "Review pull requests for dashboard components",
      start_date: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 3,
        10,
        0,
      ).toISOString(),
      end_date: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 3,
        11,
        0,
      ).toISOString(),
      location: "Virtual",
      type: "meeting" as const,
      status: "scheduled" as const,
      tags: "code-review",
    },
    {
      title: "Milestone: Alpha Release",
      description: "First alpha release of Frankie OS dashboard",
      start_date: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 14,
      ).toISOString(),
      type: "milestone" as const,
      status: "scheduled" as const,
      tags: "milestone,release",
    },
    {
      title: "Backup Database",
      description: "Regular database backup reminder",
      start_date: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 5,
        2,
        0,
      ).toISOString(),
      type: "reminder" as const,
      status: "scheduled" as const,
      tags: "maintenance,backup",
    },
  ];

  // Create tasks
  sampleTasks.forEach((task) => {
    try {
      createTask(task);
      console.log(`Created task: ${task.title}`);
    } catch (error) {
      console.error(`Error creating task: ${task.title}`, error);
    }
  });

  // Create events
  sampleEvents.forEach((event) => {
    try {
      createEvent(event);
      console.log(`Created event: ${event.title}`);
    } catch (error) {
      console.error(`Error creating event: ${event.title}`, error);
    }
  });

  // Create sample activities
  const sampleActivities = [
    {
      type: "system" as const,
      title: "Frankie OS Dashboard initialized",
      description: "Welcome to Frankie OS internal dashboard",
    },
    {
      type: "task" as const,
      title: "Started project planning",
      description: "Defined requirements for dashboard components",
    },
    {
      type: "file" as const,
      title: "Indexed workspace files",
      description: "Global search ready",
    },
  ];

  sampleActivities.forEach((activity) => {
    try {
      logActivity(activity);
      console.log(`Logged activity: ${activity.title}`);
    } catch (error) {
      console.error(`Error logging activity: ${activity.title}`, error);
    }
  });

  console.log("Sample data seeded successfully!");
}

// Run if called directly
if (require.main === module) {
  seedSampleData().catch(console.error);
}
