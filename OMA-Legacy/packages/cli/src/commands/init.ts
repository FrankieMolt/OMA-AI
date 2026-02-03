import { Command } from 'commander';
import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';

export function registerInitCommand(program: Command) {
  program
    .command('init')
    .description('Initialize OMA configuration')
    .action(async () => {
      console.warn(chalk.cyan.bold('\n🚀 OMA Initialization\n'));

      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'projectName',
          message: 'What is your project name?',
          default: 'my-agent-app',
        },
        {
          type: 'list',
          name: 'agentType',
          message: 'Select Agent Architecture:',
          choices: ['Hybrid (React + Python Cortex)', 'Web-Only (React + WebGPU)'],
        },
      ]);

      const spinner = ora('Scaffolding configuration...').start();

      const config = {
        name: answers.projectName,
        type: answers.agentType.includes('Hybrid') ? 'hybrid' : 'web',
        cortex: {
          enabled: answers.agentType.includes('Hybrid'),
          port: 8000,
        },
        web: {
          port: 3000,
        },
      };

      fs.writeFileSync(
        path.join(process.cwd(), 'oma.config.json'),
        JSON.stringify(config, null, 2)
      );

      spinner.succeed('Configuration created: oma.config.json');
      console.warn(chalk.green('\n✨ Setup complete! Run `oma dev` to start.'));
    });
}
