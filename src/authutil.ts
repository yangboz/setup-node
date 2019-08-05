import * as core from '@actions/core';
import * as path from 'path';
import * as exec from '@actions/exec';

export async function configAuth(registryUrl: string) {
  let npmrc: string = path.resolve(process.cwd(), '.npmrc');
  let yarnrc: string = path.resolve(process.cwd(), '.yarnrc');

  await writeRegistryToFile(registryUrl, 'npm', 'NPM_TOKEN');
  // writeRegistryToFile(registryUrl, 'yarn', 'YARN_TOKEN');
}

async function writeRegistryToFile(
  registryUrl: string,
  packageManager: string,
  authTokenName: string
) {
  core.debug(`Setting up ${packageManager} auth`);
  await exec.exec(`${packageManager} config set registry=${registryUrl}`);
  await exec.exec(`${packageManager} config set always-auth=true`);
  await exec.exec(
    packageManager +
      ' config set ' +
      registryUrl.replace(/(^\w+:|^)/, '') +
      ':_authToken ${' +
      authTokenName +
      '}'
  );
}
