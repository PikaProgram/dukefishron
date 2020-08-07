import DukeClient from '../utils/client';
import { Message } from 'discord.js';

module.exports = {
	name: 'message',
	run: async (client: DukeClient, message: Message) => {
		let prefixes = [];
		let checkedPrefix = false;
		let usedPrefix = '';

		if (message.author.bot) return;
		if (typeof client.prefix === 'string') {
			prefixes = Array.from(client.prefix);
		} else prefixes = client.prefix;

		for (const thisPrefix of prefixes) {
			if (message.content.startsWith(thisPrefix || client.user)) {
				checkedPrefix = true;
				usedPrefix = thisPrefix;
			}
		}

		if (!checkedPrefix) return;

		const args = message.content.slice(usedPrefix.length).trim().split(/ +/);
		const command = args.shift().toLowerCase();

		const cmd = client.commands.get(command);

		if (!cmd) return;

		cmd.run(client, message, args);
	},
};
