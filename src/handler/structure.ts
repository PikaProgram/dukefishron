import { prop } from '../utils/types';
import DukeClient from '../utils/client';
import { Message, ClientEvents } from 'discord.js';

export abstract class BaseCommand {
  constructor(private name: string, private aliases: string[]) {}

  getName(): string {
    return this.name;
  }
  getAliases(): string[] {
    return this.aliases;
  }
  prop: prop;

  abstract async run(
    client: DukeClient,
    message: Message,
    args: string[] | null
  ): Promise<void | Message>;
}

export abstract class BaseEvent {
  constructor(private name: keyof ClientEvents) {}

  getName(): keyof ClientEvents {
    return this.name;
  }

  abstract async run(
    client: DukeClient,
    ...args: unknown[]
  ): Promise<void | Message>;
}
