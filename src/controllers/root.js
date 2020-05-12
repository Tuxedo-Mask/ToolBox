const pckg = require("../../package");

module.exports = (req, res) => {
  res.send(`Greetings from ${pckg.name}`);
};
