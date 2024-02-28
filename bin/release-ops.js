#!/usr/bin/env node

import yargs from 'yargs';

import {
  release,
  updateChangeLog,
  updateVersion,
  makeTag,
} from '../lib/index.js';

yargs(process.argv.slice(2))
  .scriptName('release-ops')
  .usage('$0 <command> [args]')
  .command('$0', 'version patch or custom', {}, (args) => {
    release(args._[0]);
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
    { p: { alias: 'preid', string: true } },
    (args) => {
      release('prerelease', args.p);
    },
  )
  .command(
    'tag',
    'make tag with type: beta/rc/alpha/patch/minor/major/prerelease...',
    (args) =>
      args.command(
        '$0',
        '',
        { p: { alias: 'preid', string: true } },
        (args) => {
          makeTag(args._[1], args.p);
        },
      ),
  )
  .command(
    'version',
    'update version with type: beta/rc/alpha/patch/minor/major/prerelease...',
    (args) =>
      args.command(
        '$0',
        '',
        { p: { alias: 'preid', string: true } },
        (args) => {
          updateVersion(args._[1], args.p);
        },
      ),
  )
  .command('changelog', 'update changelog', {}, () => {
    updateChangeLog();
  })
  .alias('v', 'version')
  .alias('h', 'help')
  .parse();
