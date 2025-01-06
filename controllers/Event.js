"use strict";

var utils = require("../utils/writer.js");
var Event = require("../service/EventService");

module.exports.getImport = function getImport(_, res, _, userID, importID) {
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
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getRating = function getRating(_, res, _, userID, ratingID) {
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

module.exports.getShare = function getShare(_, res, _, userID, shareID) {
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
  _,
  res,
  _,
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

module.exports.postImport = function postImport(_, res, _, body, userID) {
  Event.postImport(body, userID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postRating = function postRating(_, res, _, body, userID) {
  Event.postRating(body, userID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postShare = function postShare(_, res, _, body, userID) {
  Event.postShare(body, userID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postSoundbite = function postSoundbite(_, res, _, body, userID) {
  Event.postSoundbite(body, userID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
