'use strict';


/**
 * Get a list of music entities based on search parameters
 *
 * keywords List 
 * name String  (optional)
 * date Date  (optional)
 * type String  (optional)
 * returns MusicEntityPack
 **/
exports.getMusicEntities = function(keywords,name,date,type) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
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
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get a specific music entity by ID. Return pack's arrays contain only one item.
 *
 * id Long 
 * returns inline_response_200
 **/
exports.getMusicEntitybyId = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "entity-pack" : {
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
  "return-type" : "song"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}
