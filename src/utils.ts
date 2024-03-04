import { $ } from 'execa';
import picocolors from 'picocolors';
import prompts from 'prompts';

export function printGreen(info: string) {
  // eslint-disable-next-line no-console
  printInfo(picocolors.green(`\n${info}`));
}

function printInfo(info: string) {
  // eslint-disable-next-line no-console
  console.log(info);
}

export function promptsConfirm(message: string) {
  return prompts({
    type: 'confirm',
    name: 'yes',
    message,
  }).then((res) => (res.yes ? Promise.resolve() : Promise.reject()));
}

export const $$ = $({ stdio: 'inherit' });
