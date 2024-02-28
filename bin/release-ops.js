#!/usr/bin/env node

import yargs from 'yargs';

import { release } from '../lib/index.js';

yargs(process.argv.slice(2))
  .scriptName('release-ops')
  .usage('$0 <command> [args]')
  .command('$0', 'version patch or custom', {}, (args) => {
    release(args._[0] || 'patch');
  })
  .command(
    ['patch', 'minor', 'major'],
    'version patch/minor/major',
    {},
    (args) => {
      release(args._[0]);
    },
  )
  .command(
    'prerelease',
    'version prerelease',
    {
      p: {
        alias: 'preid',
        string: true,
      },
    },
    (args) => {
      release('prerelease', args.p);
    },
  )
  .alias('v', 'version')
  .alias('h', 'help')
  .parse();
