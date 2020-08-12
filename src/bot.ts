import { config } from 'dotenv';
config();
import { prefix } from './utils/config';
import DukeClient from './utils/client';
import { registerCommands, registerEvents } from './handler/registry';
const client: DukeClient = new DukeClient();

(async () => {
  client.prefix = prefix;
  client.limits = new Map<string, number>();
  await registerEvents(client, 'events');
  await registerCommands(client, 'commands');
  await client.login(process.env.DISCORD_BOT_TOKEN);
})();
