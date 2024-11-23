'use strict';

var utils = require('../utils/writer.js');
var MusicEntity = require('../service/MusicEntityService');

module.exports.getMusicEntities = function getMusicEntities (req, res, next, keywords, name, date, type) {
  if(keywords === "404" || name === "404" || date === "404" || type === "404") {
    return utils.writeJson(res, utils.respondWithCode(404, {"message": "Your requested resource is nowhere to be found! Perhaps try searching something else?","code": 404}));
  }
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
