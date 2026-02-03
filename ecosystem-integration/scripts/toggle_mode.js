#!/usr/bin/env node
const { toggleMode, getMode } = require('../src/config-manager');

console.log(`Current Mode: ${getMode().toUpperCase()}`);
const newMode = toggleMode();
console.log(`✅ Switched to: ${newMode.toUpperCase()}`);

if (newMode === 'agent') {
    console.log("🤖 Agent is now AUTONOMOUS. Will respond to ClawTasks.");
} else {
    console.log("👤 Agent is now PAUSED. Waiting for human input.");
}
