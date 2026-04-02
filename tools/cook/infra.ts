import { workspaceRoot } from '@nx/devkit';
import inquirer from 'enquirer';
import {
  mkdirSync,
  readdirSync,
  readFileSync,
  renameSync,
  rmSync,
  writeFileSync,
} from 'fs';
import { execSync } from 'node:child_process';
import { basename, join, relative } from 'node:path';

const { prompt } = inquirer;

export class CommandRunner {
  executeCommand(
    command: string,
    { env }: { env?: Record<string, string> } = {},
  ): void {
    /* Ignore stdout. */
    execSync(command, {
      stdio: ['inherit', 'pipe', 'inherit'],
      env: {
        ...process.env,
        ...env,
      },
    });
  }
}

export const TRASH_PATH = join(workspaceRoot, 'tmp', 'trash');

export class FileSystemAdapter {
  readFile(path: string): string {
    return readFileSync(path, {
      encoding: 'utf-8',
    });
  }

  writeFile(path: string, content: string): void {
    writeFileSync(path, content, {
      encoding: 'utf-8',
    });
  }

  readDir(path: string): string[] {
    return readdirSync(path);
  }

  removeDir(path: string): void {
    mkdirSync(TRASH_PATH, { recursive: true });
    const targetPath = join(TRASH_PATH, `${basename(path)}-${Date.now()}`);
    renameSync(path, targetPath);
    try {
      rmSync(targetPath, { maxRetries: 5, recursive: true });
    } catch (error: unknown) {
      const relativeTargetPath = relative(workspaceRoot, targetPath);
      const reason = error instanceof Error ? error.message : error;
      console.warn(
        `⚠️ Failed to remove ${relativeTargetPath}. You may need to remove it manually. Reason: ${reason}`,
      );
    }
  }
}

export class GitAdapter {
  getCurrentBranch() {
    return execSync('git branch --show-current', {
      encoding: 'utf8',
    }).trim();
  }

  hasLocalChanges() {
    const status = execSync('git status --porcelain', { encoding: 'utf8' });
    return status.trim().length > 0;
  }
}

export class PromptAdapter {
  private _interactive = true;

  disableInteractivity() {
    this._interactive = false;
  }

  /**
   * @returns The result of the prompt, or null if the prompt was not interactive and no initial value was provided.
   */
  async prompt<T>(
    options: PromptOptions<T> & { initial: T[keyof T] },
  ): Promise<T>;
  async prompt<T>(options: PromptOptions<T>): Promise<T | null>;
  async prompt<T>(options: PromptOptions<T>): Promise<T | null> {
    const { name, initial } = options;

    if (!this._interactive) {
      if (initial === undefined) {
        throw new Error(
          'Initial value is required when interactivity is disabled',
        );
      }

      return initial !== undefined
        ? ({
            [name as keyof T]: initial,
          } as T)
        : null;
    }

    return await prompt(options);
  }
}

type PromptOptions<T> = Exclude<
  Parameters<typeof prompt<T>>[0],
  ((...args: unknown[]) => unknown) | unknown[]
>;
