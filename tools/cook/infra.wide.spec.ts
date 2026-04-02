import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { FileSystemAdapter, TRASH_PATH } from './infra';

describe(FileSystemAdapter, () => {
  it('moves directories to tmp before removing them', () => {
    const { tmpPath } = setUp();
    const folderToBeRemoved = join(tmpPath, 'file-system-adapter-test');
    mkdirSync(folderToBeRemoved, { recursive: true });
    writeFileSync(join(folderToBeRemoved, 'test.txt'), 'test');

    new FileSystemAdapter().removeDir(folderToBeRemoved);

    expect.soft(existsSync(folderToBeRemoved)).toBe(false);
    expect.soft(readdirSync(TRASH_PATH)).toHaveLength(0);
  });
});

function setUp() {
  rmSync(TRASH_PATH, { force: true, recursive: true });
  return {
    tmpPath: mkdtempSync(join(tmpdir(), 'file-system-adapter-test')),
  };
}
