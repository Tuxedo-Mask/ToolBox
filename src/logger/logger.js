"use strict";

const { createLogger, format, transports } = require("winston");

const allLineBreaksRegExp = /(\r\n|\n|\r)/gm;
const whiteSpace = " ";
const stringType = "string";

/**
 * @function getFormattedString
 * @description Normilizes log message.
 * @param  {String} message - Message to be logged.
 * @return {String}
 */
function getFormattedString(message) {
  return typeof message === stringType ? message.replace(allLineBreaksRegExp, whiteSpace) : message;
}

/**
 * @function getCallerInfo
 * @description Retrieves caller's file name  and callLine.
 * @return {{String, Number}}
 */
function getCallerInfo() {
  // We parse info to find file name and line number from function call stack,
  // Needed caller function is 4 level above from getCallerInfo() function call,
  // So the fourth element of call stack is taken here to process.
  let callerLine = Error().stack.split("\n")[3];
  callerLine = callerLine.split("\\");
  callerLine = callerLine[callerLine.length - 1];
  callerLine = callerLine.split(":");

  const fileName = callerLine[0];
  const lineNumber = callerLine[1];
  return { fileName, lineNumber };
}

module.exports = (microserviceName, loglevel = (process.env.LOG_LEVEL || "info")) => {
  // The caller file and line number are not known here, they will be known in the place of logger call,
  // So the fileName and lineNumber will be computed or recomputed during that calls.
  let fileName = null;
  let lineNumber = null;

  const formatter = format.printf((msg) => {
    return JSON.stringify({
      timestamp: msg.timestamp,
      shortmessage: getFormattedString(msg.message),
      level: msg.level,
      source: microserviceName,
      file: fileName,
      line: lineNumber
    });
  });

  const logger = createLogger({
    format: format.combine(
      format.timestamp(),
      formatter
    ),
    transports: [new (transports.Console)({
      level: loglevel // logs up to specified level
    })]
  });

  return {
    error: (message) => {
      const callerInfo = getCallerInfo();
      fileName = callerInfo.fileName;
      lineNumber = callerInfo.lineNumber;
      return logger.error(getFormattedString(message));
    },
    warn: (message) => {
      const callerInfo = getCallerInfo();
      fileName = callerInfo.fileName;
      lineNumber = callerInfo.lineNumber;
      return logger.warn(getFormattedString(message));
    },
    info: (message) => {
      const callerInfo = getCallerInfo();
      fileName = callerInfo.fileName;
      lineNumber = callerInfo.lineNumber;
      return logger.info(getFormattedString(message));
    },
    verbose: (message) => {
      const callerInfo = getCallerInfo();
      fileName = callerInfo.fileName;
      lineNumber = callerInfo.lineNumber;
      return logger.verbose(getFormattedString(message));
    },
    debug: (message) => {
      const callerInfo = getCallerInfo();
      fileName = callerInfo.fileName;
      lineNumber = callerInfo.lineNumber;
      return logger.debug(getFormattedString(message));
    },
    silly: (message) => {
      const callerInfo = getCallerInfo();
      fileName = callerInfo.fileName;
      lineNumber = callerInfo.lineNumber;
      return logger.silly(getFormattedString(message));
    }
  };
};
