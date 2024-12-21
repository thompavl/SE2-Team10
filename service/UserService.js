'use strict';


/**
 * Add a new follower for a user
 *
 * userID Long ID of the user
 * followerID Long The ID of the follower
 * returns OperationResponse
 **/
exports.addUserFollower = function(userID,followerID) {
  return new Promise(function(resolve, reject) {
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
 * Complete authentication using the aquired authentication token
 *
 * body Externallink_platform_body 
 * userID Long ID of the user's Wavelength account
 * platform String Specific platform chosen
 * returns inline_response_200_1
 **/
exports.completeAuthentication = function(body,userID,platform) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "message" : "Linking was successful"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Delete user
 *
 * userID Long 
 * returns OperationResponse
 **/
exports.deleteProfile = function(userID) {
  return new Promise(function(resolve, reject) {
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
 * Get recommended users for the specific user
 *
 * userID Long User's identification number in system.
 * returns UserIDs
 **/
exports.getRecommended = function(userID) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ 0, 0 ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Returns the followers of a user
 *
 * userID Long ID of the user
 * returns UserIDs
 **/
exports.getUserFollowers = function(userID) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ 0, 0 ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Returns the followings of a user
 *
 * userID Long ID of the user
 * returns UserIDs
 **/
exports.getUserFollowing = function(userID) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ 0, 0 ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update user
 *
 * body User  (optional)
 * userID Long ID of user
 * returns User
 **/
exports.updateProfile = function(body,userID) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "profile_picture" : "",
  "id" : 0,
  "about_me" : "I love rock'n roll so put another dime in the jukebox",
  "service_token_pairs" : "service_token_pairs"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Retrieve the users creations from the specific platform
 *
 * userID Long ID of the user's Wavelength account
 * platform String Specific platform chosen
 * returns Song
 **/
exports.userUserIDExternal_creationsPlatformGET = function(userID,platform) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "duration" : 0,
  "name" : "To agalma",
  "entity-id" : "moneypinkfloyd102562"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get user profile
 * This can only be done by the logged in user.
 *
 * userID Long userID for whom the profile should be returned
 * returns User
 **/
exports.viewProfile = function(userID) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "profile_picture" : "",
  "id" : 0,
  "about_me" : "I love rock'n roll so put another dime in the jukebox",
  "service_token_pairs" : "service_token_pairs"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

