'use strict';

var utils = require('../utils/writer.js');
var MusicEntity = require('../service/MusicEntityService');

module.exports.getMusicEntities = function getMusicEntities (req, res, next, keywords, name, date, type) {
  MusicEntity.getMusicEntities(keywords, name, date, type)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getMusicEntitybyId = function getMusicEntitybyId (req, res, next, id) {
  MusicEntity.getMusicEntitybyId(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
