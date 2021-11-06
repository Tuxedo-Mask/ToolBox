const express = require('express');
const router = new express.Router();
const {
  healthz,
  root,
  swagger,
} = require('./controllers');
const {endpoints} = require('./constants');

router.get(endpoints.root, root);
router.use(endpoints.docs, swagger);
router.get(endpoints.healthz, healthz);

module.exports = router;
