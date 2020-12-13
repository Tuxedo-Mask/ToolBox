module.exports = (logLevel) => {
  // eslint-disable-next-line global-require
  return require('./logger')(logLevel);
};
