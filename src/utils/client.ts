import { Client, Collection, ClientOptions } from 'discord.js';
import { props, event } from './types';

export default class DukeClient extends Client {
	private _cmds = new Collection<string, props>();

	private _events = new Collection<string, event>();

	private _prefix: string | string[] = [''];

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
}
