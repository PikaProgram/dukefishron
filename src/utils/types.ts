import { Message, PermissionResolvable, ClientEvents } from 'discord.js';
import DukeClient from './client';
export type props = {
  run(client: DukeClient, msg: Message, args: string[]);
  prop: {
    name: string;
    desc: {
      desc: string;
      usage: string;
      example: string | string[];
    };
    aliases: string[];
    perm: {
      userPerms: PermissionResolvable[];
      botPerms: PermissionResolvable[];
      ownerOnly: boolean;
    };
    limits: {
      rateLimit: number;
      cooldown: number;
    };
  };
};

export type event = {
  name: keyof ClientEvents;
  run(client: DukeClient, ...args: unknown[]): void;
};
