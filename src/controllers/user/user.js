'use strict';

const logger = require('../../logger')();

/**
 * @function getUser
 * @description retreive user data from db and return to caller in response
 *              response is json formatted
 * @param {Object} req - http request
 * @param {Object} res - http response
 */
function getUser(req, res) {
  logger.debug('HH::TODO implement getUser');
  res.status(200).json({status: 'getUser'});
}

/**
 * @function addUser
 * @description insert user data into db and return success status in response
 * @param {Object} req - http request
 * @param {Object} res - http response
 */
function addUser(req, res) {
  logger.debug('HH::TODO implement addUser');
  res.status(200).json({status: 'addUser'});
}

/**
 * @function editUser
 * @description update user data in db and return success status in response
 * @param {Object} req - http request
 * @param {Object} res - http response
 */
function editUser(req, res) {
  logger.debug('HH::TODO implement editUser');
  res.status(200).json({status: 'editUser'});
}

/**
 * @function deleteUser
 * @description delete user data from db and return success status in response
 * @param {Object} req - http request
 * @param {Object} res - http response
 */
function deleteUser(req, res) {
  logger.debug('HH::TODO implement deleteUser');
  res.status(200).json({status: 'deleteUser'});
}

module.exports = {
  getUser,
  addUser,
  editUser,
  deleteUser,
};
