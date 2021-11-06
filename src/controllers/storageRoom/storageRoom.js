'use strict';

const logger = require('../../logger')();

/**
 * @function getStorageRoom
 * @description retreive all storageRooms that belong to specified user
 *              response is json formatted
 * @param {Object} req - http request containing userId
 * @param {Object} res - http response
 */
function getStorageRoom(req, res) {
  logger.debug('HH::TODO implement getStorageRoom');
  res.status(200).json({status: 'getStorageRoom'});
}

/**
 * @function addStorageRoom
 * @description insert storage room data into db and return success status in response
 * @param {Object} req - http request containing owner userId
 * @param {Object} res - http response
 */
function addStorageRoom(req, res) {
  logger.debug('HH::TODO implement addStorageRoom');
  res.status(200).json({status: 'addStorageRoom'});
}

/**
 * @function editStorageRoom
 * @description update storage room data in db and return success status in response
 * @param {Object} req - http request containing owner userId
 * @param {Object} res - http response
 */
function editStorageRoom(req, res) {
  logger.debug('HH::TODO implement editUser');
  res.status(200).json({status: 'editStorageRoom'});
}

/**
 * @function deleteStorageRoom
 * @description delete storage room data from db and return success status in response
 * @param {Object} req - http request containing owner userId
 * @param {Object} res - http response
 */
function deleteStorageRoom(req, res) {
  logger.debug('HH::TODO implement deleteStorageRoom');
  res.status(200).json({status: 'deleteStorageRoom'});
}

module.exports = {
  getStorageRoom,
  addStorageRoom,
  editStorageRoom,
  deleteStorageRoom,
};
