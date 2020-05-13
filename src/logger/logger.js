"use strict";

const { createLogger, format, transports } = require("winston");
const path = require("path");
const getCallerFile = require("get-caller-file");

const allLineBreaksRegExp = /(\r\n|\n|\r)/gm;
const whiteSpace = " ";
const stringType = "string";

/**
 * @function getFormattedString
 * @description Normilizes log message.
 * @param  {String} message - Message to be logged.
 * @return {String}
 */
function getFormattedString (message) {
  return typeof message === stringType ? message.replace(allLineBreaksRegExp, whiteSpace) : message;
}

/**
 * @function getCallerInfo
 * @description Retrieves caller's file name  and callLine.
 * @return {{String, Number}}
 */
function getCallerInfo () {
  // We parse info to find file name and line number from function call stack,
  // Needed caller function is 4 level above from getCallerInfo() function call,
  // So the fourth element of call stack is taken here to process.
  let callerLine = Error().stack.split("\n")[3];
  callerLine = callerLine.split(path.sep);
  callerLine = callerLine[callerLine.length - 1];
  callerLine = callerLine.split(":");

  const callerFullPath = getCallerFile(3);
  const fileName = path.basename(callerFullPath);
  const lineNumber = callerLine[1];
  return { callerFullPath, fileName, lineNumber };
}

module.exports = (microserviceName, loglevel = (process.env.LOG_LEVEL || "info")) => {
  // The caller file and line number are not known here, they will be known in the place of logger call,
  // So the fileName and lineNumber will be computed or recomputed during that calls.
  let fileName = null;
  let lineNumber = null;
  let absolutePath = null;

  let formatter = format.printf((msg) => {
    return `${msg.level}: ${getFormattedString(msg.message)} file: ${fileName}`;
  });

  if (loglevel === "debug") {
    formatter = format.printf((msg) => {
      // HH::TODO add file path and decide print order
      return `${msg.level}: ${getFormattedString(msg.message)} file: ${absolutePath}:${lineNumber}`;
    });
  }

  const logger = createLogger({
    format: format.combine(
      format.timestamp(),
      format.colorize(),
      formatter
    ),
    transports: [new (transports.Console)({
      level: loglevel, // logs up to specified level
      stderrLevels: ["error"] // [redirect stream to std::err, "all messages logged by error function]"
    })]
  });

  return {
    error: (message) => {
      const callerInfo = getCallerInfo();
      absolutePath = callerInfo.callerFullPath;
      fileName = callerInfo.fileName;
      lineNumber = callerInfo.lineNumber;
      return logger.error(message);
    },
    warn: (message) => {
      const callerInfo = getCallerInfo();
      absolutePath = callerInfo.callerFullPath;
      fileName = callerInfo.fileName;
      lineNumber = callerInfo.lineNumber;
      return logger.warn(message);
    },
    info: (message) => {
      const callerInfo = getCallerInfo();
      absolutePath = callerInfo.callerFullPath;
      fileName = callerInfo.fileName;
      lineNumber = callerInfo.lineNumber;
      return logger.info(message);
    },
    verbose: (message) => {
      const callerInfo = getCallerInfo();
      absolutePath = callerInfo.callerFullPath;
      fileName = callerInfo.fileName;
      lineNumber = callerInfo.lineNumber;
      return logger.verbose(message);
    },
    debug: (message) => {
      const callerInfo = getCallerInfo();
      absolutePath = callerInfo.callerFullPath;
      fileName = callerInfo.fileName;
      lineNumber = callerInfo.lineNumber;
      return logger.debug(message);
    },
    silly: (message) => {
      const callerInfo = getCallerInfo();
      absolutePath = callerInfo.callerFullPath;
      fileName = callerInfo.fileName;
      lineNumber = callerInfo.lineNumber;
      return logger.silly(message);
    }
  };
};
