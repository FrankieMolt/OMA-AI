import { Command } from 'commander';
import chalk from 'chalk';
import execa from 'execa';
import ora from 'ora';

export function registerStatusCommand(program: Command) {
  program
    .command('status')
    .description('Check OMA System Health')
    .action(async () => {
      process.stdout.write(chalk.bold('\n🏥 OMA System Health Check\n') + '\n');

      const runCheck = async (
        name: string,
        checkFn: () => Promise<string | boolean>,
        versionCmd?: string
      ) => {
        const spinner = ora(name).start();
        try {
          const result = await checkFn();
          if (result) {
            let version = '';
            if (versionCmd) {
              try {
                const { stdout } = await execa.command(versionCmd);
                version = chalk.gray(` (${stdout.trim()})`);
              } catch (error) {
                // Ignore version check failure
              }
            }
            spinner.succeed(`${name}${version}`);
          } else {
            spinner.fail(`${name} (Not Found)`);
          }
        } catch (error) {
          spinner.fail(
            `${name} (Error: ${error instanceof Error ? error.message : String(error)})`
          );
        }
      };

      // 1. Node.js Check
      await runCheck('Node.js Runtime', async () => true, 'node --version');

      // 2. Python Check
      await runCheck(
        'Python Environment',
        async () => {
          try {
            await execa.command('python --version');
            return true;
          } catch {
            try {
              await execa.command('python3 --version');
              return true;
            } catch {
              return false;
            }
          }
        },
        process.platform === 'win32' ? 'python --version' : 'python3 --version'
      );

      // 3. Docker Check
      await runCheck(
        'Docker Engine',
        async () => {
          try {
            await execa.command('docker --version');
            return true;
          } catch {
            return false;
          }
        },
        'docker --version'
      );

      // 4. OMA Config Check
      await runCheck('OMA Configuration', async () => {
        const fs = await import('fs');
        const path = await import('path');
        return fs.existsSync(path.join(process.cwd(), 'oma.config.json'));
      });

      process.stdout.write('\n');
    });
}
