import fs from 'fs';
import * as path from 'path';
import picocolors from 'picocolors';
import * as process from 'process';
import semver from 'semver';

import { printGreen, promptsConfirm } from './utils';

export type VersionType = semver.ReleaseType | 'beta' | 'rc' | 'alpha' | string;

/**
 * Update current version
 *
 * @example
 * updateVersion('patch');
 * // 1.0.0 => 1.0.1
 * updateVersion('1.0.123');
 * // 1.0.0 => 1.0.123
 * updateVersion('beta');
 * // 1.0.0 => 1.0.1-beta.0
 */
export async function updateVersion(
  type: VersionType = 'patch',
  preId?: string,
): Promise<string> {
  const pkgPath = path.resolve(process.cwd(), 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath).toString());
  const currentVersion = pkg.version;

  let nextVersion = '';
  if (/^\d/.test(type)) {
    nextVersion = type;
  } else {
    const isPrerelease = ['beta', 'rc', 'alpha'].includes(type);

    nextVersion = semver.inc(
      currentVersion,
      isPrerelease ? 'prerelease' : (type as semver.ReleaseType),
      isPrerelease ? preId || type : preId,
    );
  }

  if (!semver.valid(nextVersion))
    throw new Error(`Invalid custom version: ${type}`);

  await promptsConfirm(
    `Change current version ${picocolors.green(
      currentVersion,
    )} to ${picocolors.green(nextVersion)} ?`,
  );

  printGreen('Writing the package version...');
  fs.writeFileSync(
    pkgPath,
    JSON.stringify({ ...pkg, version: nextVersion }, null, 2) + '\n',
  );

  return nextVersion;
}
