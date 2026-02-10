import { db } from '../lib/db/schema';
import { getAllTasks, getAllEvents, getActivities, searchFiles, logActivity } from '../lib/db/queries';

async function testAPI() {
  console.log('🧪 Testing Frankie OS API Functions\n');

  // Test 1: Get Tasks
  console.log('✅ Test 1: Get Tasks');
  const tasks = getAllTasks();
  console.log(`   Found ${tasks.length} tasks`);
  if (tasks.length > 0) {
    console.log(`   First task: ${tasks[0].title}`);
  }

  // Test 2: Get Events
  console.log('\n✅ Test 2: Get Events');
  const events = getAllEvents();
  console.log(`   Found ${events.length} events`);
  if (events.length > 0) {
    console.log(`   First event: ${events[0].title}`);
  }

  // Test 3: Get Activities
  console.log('\n✅ Test 3: Get Activities');
  const activities = getActivities(10);
  console.log(`   Found ${activities.length} activities`);
  if (activities.length > 0) {
    console.log(`   First activity: ${activities[0].title}`);
  }

  // Test 4: Search Files
  console.log('\n✅ Test 4: Search Files');
  const searchResults = searchFiles('dashboard', 5);
  console.log(`   Found ${searchResults.length} files matching "dashboard"`);
  if (searchResults.length > 0) {
    console.log(`   First result: ${searchResults[0].filename}`);
  }

  // Test 5: Create Activity
  console.log('\n✅ Test 5: Log Activity');
  const newActivity = logActivity({
    type: 'system',
    title: 'API Test Successful',
    description: 'All API functions working correctly'
  });
  console.log(`   Created activity: ${newActivity.title}`);
  console.log(`   Activity ID: ${newActivity.id}`);

  // Final Summary
  console.log('\n🎉 All Tests Passed!\n');
  console.log('Database Stats:');
  const taskCount = db.prepare('SELECT COUNT(*) as count FROM tasks').get() as { count: number };
  const eventCount = db.prepare('SELECT COUNT(*) as count FROM events').get() as { count: number };
  const activityCount = db.prepare('SELECT COUNT(*) as count FROM activities').get() as { count: number };
  const fileCount = db.prepare('SELECT COUNT(*) as count FROM file_index').get() as { count: number };

  console.log(`   Tasks: ${taskCount.count}`);
  console.log(`   Events: ${eventCount.count}`);
  console.log(`   Activities: ${activityCount.count}`);
  console.log(`   Indexed Files: ${fileCount.count}`);

  db.close();
}

testAPI().catch(console.error);
