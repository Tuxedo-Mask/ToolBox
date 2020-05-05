// TODO add logger
// const logger = require('../logger');

module.exports = (errType, err) => {
  console.log(`${errType}: Error: ${err.message}, Stack: ${err.stack}`);
  process.exit(1);
};
