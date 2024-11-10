'use strict';

var utils = require('../utils/writer.js');
var Event = require('../service/EventService');

module.exports.getImport = function getImport (req, res, next, userID, importID) {
  Event.getImport(userID, importID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getRating = function getRating (req, res, next, userID, ratingID) {
  Event.getRating(userID, ratingID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getShare = function getShare (req, res, next, userID, shareID) {
  Event.getShare(userID, shareID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getSoundbite = function getSoundbite (req, res, next, userID, soundbiteID) {
  Event.getSoundbite(userID, soundbiteID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postImport = function postImport (req, res, next, body, userID) {
  Event.postImport(body, userID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postRating = function postRating (req, res, next, body, userID) {
  Event.postRating(body, userID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postShare = function postShare (req, res, next, body, userID) {
  Event.postShare(body, userID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postSoundbite = function postSoundbite (req, res, next, body, userID) {
  Event.postSoundbite(body, userID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
