import { BaseEvent } from '../handler/structure';
import DukeClient from '../utils/client';
import { Message } from 'discord.js';
import { owners } from '../utils/config';
import { randomRes, missingPermsFormat } from '../utils/functions';
import {
  ownerOnly,
  userMissingPerms,
  botMissingPerms,
} from '../utils/responses';

export default class MessageEvent extends BaseEvent {
  constructor() {
    super('message');
  }

  async run(client: DukeClient, message: Message): Promise<void | Message> {
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

    if (cmd.prop.perm.ownerOnly && owners.includes(message.author.id))
      return message.reply(`${randomRes(ownerOnly)}`);
    if (
      cmd.prop.perm.userPerms &&
      !message.member.permissions.has(cmd.prop.perm.userPerms)
    )
      return message.reply(
        `${randomRes(
          userMissingPerms
        )}\nUser Missing Perm(s): ${missingPermsFormat(
          message.member,
          cmd.prop.perm.userPerms
        )}`
      );
    if (
      cmd.prop.perm.botPerms &&
      !message.guild.me.permissions.has(cmd.prop.perm.botPerms)
    )
      return message.reply(
        `${randomRes(
          botMissingPerms
        )}\nBot Missing Perm(s): ${missingPermsFormat(
          message.guild.me,
          cmd.prop.perm.botPerms
        )}`
      );
    if (cmd.prop.limits) {
      const current = client.limits.get(`${command}-${message.author.id}`);
      if (!current) client.limits.set(`${command}-${message.author.id}`, 1);
      else {
        if (current)
          client.limits.set(`${command}-${message.author.id}`, current + 1);
      }
      setTimeout(() => {
        client.limits.delete(`${command}-${message.author.id}`);
      }, cmd.prop.limits.cooldown);
    }
    cmd.run(client, message, args);
  }
}
