import { jest } from '@jest/globals';

const commitHash = 'yourCommitHash';
jest.unstable_mockModule('node:child_process', async () => {
  const originalModule = await import('node:child_process');
  return {
    ...originalModule,
    exec: jest.fn((cmd: string, callback: Function) => {
      if (cmd === 'git rev-parse HEAD') {
        callback(null, { stdout: `${commitHash}\n` });
      } else {
        callback(new Error(`Unknown command: ${cmd}`));
      }
    }),
  };
});

let currentCommit: undefined | (() => Promise<string>);
beforeAll(async () => {
  const module = await import('./index.js');
  currentCommit = module.currentCommit;
});
// const {
//   currentCommit,
//   // currentCommitMessage,
//   // getCurrentBranch,
//   // getGitInfo,
//   // repositoryInfo,
// } = await import('./index.js');
// import { currentCommit } from '../index.js';

describe('Git Functions', () => {
  // beforeEach(() => {
  //   jest.resetModules();
  // });
  // afterEach(() => {
  //   jest.clearAllMocks();
  //   jest.resetModules();
  // });

  it('should get current commit', async () => {
    if (!currentCommit) {
      console.error('currentCommit is not defined');
      throw new Error('currentCommit is not defined');
    }
    const commit = await currentCommit();
    expect(commit).toBe(commitHash);
  });
});
