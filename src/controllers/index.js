'use strict';

const healthz = require('./healthz');
const root = require('./root');
const swagger = require('./swagger');
const userController = require('./user');
const storageRoomController = require('./storageRoom');
const storageController = require('./storage');

module.exports = {
  healthz,
  root,
  swagger,
  userController,
  storageRoomController,
  storageController,
};
