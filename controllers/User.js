"use strict";

var utils = require("../utils/writer.js");
var User = require("../service/UserService");

module.exports.addUserFollower = function addUserFollower(
  _,
  res,
  _,
  userID,
  followerID
) {
  if (userID == 404 || followerID == 404) {
    return utils.writeJson(
      res,
      utils.respondWithCode(404, {
        message:
          "Your requested resource is nowhere to be found! Perhaps try searching something else?",
        code: 404,
      })
    );
  }
  User.addUserFollower(userID, followerID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.completeAuthentication = function completeAuthentication(
  _,
  res,
  _,
  body,
  userID,
  platform
) {
  User.completeAuthentication(body, userID, platform)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteProfile = function deleteProfile(_, res, _, userID) {
  if (userID == 404) {
    return utils.writeJson(
      res,
      utils.respondWithCode(404, {
        message:
          "Your requested resource is nowhere to be found! Perhaps try searching something else?",
        code: 404,
      })
    );
  }
  User.deleteProfile(userID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getRecommended = function getRecommended(_, res, _, userID) {
  User.getRecommended(userID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getUserFollowers = function getUserFollowers(_, res, _, userID) {
  User.getUserFollowers(userID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getUserFollowing = function getUserFollowing(_, res, _, userID) {
  User.getUserFollowing(userID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateProfile = function updateProfile(_, res, _, body, userID) {
  if (userID == 404) {
    return utils.writeJson(
      res,
      utils.respondWithCode(404, {
        message:
          "Your requested resource is nowhere to be found! Perhaps try searching something else?",
        code: 404,
      })
    );
  }
  User.updateProfile(body, userID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userUserIDExternal_creationsPlatformGET =
  function userUserIDExternal_creationsPlatformGET(
    _,
    res,
    _,
    userID,
    platform
  ) {
    User.userUserIDExternal_creationsPlatformGET(userID, platform)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  };

module.exports.viewProfile = function viewProfile(_, res, _, userID) {
  if (userID == 404) {
    return utils.writeJson(
      res,
      utils.respondWithCode(404, {
        message:
          "Your requested resource is nowhere to be found! Perhaps try searching something else?",
        code: 404,
      })
    );
  }
  User.viewProfile(userID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
