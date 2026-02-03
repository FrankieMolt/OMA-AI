import { Command } from 'commander';
import chalk from 'chalk';
import execa from 'execa';
import path from 'path';
import fs from 'fs';

export function registerDevCommand(program: Command) {
  program
    .command('dev')
    .description('Start the OMA Development Environment')
    .action(async () => {
      process.stdout.write(chalk.bold.magenta('\n🧠 Starting OpenMarketAccess Cortex...\n') + '\n');

      const rootDir = process.cwd();
      const webPath = path.join(rootDir, 'apps', 'web');
      const backendPath = path.join(rootDir, 'apps', 'backend');
      const baseEnv = {
        ...process.env,
        FORCE_COLOR: 'true',
        NODE_ENV: process.env.NODE_ENV ?? 'development',
      };

      const processes: { kill: () => void }[] = [];

      // 1. Start Web Frontend
      if (fs.existsSync(webPath)) {
        process.stdout.write(chalk.blue('→ Detected Web App') + '\n');
        const webProc = execa('npm', ['run', 'dev'], {
          cwd: webPath,
          stdio: 'pipe',
          env: baseEnv,
        });

        webProc.stdout?.on('data', (data) => {
          process.stdout.write(chalk.blue('[WEB] ') + data);
        });

        processes.push(webProc);
      }

      // 2. Start Python Cortex (if exists)
      if (fs.existsSync(backendPath)) {
        process.stdout.write(chalk.green('→ Detected Python Cortex') + '\n');
        // Assuming 'python' or 'python3' is available and venv is optional for now
        // A more robust check would look for venv
        const pythonCmd = process.platform === 'win32' ? 'python' : 'python3';

        const backendProc = execa(pythonCmd, ['server.py'], {
          cwd: backendPath,
          stdio: 'pipe',
          env: { ...baseEnv, PYTHONUNBUFFERED: '1' },
        });

        backendProc.stdout?.on('data', (data) => {
          process.stdout.write(chalk.green('[CORTEX] ') + data);
        });

        backendProc.stderr?.on('data', (data) => {
          process.stdout.write(chalk.red('[CORTEX ERR] ') + data);
        });

        processes.push(backendProc);
      }

      // Handle Exit
      process.on('SIGINT', () => {
        process.stdout.write(chalk.gray('\nStopping all processes...') + '\n');
        processes.forEach((p) => p.kill());
        process.exit();
      });
    });
}
