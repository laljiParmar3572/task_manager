const { createLogger, format, transports } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const customLevels = {
    levels: {
      critical: 0,
      error: 1,
      warn: 2,
      info: 3,
      debug: 4
    },
    colors: {
      critical: 'red',
      error: 'red',
      warn: 'yellow',
      info: 'green',
      debug: 'blue'
    }
  };
const logger = createLogger({
    levels:customLevels.levels,
    level: 'error',
    format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
    ),
    transports: [
        new transports.Console(),
        new DailyRotateFile({
            filename: 'application-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d'
          })

    ]
});


module.exports = logger;
