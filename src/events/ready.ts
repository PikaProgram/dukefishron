import { logger } from '../utils/config';
import DukeClient from '../utils/client';

module.exports = {
  name: 'ready',
  run: async (client: DukeClient) => {
    logger.info(`${client.user.username} Is Online`);
    logger.info(
      `Serving ${client.guilds.cache.size} Guilds, ${client.channels.cache.size} Channels, & ${client.users.cache.size} Users`
    );
  },
};
