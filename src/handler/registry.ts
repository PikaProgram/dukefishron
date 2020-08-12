import MoonClient from '../utils/client';
import { join } from 'path';
import { readdir, lstat } from 'fs/promises';
import { BaseCommand, BaseEvent } from './structure';
import DukeClient from '../utils/client';

/**
 * registerCommands
 * @param client MoonClient
 * @param dir string
 */

export async function registerCommands(
  client: MoonClient,
  dir = ''
): Promise<void> {
  const filePath = join(__dirname, '..', dir);
  const files = await readdir(filePath);

  for (const file of files) {
    const stat = await lstat(join(filePath, file));
    if (stat.isDirectory()) registerCommands(client, join(dir, file));
    if (file.endsWith('.js') || file.endsWith('.ts')) {
      const { default: Command } = await import(join('..', dir, file));
      const command: BaseCommand = new Command();
      client.commands.set(command.getName(), command);
      command.getAliases().forEach((alias: string) => {
        client.commands.set(alias, command);
      });
    }
  }
}

/**
 * registerEvent
 * @param client MoonClient
 * @param dir string
 */

export async function registerEvents(
  client: DukeClient,
  dir = ''
): Promise<void> {
  const filePath = join(__dirname, '..', dir);
  const files = await readdir(filePath);
  for (const file of files) {
    const { default: Event } = await import(join('..', dir, file));
    const event: BaseEvent = new Event();
    client.event.set(event.getName(), event);
    client.on(event.getName(), event.run.bind(event, client));
  }
}
