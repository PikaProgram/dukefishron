import DukeClient from '../utils/client';
import { join } from 'path';
import { readdirSync } from 'fs';
import { event } from '../utils/types';
import { logger } from '../utils/config';

/**
 * RegisterEvents
 * @param client
 * @param path
 */

export async function registerEvents(client: DukeClient, path: string) {
	const filepath = join(__dirname, path);

	// Read All Files/Directory
	const files = readdirSync(filepath);
	for (const file of files) {
		// Register JS/TS Files
		if (file.endsWith('.ts') || file.endsWith('.js')) {
			try {
				const event: event = await import(join(filepath, file));
				client.event.set(event.name, event);
				client.on(event.name, event.run.bind(event, client));
				logger.info(`Registered Event: ${event.name}`);
			} catch (e) {
				console.log(e);
			}
		}
	}
}
