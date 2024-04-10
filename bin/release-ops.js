#!/usr/bin/env node

import yargs from 'yargs';

import {
  release,
  updateChangeLog,
  updateVersion,
  makeTag,
} from '../lib/index.js';

const types = 'beta/rc/alpha/patch/minor/major/prerelease...';

yargs(process.argv.slice(2))
  .scriptName('release-ops')
  .usage('$0 <command> [args]')
  .command(
    '$0',
    `release ${types}`,
    {
      p: { alias: 'preid', string: true },
      push: { boolean: true, default: true },
      publish: { boolean: true, default: true },
    },
    (args) => {
      release(args._[0], { ...args, preId: args.p });
    },
  )
  .command('tag', `make tag with type: ${types}`, (args) =>
    args.command('$0', '', { p: { alias: 'preid', string: true } }, (args) => {
      makeTag(args._[1], args.p);
    }),
  )
  .command('version', `update version with type: ${types}`, (args) =>
    args.command('$0', '', { p: { alias: 'preid', string: true } }, (args) => {
      updateVersion(args._[1], args.p);
    }),
  )
  .command('changelog', 'update changelog', {}, () => {
    updateChangeLog();
  })
  .alias('v', 'version')
  .alias('h', 'help')
  .parse();
