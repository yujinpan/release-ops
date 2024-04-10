import { $ } from 'execa';
import * as process from 'node:process';
import picocolors from 'picocolors';
import prompts from 'prompts';

import type { Colors } from 'picocolors/types';

export function printInfo(
  info: string,
  color: keyof Omit<Colors, 'isColorSupported'> = 'white',
) {
  process.stdout.write(picocolors[color](info));
}

export function promptsConfirm(message: string) {
  return prompts({
    type: 'confirm',
    name: 'yes',
    message,
  }).then((res) => (res.yes ? Promise.resolve() : Promise.reject()));
}

export const $$ = $({ stdio: 'inherit' });
