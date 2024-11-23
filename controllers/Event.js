"use strict";

var utils = require("../utils/writer.js");
var Event = require("../service/EventService");

module.exports.getImport = function getImport(
  req,
  res,
  next,
  userID,
  importID
) {
  if (userID == 404 || importID == 404) {
    return utils.writeJson(
      res,
      utils.respondWithCode(404, {
        message:
          "Your requested resource is nowhere to be found! Perhaps try searching something else?",
        code: 404,
      })
    );
  }
  Event.getImport(userID, importID)
    .then(function (response) {
      console.log(response);
      utils.writeJson(res, response);
    })
    .catch(function (error) {
      utils.writeJson(error);
    });
};

module.exports.getRating = function getRating(
  req,
  res,
  next,
  userID,
  ratingID
) {
  console.log("as");
  if (userID == 404 || ratingID == 404) {
    return utils.writeJson(
      res,
      utils.respondWithCode(404, {
        message:
          "Your requested resource is nowhere to be found! Perhaps try searching something else?",
        code: 404,
      })
    );
  }
  Event.getRating(userID, ratingID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getShare = function getShare(req, res, next, userID, shareID) {
  if (userID == 404 || shareID == 404) {
    return utils.writeJson(
      res,
      utils.respondWithCode(404, {
        message:
          "Your requested resource is nowhere to be found! Perhaps try searching something else?",
        code: 404,
      })
    );
  }
  Event.getShare(userID, shareID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getSoundbite = function getSoundbite(
  req,
  res,
  next,
  userID,
  soundbiteID
) {
  if (userID == 404 || soundbiteID == 404) {
    return utils.writeJson(
      res,
      utils.respondWithCode(404, {
        message:
          "Your requested resource is nowhere to be found! Perhaps try searching something else?",
        code: 404,
      })
    );
  }
  Event.getSoundbite(userID, soundbiteID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postImport = function postImport(req, res, next, body, userID) {
  Event.postImport(body, userID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postRating = function postRating(req, res, next, body, userID) {
  Event.postRating(body, userID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postShare = function postShare(req, res, next, body, userID) {
  Event.postShare(body, userID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postSoundbite = function postSoundbite(
  req,
  res,
  next,
  body,
  userID
) {
  Event.postSoundbite(body, userID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
