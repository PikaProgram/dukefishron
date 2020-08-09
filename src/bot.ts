import { config } from 'dotenv';
config();
import { prefix } from './utils/config';
import DukeClient from './utils/client';
import { registerCommand } from './handler/command';
import { join } from 'path';
import { registerEvents } from './handler/events';
const client: DukeClient = new DukeClient();

(async () => {
  client.prefix = prefix;
  client.limits = new Map<string, number>();
  await registerEvents(client, join('..', 'events'));
  await registerCommand(client, join('..', 'commands'));
  await client.login(process.env.DISCORD_BOT_TOKEN);
})();
