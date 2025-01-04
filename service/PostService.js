'use strict';


/**
 * Uploads a post
 *
 * body Post Add a post for the user
 * returns Post
 **/
exports.addUserPost = function(_) {
  return new Promise(function(resolve, _) {
    var examples = {};
    examples['application/json'] = {
  "postComments" : [ {
    "authorID" : 2,
    "content" : "content"
  } ],
  "eventID" : 5,
  "postReactions" : [ {
    "authorID" : 5,
    "value" : "laugh"
  } ],
  "postID" : 1,
  "eventType" : "rating",
  "userID" : 6
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Adds a comment to a post
 *
 * body Comment The comment to add
 * postID Long ID of the post
 * returns Post
 **/
exports.comment = function(_, _) {
  return new Promise(function(resolve, _) {
    var examples = {};
    examples['application/json'] = {
  "postComments" : [ {
    "authorID" : 2,
    "content" : "content"
  } ],
  "eventID" : 5,
  "postReactions" : [ {
    "authorID" : 5,
    "value" : "laugh"
  } ],
  "postID" : 1,
  "eventType" : "rating",
  "userID" : 6
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Delete a post
 *
 * postID Long 
 * returns OperationResponse
 **/
exports.deleteUserPost = function(_) {
  return new Promise(function(resolve, _) {
    var examples = {};
    examples['application/json'] = {
  "code" : 200,
  "message" : "Successfully completed API operation"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Gets a post by ID
 *
 * postID Long ID of the post
 * no response value expected for this operation
 **/
exports.getPost = function(postID) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get user's feed
 *
 * userID Long User's identification number in system.
 * returns Feed
 **/
exports.getUserFeed = function(userID) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "lastUpdated" : 0,
  "posts" : [ {
    "postComments" : [ {
      "authorID" : 2,
      "content" : "content"
    } ],
    "eventID" : 5,
    "postReactions" : [ {
      "authorID" : 5,
      "value" : "laugh"
    } ],
    "postID" : 1,
    "eventType" : "rating",
    "userID" : 6
  }, {
    "postComments" : [ {
      "authorID" : 2,
      "content" : "content"
    } ],
    "eventID" : 5,
    "postReactions" : [ {
      "authorID" : 5,
      "value" : "laugh"
    } ],
    "postID" : 1,
    "eventType" : "rating",
    "userID" : 6
  } ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Gets a user's posts
 *
 * userID Long ID of the user
 * returns List
 **/
exports.getUserPosts = function(userID) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "postComments" : [ {
    "authorID" : 2,
    "content" : "content"
  } ],
  "eventID" : 5,
  "postReactions" : [ {
    "authorID" : 5,
    "value" : "laugh"
  } ],
  "postID" : 1,
  "eventType" : "rating",
  "userID" : 6
}, {
  "postComments" : [ {
    "authorID" : 2,
    "content" : "content"
  } ],
  "eventID" : 5,
  "postReactions" : [ {
    "authorID" : 5,
    "value" : "laugh"
  } ],
  "postID" : 1,
  "eventType" : "rating",
  "userID" : 6
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Adds a reaction to a post
 *
 * body Reaction The reaction to add
 * postID Long ID of the post
 * returns Post
 **/
exports.react = function(body,postID) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "postComments" : [ {
    "authorID" : 2,
    "content" : "content"
  } ],
  "eventID" : 5,
  "postReactions" : [ {
    "authorID" : 5,
    "value" : "laugh"
  } ],
  "postID" : 1,
  "eventType" : "rating",
  "userID" : 6
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

