'use strict';

const logger = require('../../logger')();

/**
 * @function getStorage
 * @description retreive storage data from db and return to caller in response
 *              response is json formatted
 * @param {Object} req - http request containing owner userId and storageRoomId
 * @param {Object} res - http response
 */
function getStorage(req, res) {
  logger.debug('HH::TODO implement getStorage');
  res.status(200).json({status: 'getStorage'});
}

/**
 * @function addStorage
 * @description insert storage data into db and return success status in response
 * @param {Object} req - http request containing owner userId and storageRoomId
 * @param {Object} res - http response
 */
function addStorage(req, res) {
  logger.debug('HH::TODO implement addStorage');
  res.status(200).json({status: 'addStorage'});
}

/**
 * @function editStorage
 * @description update storage data in db and return success status in response
 * @param {Object} req - http request containing owner userId and storageRoomId
 * @param {Object} res - http response
 */
function editStorage(req, res) {
  logger.debug('HH::TODO implement editStorage');
  res.status(200).json({status: 'editStorage'});
}

/**
 * @function deleteStorage
 * @description delete storage data from db and return success status in response
 * @param {Object} req - http request containing owner userId and storageRoomId
 * @param {Object} res - http response
 */
function deleteStorage(req, res) {
  logger.debug('HH::TODO implement deleteStorage');
  res.status(200).json({status: 'deleteStorage'});
}

module.exports = {
  getStorage,
  addStorage,
  editStorage,
  deleteStorage,
};
