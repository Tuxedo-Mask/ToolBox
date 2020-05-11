const express = require("express");
const pckg = require("../package");
const {
  healthz
} = require("./controllers");

module.exports = () => {
  const router = express.Router();
  router.get("/", (req, res) => res.send(`Greetings from ${pckg.name}`));
  router.get("/healthz", healthz);
  return router;
};
