'use strict';


/**
 * Returns a collection of matching imports
 * This (GET) endpoint returns an array of imports. By default this returns a number of imports that belong to user (userID), from newest to oldest. If the optional parameter, importID, is also supplied then this list gets filtered bassed on that parameter resulting in an empty list in the case of no match, or to a single-entry array containing the import that matches importID.
 *
 * userID String The userID, whose import we want to access
 * importID String The importID (optional)
 * returns List
 **/
exports.getImport = function(userID,importID) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "importID" : 10,
  "text" : "Enjoy my newest album",
  "userID" : 198772,
  "platform" : "spotify",
  "creation" : {
    "duration" : 300,
    "image" : "",
    "music-entity-pack" : {
      "albums" : [ {
        "date" : "mm/dd/yy hh:mm:ss",
        "image" : "",
        "songs-ids" : [ null, null ],
        "artists-ids" : [ null, null ],
        "name" : "The Wall",
        "genre" : "rap"
      }, {
        "date" : "mm/dd/yy hh:mm:ss",
        "image" : "",
        "songs-ids" : [ null, null ],
        "artists-ids" : [ null, null ],
        "name" : "The Wall",
        "genre" : "rap"
      } ],
      "artists" : [ {
        "image" : "",
        "albums" : [ null, null ],
        "name" : "Pink Floyd"
      }, {
        "image" : "",
        "albums" : [ null, null ],
        "name" : "Pink Floyd"
      } ],
      "songs" : [ {
        "duration" : 0,
        "name" : "To agalma",
        "entity-id" : "moneypinkfloyd102562"
      }, {
        "duration" : 0,
        "name" : "To agalma",
        "entity-id" : "moneypinkfloyd102562"
      } ],
      "playlists" : [ {
        "songs" : [ null, null ],
        "name" : "My awesome playlist",
        "creator-id" : 6
      }, {
        "songs" : [ null, null ],
        "name" : "My awesome playlist",
        "creator-id" : 6
      } ]
    },
    "name" : 198772,
    "genre" : "rap",
    "id" : 10
  }
}, {
  "importID" : 10,
  "text" : "Enjoy my newest album",
  "userID" : 198772,
  "platform" : "spotify",
  "creation" : {
    "duration" : 300,
    "image" : "",
    "music-entity-pack" : {
      "albums" : [ {
        "date" : "mm/dd/yy hh:mm:ss",
        "image" : "",
        "songs-ids" : [ null, null ],
        "artists-ids" : [ null, null ],
        "name" : "The Wall",
        "genre" : "rap"
      }, {
        "date" : "mm/dd/yy hh:mm:ss",
        "image" : "",
        "songs-ids" : [ null, null ],
        "artists-ids" : [ null, null ],
        "name" : "The Wall",
        "genre" : "rap"
      } ],
      "artists" : [ {
        "image" : "",
        "albums" : [ null, null ],
        "name" : "Pink Floyd"
      }, {
        "image" : "",
        "albums" : [ null, null ],
        "name" : "Pink Floyd"
      } ],
      "songs" : [ {
        "duration" : 0,
        "name" : "To agalma",
        "entity-id" : "moneypinkfloyd102562"
      }, {
        "duration" : 0,
        "name" : "To agalma",
        "entity-id" : "moneypinkfloyd102562"
      } ],
      "playlists" : [ {
        "songs" : [ null, null ],
        "name" : "My awesome playlist",
        "creator-id" : 6
      }, {
        "songs" : [ null, null ],
        "name" : "My awesome playlist",
        "creator-id" : 6
      } ]
    },
    "name" : 198772,
    "genre" : "rap",
    "id" : 10
  }
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Returns a collection of matching ratings
 * This (GET) endpoint returns an array of ratings. By default this returns a number of ratings that belong to user (userID), from newest to oldest. If the optional parameter, ratingID, is also supplied then this list gets filtered bassed on that parameter resulting in an empty list in the case of no match, or to a single-entry array containing the rating that matches ratingID.
 *
 * userID String The userID, whose rating we want to access
 * ratingID String The ratingID (optional)
 * returns List
 **/
exports.getRating = function(userID,ratingID) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "ratingId" : 10,
  "rating" : 9,
  "text" : "I really liked this one",
  "userID" : 198772,
  "musicEntity" : {
    "albums" : [ {
      "date" : "mm/dd/yy hh:mm:ss",
      "image" : "",
      "songs-ids" : [ null, null ],
      "artists-ids" : [ null, null ],
      "name" : "The Wall",
      "genre" : "rap"
    }, {
      "date" : "mm/dd/yy hh:mm:ss",
      "image" : "",
      "songs-ids" : [ null, null ],
      "artists-ids" : [ null, null ],
      "name" : "The Wall",
      "genre" : "rap"
    } ],
    "artists" : [ {
      "image" : "",
      "albums" : [ null, null ],
      "name" : "Pink Floyd"
    }, {
      "image" : "",
      "albums" : [ null, null ],
      "name" : "Pink Floyd"
    } ],
    "songs" : [ {
      "duration" : 0,
      "name" : "To agalma",
      "entity-id" : "moneypinkfloyd102562"
    }, {
      "duration" : 0,
      "name" : "To agalma",
      "entity-id" : "moneypinkfloyd102562"
    } ],
    "playlists" : [ {
      "songs" : [ null, null ],
      "name" : "My awesome playlist",
      "creator-id" : 6
    }, {
      "songs" : [ null, null ],
      "name" : "My awesome playlist",
      "creator-id" : 6
    } ]
  }
}, {
  "ratingId" : 10,
  "rating" : 9,
  "text" : "I really liked this one",
  "userID" : 198772,
  "musicEntity" : {
    "albums" : [ {
      "date" : "mm/dd/yy hh:mm:ss",
      "image" : "",
      "songs-ids" : [ null, null ],
      "artists-ids" : [ null, null ],
      "name" : "The Wall",
      "genre" : "rap"
    }, {
      "date" : "mm/dd/yy hh:mm:ss",
      "image" : "",
      "songs-ids" : [ null, null ],
      "artists-ids" : [ null, null ],
      "name" : "The Wall",
      "genre" : "rap"
    } ],
    "artists" : [ {
      "image" : "",
      "albums" : [ null, null ],
      "name" : "Pink Floyd"
    }, {
      "image" : "",
      "albums" : [ null, null ],
      "name" : "Pink Floyd"
    } ],
    "songs" : [ {
      "duration" : 0,
      "name" : "To agalma",
      "entity-id" : "moneypinkfloyd102562"
    }, {
      "duration" : 0,
      "name" : "To agalma",
      "entity-id" : "moneypinkfloyd102562"
    } ],
    "playlists" : [ {
      "songs" : [ null, null ],
      "name" : "My awesome playlist",
      "creator-id" : 6
    }, {
      "songs" : [ null, null ],
      "name" : "My awesome playlist",
      "creator-id" : 6
    } ]
  }
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Returns a collection of matching shares
 * This (GET) endpoint returns an array of shares. By default this returns a number of shares that belong to user (userID), from newest to oldest. If the optional parameter, shareID, is also supplied then this list gets filtered bassed on that parameter resulting in an empty list in the case of no match, or to a single-entry array containing the share that matches shareID.
 *
 * userID String The userID, whose rating we want to access
 * shareID String The shareID (optional)
 * returns List
 **/
exports.getShare = function(userID,shareID) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "shareID" : 10,
  "text" : "I really liked this one",
  "userID" : 198772,
  "musicEntity" : {
    "albums" : [ {
      "date" : "mm/dd/yy hh:mm:ss",
      "image" : "",
      "songs-ids" : [ null, null ],
      "artists-ids" : [ null, null ],
      "name" : "The Wall",
      "genre" : "rap"
    }, {
      "date" : "mm/dd/yy hh:mm:ss",
      "image" : "",
      "songs-ids" : [ null, null ],
      "artists-ids" : [ null, null ],
      "name" : "The Wall",
      "genre" : "rap"
    } ],
    "artists" : [ {
      "image" : "",
      "albums" : [ null, null ],
      "name" : "Pink Floyd"
    }, {
      "image" : "",
      "albums" : [ null, null ],
      "name" : "Pink Floyd"
    } ],
    "songs" : [ {
      "duration" : 0,
      "name" : "To agalma",
      "entity-id" : "moneypinkfloyd102562"
    }, {
      "duration" : 0,
      "name" : "To agalma",
      "entity-id" : "moneypinkfloyd102562"
    } ],
    "playlists" : [ {
      "songs" : [ null, null ],
      "name" : "My awesome playlist",
      "creator-id" : 6
    }, {
      "songs" : [ null, null ],
      "name" : "My awesome playlist",
      "creator-id" : 6
    } ]
  }
}, {
  "shareID" : 10,
  "text" : "I really liked this one",
  "userID" : 198772,
  "musicEntity" : {
    "albums" : [ {
      "date" : "mm/dd/yy hh:mm:ss",
      "image" : "",
      "songs-ids" : [ null, null ],
      "artists-ids" : [ null, null ],
      "name" : "The Wall",
      "genre" : "rap"
    }, {
      "date" : "mm/dd/yy hh:mm:ss",
      "image" : "",
      "songs-ids" : [ null, null ],
      "artists-ids" : [ null, null ],
      "name" : "The Wall",
      "genre" : "rap"
    } ],
    "artists" : [ {
      "image" : "",
      "albums" : [ null, null ],
      "name" : "Pink Floyd"
    }, {
      "image" : "",
      "albums" : [ null, null ],
      "name" : "Pink Floyd"
    } ],
    "songs" : [ {
      "duration" : 0,
      "name" : "To agalma",
      "entity-id" : "moneypinkfloyd102562"
    }, {
      "duration" : 0,
      "name" : "To agalma",
      "entity-id" : "moneypinkfloyd102562"
    } ],
    "playlists" : [ {
      "songs" : [ null, null ],
      "name" : "My awesome playlist",
      "creator-id" : 6
    }, {
      "songs" : [ null, null ],
      "name" : "My awesome playlist",
      "creator-id" : 6
    } ]
  }
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Returns a collection of matching soundbites
 * This (GET) endpoint returns an array of soundbites. By default this returns a number of soundbites that belong to user (userID), from newest to oldest. If the optional parameter, soundbiteID, is also supplied then this list gets filtered bassed on that parameter resulting in an empty list in the case of no match, or to a single-entry array containing the soundbite that matches soundbiteID.
 *
 * userID String The userID, whose soundbite we want to access
 * soundbiteID String The soundbiteID (optional)
 * returns List
 **/
exports.getSoundbite = function(userID,soundbiteID) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "song" : {
    "duration" : 0,
    "name" : "To agalma",
    "entity-id" : "moneypinkfloyd102562"
  },
  "tEnd" : 9,
  "tStart" : 9,
  "soundBiteID" : 10,
  "userID" : 198772
}, {
  "song" : {
    "duration" : 0,
    "name" : "To agalma",
    "entity-id" : "moneypinkfloyd102562"
  },
  "tEnd" : 9,
  "tStart" : 9,
  "soundBiteID" : 10,
  "userID" : 198772
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Creates a import
 * This can only be done by the logged in user.
 *
 * body Import  (optional)
 * userID String The user name for login
 * no response value expected for this operation
 **/
exports.postImport = function(body,userID) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Creates a rating
 * This can only be done by the logged in user.
 *
 * body Rating  (optional)
 * userID String The user name for login
 * no response value expected for this operation
 **/
exports.postRating = function(body,userID) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Creates a share
 * This can only be done by the logged in user.
 *
 * body List  (optional)
 * userID String The user name for login
 * no response value expected for this operation
 **/
exports.postShare = function(body,userID) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Creates a soundbite
 * This can only be done by the logged in user.
 *
 * body Soundbite  (optional)
 * userID String The user name for login
 * no response value expected for this operation
 **/
exports.postSoundbite = function(body,userID) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

