import type { VersionType } from './version';

import { updateChangeLog } from './changelog';
import { $$, printGreen } from './utils';
import { updateVersion } from './version';

export async function makeTag(type?: VersionType, preId?: string) {
  const version = await updateVersion(type, preId);

  printGreen('Run building...');
  await $$`npm run build`;

  await updateChangeLog();

  printGreen('Committing changes...');
  await $$`git add CHANGELOG.md package.json`;
  await $$`git commit -m ${version}`;
  await $$`git tag v${version}`;

  return version;
}
