import type { VersionType } from './version';

import { updateChangeLog } from './changelog';
import { $$, printGreen } from './utils';
import { updateVersion } from './version';

export async function makeTag(type?: VersionType, preId?: string) {
  const version = await updateVersion(type, preId);

  await updateChangeLog().catch(async (e) => {
    await $$`git checkout package.json CHANGELOG.md`;
    return Promise.reject(e);
  });

  printGreen('Run building...');
  await $$`npm run build`.catch(async (e) => {
    await $$`git checkout package.json CHANGELOG.md`;
    return Promise.reject(e);
  });

  printGreen('Committing changes...');
  await $$`git add CHANGELOG.md package.json`;
  await $$`git commit -m ${version}`;
  await $$`git tag v${version}`;

  return version;
}
