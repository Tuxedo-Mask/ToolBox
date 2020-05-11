const logger = require("../logger")();

module.exports = (errType, err) => {
  logger.error(`${errType}: Error: ${err.message}, Stack: ${err.stack}`);
  process.exit(1);
};
