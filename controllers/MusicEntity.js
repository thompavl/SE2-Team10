"use strict";

var utils = require("../utils/writer.js");
var MusicEntity = require("../service/MusicEntityService");

module.exports.getMusicEntities = function getMusicEntities(
  _,
  res,
  _,
  keywords,
  name,
  date,
  type
) {
  if (
    keywords === "404" ||
    name === "404" ||
    date === "404" ||
    type === "404"
  ) {
    return utils.writeJson(
      res,
      utils.respondWithCode(404, {
        message:
          "Your requested resource is nowhere to be found! Perhaps try searching something else?",
        code: 404,
      })
    );
  }
  MusicEntity.getMusicEntities(keywords, name, date, type)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getMusicEntitybyId = function getMusicEntitybyId(_, res, _, id) {
  if (id == 404) {
    return utils.writeJson(
      res,
      utils.respondWithCode(404, {
        message:
          "Your requested resource is nowhere to be found! Perhaps try searching something else?",
        code: 404,
      })
    );
  }
  MusicEntity.getMusicEntitybyId(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
