'use strict';

const express = require('express');
const router = new express.Router();
const {
  healthz,
  root,
  swagger,
  userController,
  storageRoomController,
  storageController,
} = require('./controllers');
const {endpoints} = require('./constants');

router.get(endpoints.root, root);
router.use(endpoints.docs, swagger);
router.get(endpoints.healthz, healthz);

router.get(endpoints.user, userController.getUser);
router.put(endpoints.user, userController.addUser);
router.post(endpoints.user, userController.editUser);
router.delete(endpoints.user, userController.deleteUser);

router.get(endpoints.storageRoom, storageRoomController.getStorageRoom);
router.put(endpoints.storageRoom, storageRoomController.addStorageRoom);
router.post(endpoints.storageRoom, storageRoomController.editStorageRoom);
router.delete(endpoints.storageRoom, storageRoomController.deleteStorageRoom);

router.get(endpoints.storage, storageController.getStorage);
router.put(endpoints.storage, storageController.addStorage);
router.post(endpoints.storage, storageController.editStorage);
router.delete(endpoints.storage, storageController.deleteStorage);

module.exports = router;
