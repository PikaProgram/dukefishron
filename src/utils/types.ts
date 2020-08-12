import { PermissionResolvable, ClientEvents } from 'discord.js';
import DukeClient from './client';
export type prop = {
  desc: {
    content: string;
    usage: string;
    example: string | string[];
    category: string;
  };
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

export type event = {
  name: keyof ClientEvents;
  run(client: DukeClient, ...args: unknown[]): void;
};
