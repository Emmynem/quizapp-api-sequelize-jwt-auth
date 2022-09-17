import * as winston from 'winston';

const { combine, timestamp, printf, colorize } = winston.format;

const logger = winston.createLogger({
  level: 'info',
  format: combine(
    colorize({ all: true }),
    timestamp({
      format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    }),
    printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
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
    new (winston.transports.Console)(),
  ],
  exitOnError: false
})

export default logger;
