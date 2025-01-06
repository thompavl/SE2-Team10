"use strict";

var utils = require("../utils/writer.js");
var Post = require("../service/PostService");

module.exports.addUserPost = function addUserPost(req, res, next, body) {
  Post.addUserPost(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.comment = function comment(_, res, _, body, postID) {
  Post.comment(body, postID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteUserPost = function deleteUserPost(_, res, _, postID) {
  Post.deleteUserPost(postID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getPost = function getPost(_, res, _, postID) {
  if (postID == 404) {
    return utils.writeJson(
      res,
      utils.respondWithCode(404, {
        message:
          "Your requested resource is nowhere to be found! Perhaps try searching something else?",
        code: 404,
      })
    );
  }
  Post.getPost(postID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getUserFeed = function getUserFeed(_, res, _, userID) {
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
  Post.getUserFeed(userID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getUserPosts = function getUserPosts(_, res, _, userID) {
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
  Post.getUserPosts(userID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.react = function react(_, res, _, body, postID) {
  Post.react(body, postID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
