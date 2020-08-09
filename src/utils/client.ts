import { Client, Collection, ClientOptions } from 'discord.js';
import { props, event } from './types';

export default class DukeClient extends Client {
  private _cmds = new Collection<string, props>();

  private _events = new Collection<string, event>();

  private _prefix: string | string[] = [''];

  private _limits: Map<string, number>;

  constructor(options?: ClientOptions) {
    super(options);
  }

  public get commands(): Collection<string, props> {
    return this._cmds;
  }

  public get event(): Collection<string, event> {
    return this._events;
  }

  public get prefix(): string | string[] {
    return this._prefix;
  }

  public set prefix(v: string | string[]) {
    this._prefix = v;
  }

  public get limits(): Map<string, number> {
    return this._limits;
  }

  public set limits(v: Map<string, number>) {
    this._limits = v;
  }
}
