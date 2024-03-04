import type { VersionType } from './version';

import { makeTag } from './tag';
import { printGreen, $$ } from './utils';

export async function release(type?: VersionType, preId?: string) {
  const version = await makeTag(type, preId);

  printGreen('Publishing the package...');
  await $$`npm publish`;

  printGreen('Pushing...');
  await $$`git push origin refs/tags/v${version}`;
  await $$`git push`;
}
