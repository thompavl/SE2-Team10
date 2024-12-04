import test from 'ava';
import http from 'node:http';
import got from 'got';
import {serverPort,app} from "../index.js";

// Start the server and create a context with a got instance
test.before(async (t) => {
	t.context.server = http.createServer(app);
    const server = t.context.server.listen();
    const { port } = server.address();
	t.context.got = got.extend({ responseType: "json", prefixUrl: `http://localhost:${port}/api/v1` });

});

test.after.always((t) => {
	t.context.server.close();
});


/* 
*********************************
GET user/{userID}/share
*********************************
 */

// JSON response for GET /share
let getShareJson = [
  {
    "shareID": 10,
    "text": "I really liked this one",
    "userID": 198772,
    "musicEntity": {
      "albums": [
        {
          "date": "mm/dd/yy hh:mm:ss",
          "image": "",
          "songs-ids": [
            null
          ],
          "artists-ids": [
            null
          ],
          "name": "The Wall",
          "genre": "rap"
        }
      ],
      "artists": [
        {
          "image": "",
          "albums": [
            null
          ],
          "name": "Pink Floyd"
        }
      ],
      "songs": [
        {
          "duration": 0,
          "name": "To agalma",
          "entity-id": "moneypinkfloyd102562"
        }
      ],
      "playlists": [
        {
          "songs": [
            null
          ],
          "name": "My awesome playlist",
          "creator-id": 6
        }
      ]
    }
  },
  {
    "shareID": 10,
    "text": "I really liked this one",
    "userID": 198772,
    "musicEntity": {
      "albums": [
        {
          "date": "mm/dd/yy hh:mm:ss",
          "image": "",
          "songs-ids": [
            null
          ],
          "artists-ids": [
            null
          ],
          "name": "The Wall",
          "genre": "rap"
        }
      ],
      "artists": [
        {
          "image": "",
          "albums": [
            null
          ],
          "name": "Pink Floyd"
        }
      ],
      "songs": [
        {
          "duration": 0,
          "name": "To agalma",
          "entity-id": "moneypinkfloyd102562"
        }
      ],
      "playlists": [
        {
          "songs": [
            null
          ],
          "name": "My awesome playlist",
          "creator-id": 6
        }
      ]
    }
  }
];

test('GET /share - unauthorized', async (t) => {
// Missing authorization API key
  const { body, statusCode } = await t.context.got("user/198772/share", {
    searchParams: { shareID: 10 },
    throwHttpErrors: false
});
  t.is(statusCode, 401);
  t.is(body.message, '\'X-Wavelength-Api-Key\' header required');
});

  test('GET /share - resource not found - invalid shareID', async (t) => {
    // Passing authorization by including valid API key
    const { body, statusCode } = await t.context.got("user/198772/share", { 
      searchParams: { shareID: 404 }, // Changed shareID to non-existent
      headers: { 'X-Wavelength-Api-Key': '12345' },
      throwHttpErrors: false
    });
  
    t.is(statusCode, 404);
    t.is(body.message, "Your requested resource is nowhere to be found! Perhaps try searching something else?");
  });

  test('GET /share - resource not found - invalid userID', async (t) => {
    // Passing authorization by including valid API key
    const { body, statusCode } = await t.context.got("user/404/share", {    // Changed userID to non-existent
      searchParams: { shareID: 10 },
      headers: { 'X-Wavelength-Api-Key': '12345' },
      throwHttpErrors: false
    });
  
    t.is(statusCode, 404);
    t.is(body.message, "Your requested resource is nowhere to be found! Perhaps try searching something else?");
  });

  // Test for successful GET /share
  test('GET /share - success', async (t) => {
    const { body, statusCode } = await t.context.got("user/198772/share", {
      searchParams: { shareID: 10 },
      headers: { 'X-Wavelength-Api-Key': '12345' },
      throwHttpErrors: false
    });

    t.is(statusCode, 200);
    t.true(Array.isArray(body));
    t.deepEqual(body, getShareJson);
  });


/* 
*********************************
POST user/{userID}/share
*********************************
 */

// JSON request for POST /share
let postShareJson = [{
    shareID: 10,
    userID: 198772,
    text: "I really liked this one",
    musicEntity: {
        songs: [{ 
            entityId: "moneypinkfloyd102562" 
        }],
        albums: [{ 
            entityId: "moneypinkfloyd102562" 
        }],
        playlists: [{
            name: "My awesome playlist",
            songs: ["moneypinkfloyd102562"],
            entityId: "moneypinkfloyd102562",
            creatorId: 6,
            date: "2024-11-27T00:00:00Z"
        }],
        artists: [{
            name: "Pink Floyd",
            image: "",
            albums: ["moneypinkfloyd102562"],
            entityId: "moneypinkfloyd102562"
        }]
    }
}];

test('POST /share - unauthorized', async (t) => {
    // Missing authorization API key
    const { body, statusCode } = await t.context.got.post("user/198772/share", {
        json: postShareJson,
        throwHttpErrors: false
    });

    t.is(statusCode, 401);
    t.is(body.message, '\'X-Wavelength-Api-Key\' header required');
});

test('POST /share - missing required fields', async (t) => {
    // Malformed JSON request
    const { body, statusCode } = await t.context.got.post("user/198772/share", {
        json: { shareID: 10,
                userID: 198772,
                text: "I really liked this one"
            },
        headers: { 'X-Wavelength-Api-Key': '12345' },
        throwHttpErrors: false
    });

    t.is(statusCode, 400);
    t.is(body.message, 'request.body should be array');
});

// Test for successful POST /share
test('POST /share - success', async (t) => {
    const { body, statusCode } = await t.context.got.post("user/198772/share", {
        json: postShareJson,
        headers: { 'X-Wavelength-Api-Key': '12345' },
        throwHttpErrors: false
    });
    t.is(statusCode, 200);
});
