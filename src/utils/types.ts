import { Message, PermissionResolvable } from 'discord.js';
import DukeClient from './client';
export type props = {
	run(client: DukeClient, msg: Message, args: string[]);
	help: {
		name: string;
		desc: {
			desc: string;
			usage: string;
			example: string | string[];
		};
		aliases: string[];
		perm?: {
			userPerms?: PermissionResolvable[];
			botPerms?: PermissionResolvable[];
			ownerOnly?: boolean;
		};
	};
};

export type event = {
	name: any;
	run(client: DukeClient, args?: any): void;
};
