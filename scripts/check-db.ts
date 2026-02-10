import { db } from '../lib/db/schema';

function checkDatabase() {
  console.log('📊 Frankie OS Database Status\n');

  // Check tasks
  const taskCount = db.prepare('SELECT COUNT(*) as count FROM tasks').get() as { count: number };
  console.log(`✅ Tasks: ${taskCount.count}`);

  // Check events
  const eventCount = db.prepare('SELECT COUNT(*) as count FROM events').get() as { count: number };
  console.log(`✅ Events: ${eventCount.count}`);

  // Check activities
  const activityCount = db.prepare('SELECT COUNT(*) as count FROM activities').get() as { count: number };
  console.log(`✅ Activities: ${activityCount.count}`);

  // Check files
  const fileCount = db.prepare('SELECT COUNT(*) as count FROM file_index').get() as { count: number };
  console.log(`✅ Indexed Files: ${fileCount.count}`);

  console.log('\n📋 Sample Tasks:');
  const tasks = db.prepare('SELECT id, title, status, priority, column FROM tasks LIMIT 3').all();
  tasks.forEach((task: any) => {
    console.log(`  - [${task.status}] ${task.title} (${task.priority}) in ${task.column}`);
  });

  console.log('\n📅 Sample Events:');
  const events = db.prepare('SELECT id, title, type, start_date FROM events LIMIT 3').all();
  events.forEach((event: any) => {
    const date = new Date(event.start_date).toLocaleDateString();
    console.log(`  - [${event.type}] ${event.title} on ${date}`);
  });

  console.log('\n📁 Sample Indexed Files:');
  const files = db.prepare('SELECT filename, path, file_type FROM file_index LIMIT 3').all();
  files.forEach((file: any) => {
    console.log(`  - ${file.filename} (${file.file_type})`);
  });

  db.close();
}

checkDatabase();
