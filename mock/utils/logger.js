const log4js = require("log4js");
const chalk = require('chalk')
const log = console.log
log4js.configure({
  appenders: { 
    cheese: {
      type: 'datefile',
      filename: 'logs/cheese.log',
      pattern: '-yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      compress: true,
      daysToKeep: 30
    },
  },
  categories: { default: { appenders: ["cheese"], level: "warn" } }
});

const logger = log4js.getLogger("log:");

export const logDebug = msg => {
  log(chalk.blue('log debug:' + msg))
  logger.debug(msg)
}

export const logInfo = msg => {
  log(chalk.green(msg))
  logger.info(msg)
}

export const logWarn = msg => {
  log(chalk.yellow('log warn: ' + msg))
  logger.warn(msg)
}

export const logError = msg => {
  log(chalk.redBright('log error: ' + msg))
  logger.error(msg)
}

export const logoFatal = msg => {
  log(chalk.red('log fatal:' + msg))
  logger.fatal(msg)
}
