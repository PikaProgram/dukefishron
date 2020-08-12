import { Message } from 'discord.js';
import DukeClient from '../../utils/client';
import { BaseCommand } from '../../handler/structure';
import { prop } from '../../utils/types';

export default class PingCommand extends BaseCommand {
  constructor() {
    super('ping', ['pong', 'p']);
  }

  prop: prop = {
    desc: {
      content: 'Display Bot Latency Info',
      example: 'ping',
      usage: 'ping',
      category: 'utils',
    },
    perm: {
      userPerms: [],
      botPerms: [],
      ownerOnly: false,
    },
    limits: {
      rateLimit: 3,
      cooldown: 3 * 1000,
    },
  };

  async run(client: DukeClient, message: Message): Promise<void> {
    message.channel.send(client.ws.ping);
  }
}
