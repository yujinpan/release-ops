import conventionalChangelog from 'conventional-changelog';
import fs from 'fs';
import * as path from 'path';
import { format } from 'prettier';
import * as process from 'process';

import type { Readable } from 'stream';

import { promptsConfirm } from './utils';

export async function updateChangeLog() {
  const changelogFilePath = path.resolve(process.cwd(), 'CHANGELOG.md');
  const existChangelog = fs.existsSync(changelogFilePath)
    ? fs.readFileSync(changelogFilePath).toString()
    : '';

  const changelog = await readStringFromStream(
    conventionalChangelog({ preset: 'angular' }),
  );

  fs.writeFileSync(
    changelogFilePath,
    await format(changelog + '\n' + existChangelog, {
      filepath: changelogFilePath,
    }),
  );

  await promptsConfirm(
    `CHANGELOG.md has been generated. Is the check correct?`,
  );
}

async function readStringFromStream(stream: Readable, _result = '') {
  for await (const chunk of stream) {
    _result += chunk.toString();
  }

  return _result;
}
