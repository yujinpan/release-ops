import type { VersionType } from './version';

import { makeTag } from './tag';
import { printInfo, $$ } from './utils';

export async function release(
  type?: VersionType,
  options: { preId?: string; push?: boolean; publish?: boolean } = {},
) {
  const { preId, push = true, publish = true } = options;

  const version = await makeTag(type, preId);

  if (push) {
    printInfo('\nPushing...\n\n', 'cyan');
    await $$`git push origin refs/tags/v${version}`;
    await $$`git push`;
  }

  if (publish) {
    printInfo('\nPublishing the package...\n\n', 'cyan');
    await $$`npm publish`;
  }

  printInfo(`\nReleased v${version}!\n`, 'green');
}
