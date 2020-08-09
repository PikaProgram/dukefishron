import { PermissionResolvable, GuildMember } from 'discord.js';

/**
 * formatName
 * @param string
 * @returns
 * @description Capitalized The Given String
 */
export function formatName(str: string): string {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

/**
 * randomRes
 * @param string[]
 * @returns
 * @description Return A Random Response From An Array Of Responses
 */
export function randomRes(arr: string[]): string {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * missingPermsFormat
 * @param user GuildMember
 * @param perms PermissionResolvable[]
 * @description Returns A Formatted String From The User/Bot Missing Perms
 */

export function missingPermsFormat(
  user: GuildMember,
  perms: PermissionResolvable[]
): string {
  const missingPerms = user.permissions.missing(perms).map(
    str =>
      `\`${str
        .replace(/_/, ' ')
        .toLowerCase()
        .replace(/\b(\w)/g, char => char.toUpperCase())}\``
  );
  return missingPerms.length > 1
    ? `${missingPerms.slice(0, -1).join(', ')} and ${missingPerms.slice(-1)[0]}`
    : missingPerms[0];
}
