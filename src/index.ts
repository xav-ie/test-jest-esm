import util from 'node:util';
const { exec } = await import('node:child_process');
const execPromise = util.promisify(exec);

export async function currentCommit() {
  const { stdout: commitHash } = await execPromise('git rev-parse HEAD');
  return commitHash.trim();
}
