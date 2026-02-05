import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { command } = body;

    if (!command) {
      return NextResponse.json(
        { error: 'Command is required' },
        { status: 400 }
      );
    }

    // Process the command (mock terminal)
    const output = processCommand(command);

    return NextResponse.json({ output });
  } catch (error) {
    console.error('Terminal error:', error);
    return NextResponse.json(
      { output: [{ text: 'Error processing command', color: 'text-red-500' }] },
      { status: 500 }
    );
  }
}

function processCommand(command: string): Array<{text: string, color: string}> {
  const cmd = command.trim().toLowerCase();
  const output: Array<{text: string, color: string}> = [];

  // Mock terminal commands
  if (cmd === 'help') {
    output.push({ text: 'Available commands:', color: 'text-purple-400' });
    output.push({ text: '  help     - Show this help message', color: 'text-gray-400' });
    output.push({ text: '  status   - Show system status', color: 'text-gray-400' });
    output.push({ text: '  agents   - List all agents', color: 'text-gray-400' });
    output.push({ text: '  clear    - Clear terminal', color: 'text-gray-400' });
    output.push({ text: '  version  - Show version info', color: 'text-gray-400' });
  } else if (cmd === 'status') {
    output.push({ text: '🤖 System Status: ONLINE', color: 'text-green-400' });
    output.push({ text: '📊 Database: CONNECTED', color: 'text-green-400' });
    output.push({ text: '💰 Payment Gateway: READY', color: 'text-green-400' });
    output.push({ text: '⏰ Uptime: 99.9%', color: 'text-blue-400' });
  } else if (cmd === 'agents') {
    output.push({ text: 'Total Agents: 0', color: 'text-purple-400' });
    output.push({ text: 'Active Agents: 0', color: 'text-green-400' });
    output.push({ text: 'Deploy your first agent from the Agents tab!', color: 'text-gray-400' });
  } else if (cmd === 'version') {
    output.push({ text: 'OMA-AI v1.0.0', color: 'text-purple-400' });
    output.push({ text: 'Frontend: Next.js 16.1.6', color: 'text-gray-400' });
    output.push({ text: 'Backend: FastAPI 0.109.2', color: 'text-gray-400' });
    output.push({ text: 'Protocol: x402 v0.1', color: 'text-gray-400' });
  } else if (cmd === 'clear') {
    // Return empty to clear the terminal
    return [];
  } else if (cmd.startsWith('echo ')) {
    const text = command.substring(5);
    output.push({ text: text, color: 'text-white' });
  } else {
    output.push({ text: `Command not found: ${command}`, color: 'text-red-500' });
    output.push({ text: 'Type "help" for available commands', color: 'text-gray-400' });
  }

  output.push({ text: '', color: '' });
  return output;
}
