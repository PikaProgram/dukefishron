import { Message } from 'discord.js';
import DukeClient from '../../utils/client';

module.exports = {
	run: (client: DukeClient, msg: Message, args: string[]) => {
		msg.channel.send(client.ws.ping);
	},
	help: {
		name: 'ping',
		desc: {
			desc: 'Display Bot Latency Info',
			example: 'ping',
			usage: 'ping',
		},
		aliases: ['p', 'pong', 'ponk'],
	},
};
