import * as winston from 'winston';

const { combine, timestamp, printf, colorize } = winston.format;

const logger = winston.createLogger({
  level: 'info',
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    }),
    printf((info) => `[${info.timestamp}]${!info.message.unique_id ? '' : ' - [' + info.message.unique_id + '] -'} ${info.level}: ${info.message.text ? info.message.text : info.message}`)
  ),
  transports: [
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),
    new winston.transports.File({
      filename: 'logs/warnings.log',
      level: 'warn',
    }),
    new winston.transports.File({
      filename: 'logs/combined.log',
    }),
    new (winston.transports.Console)({
      format: combine(
        colorize({ all: true }),
      )
    }),
  ],
  exitOnError: false
})

export default logger;
