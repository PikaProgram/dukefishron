import { Message } from 'discord.js';
import DukeClient from '../../utils/client';

module.exports = {
  run: async (client: DukeClient, message: Message): Promise<void> => {
    message.channel.send(client.ws.ping);
  },
  prop: {
    name: 'ping',
    desc: {
      desc: 'Display Bot Latency Info',
      example: 'ping',
      usage: 'ping',
    },
    aliases: ['p', 'pong', 'ponk'],
    perm: {
      userPerms: [],
      botPerms: [],
      ownerOnly: false,
    },
    limits: {
      rateLimit: 3,
      cooldown: 3 * 1000,
    },
  },
};
