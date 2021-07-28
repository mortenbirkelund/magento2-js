import {Logger, transports as _transports} from 'winston';

const logger = new Logger({
  transports: [
    new _transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
    }),
  ],
  exitOnError: false,
});

// logger.info('Winston logging library initialized.');

const _logger = logger;
export {_logger as logger};
