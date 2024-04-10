import type { VersionType } from './version';

import { updateChangeLog } from './changelog';
import { $$, printInfo } from './utils';
import { updateVersion } from './version';

export async function makeTag(type?: VersionType, preId?: string) {
  const version = await updateVersion(type, preId);

  await updateChangeLog().catch(async (e) => {
    await $$`git checkout package.json CHANGELOG.md`;
    return Promise.reject(e);
  });

  printInfo('\nRun building...\n\n', 'cyan');
  await $$`npm run build`.catch(async (e) => {
    await $$`git checkout package.json CHANGELOG.md`;
    return Promise.reject(e);
  });

  printInfo('\nCommitting changes...\n\n', 'cyan');
  await $$`git add CHANGELOG.md package.json`;
  await $$`git commit -m ${version}`;
  await $$`git tag v${version}`;

  return version;
}
