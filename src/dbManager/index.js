const dbMgr = require("./dbManager")();
module.exports = () => {
  return dbMgr;
};
