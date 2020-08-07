import { join, resolve, dirname } from 'path';
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

export async function registerCommand(client: DukeClient, path: string) {
	const filepath = join(__dirname, path);
	const files = await readdir(filepath);

	// Read All Files/Directory
	for (const file of files) {
		let stat = await lstat(join(__dirname, path, file));
		if (stat.isDirectory()) registerCommand(client, join(path, file));
		else {
			// Register JS/TS Files
			if (file.endsWith('.js') || file.endsWith('.ts')) {
				const prop: props = require(join(path, file));

				const cmdName = prop.help.name.toLowerCase();
				client.commands.set(cmdName, prop);

				logger.info(`Registered Command: ${formatName(cmdName)}`);

				// Register Aliases
				let aliases = prop.help.aliases;
				if (aliases.length) {
					for (const alias in aliases) {
						client.commands.set(alias, prop);
					}
				}
			}
		}
	}
}
