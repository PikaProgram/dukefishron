import { logger } from '../utils/config';
import DukeClient from '../utils/client';
import { formatName } from '../utils/functions';
import { BaseEvent } from '../handler/structure';

export default class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }

  async run(client: DukeClient): Promise<void> {
    logger.info(`${formatName(client.user.username)} is online`);
  }
}
