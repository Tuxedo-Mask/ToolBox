const express = require('express');

const {
  healthz,
  root,
} = require('./controllers');

module.exports = () => {
  const router = new express.Router();
  router.get('/', root);
  router.get('/healthz', healthz);
  return router;
};
