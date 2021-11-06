const express = require('express');
const router = new express.Router();
const {
  healthz,
  root,
  swagger,
} = require('./controllers');

router.use('/docs', swagger);
router.get('/', root);
router.get('/healthz', healthz);
router.use('/docs', swagger);

module.exports = router;
