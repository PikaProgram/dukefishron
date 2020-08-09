import { join } from 'path';
import DukeClient from '../utils/client';
import { props } from '../utils/types';
import { lstat, readdir } from 'fs/promises';
import { logger } from '../utils/config';
import { formatName } from '../utils/functions';

/**
 * Register Command
 * @param client
 * @param path
 */

export async function registerCommand(
  client: DukeClient,
  path: string
): Promise<void> {
  const filepath = join(__dirname, path);
  const files = await readdir(filepath);

  // Read All Files/Directory
  for (const file of files) {
    const stat = await lstat(join(__dirname, path, file));
    if (stat.isDirectory()) registerCommand(client, join(path, file));
    else {
      // Register JS/TS Files
      if (file.endsWith('.js') || file.endsWith('.ts')) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const prop: props = require(join(path, file));

        const cmdName = prop.prop.name.toLowerCase();
        client.commands.set(cmdName, prop);

        logger.info(`Registered Command: ${formatName(cmdName)}`);

        // Register Aliases
        const aliases = prop.prop.aliases;
        if (aliases.length) {
          for (const alias in aliases) {
            client.commands.set(alias, prop);
          }
        }
      }
    }
  }
}
