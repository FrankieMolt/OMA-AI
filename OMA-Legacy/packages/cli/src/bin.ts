#!/usr/bin/env node

/**
 * OpenMarketAccess CLI
 * (c) 2026 OpenMarketAccess
 */

import { Command } from 'commander';
import { registerDevCommand } from './commands/dev';
import { registerInitCommand } from './commands/init';
import { registerStatusCommand } from './commands/status';

const program = new Command();

program.name('oma').description('OpenMarketAccess - Neural Interface CLI').version('0.1.0');

// Register subcommands
registerDevCommand(program);
registerInitCommand(program);
registerStatusCommand(program);

program.parse(process.argv);
