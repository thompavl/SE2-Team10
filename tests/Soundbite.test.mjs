import test from 'ava';
import http from 'node:http';
import got from 'got';
import app from '../index.js';

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
GET user/{userID}/soundbite
*********************************
 */

// JSON response for GET /soundbite

let getSoundbiteJson = [
  {
    "song": {
      "duration": 0,
      "name": "To agalma",
      "entity-id": "moneypinkfloyd102562"
    },
    "tEnd": 9,
    "tStart": 9,
    "soundBiteID": 10,
    "userID": 198772
  },
  {
    "song": {
      "duration": 0,
      "name": "To agalma",
      "entity-id": "moneypinkfloyd102562"
    },
    "tEnd": 9,
    "tStart": 9,
    "soundBiteID": 10,
    "userID": 198772
  },
];

test('GET /soundbite - unauthorized', async (t) => {
    // Missing authorization API key
      const { body, statusCode } = await t.context.got("user/198772/soundbite", {
        searchParams: { soundbiteID: 10 },
        throwHttpErrors: false
    });
      t.is(statusCode, 401);
      t.is(body.message, '\'X-Wavelength-Api-Key\' header required');
    });
    
    test('GET /soundbite - resource not found - invalid shareID', async (t) => {
      // Passing authorization by including valid API key
      const { body, statusCode } = await t.context.got("user/198772/soundbite", { 
        searchParams: { soundbiteID: 404 }, // Changed soundbiteID to non-existent
        headers: { 'X-Wavelength-Api-Key': '12345' },
        throwHttpErrors: false
      });
      t.is(statusCode, 404);
      t.is(body.message, "Your requested resource is nowhere to be found! Perhaps try searching something else?");
    });

    test('GET /soundbite - resource not found - invalid userID', async (t) => {
      // Passing authorization by including valid API key
      const { body, statusCode } = await t.context.got("user/404/soundbite", {    // Changed userID to non-existent
        searchParams: { soundbiteID: 10 },
        headers: { 'X-Wavelength-Api-Key': '12345' },
        throwHttpErrors: false
      });
      t.is(statusCode, 404);
      t.is(body.message, "Your requested resource is nowhere to be found! Perhaps try searching something else?");
    });

  // Test for successful GET /soundbite
  test('GET /soundbite - success', async (t) => {
    const { body, statusCode } = await t.context.got("user/198772/soundbite", {
      searchParams: { soundbiteID: 10 },
      headers: { 'X-Wavelength-Api-Key': '12345' },
      throwHttpErrors: false
    });

    t.is(statusCode, 200);
    t.true(Array.isArray(body));
    t.deepEqual(body, getSoundbiteJson);
  });

    /* 
*********************************
POST user/{userID}/soundbite
*********************************
 */

// JSON request for POST /soundbite

let postSoundbiteJson = {
    song: {
      duration: 0,
      'entity-id': 'moneypinkfloyd102562',
      name: 'To agalma',
    },
    soundBiteID: 10,
    tEnd: 9,
    tStart: 9,
    userID: 198772,
    };

test('POST /soundbite - unauthorized', async (t) => {
  // Missing authorization API key
  const { body, statusCode } = await t.context.got.post("user/198772/soundbite", {
    json: postSoundbiteJson,
    throwHttpErrors: false
  });
  t.is(statusCode, 401);
  t.is(body.message, '\'X-Wavelength-Api-Key\' header required');
});

// Test for successful POST /soundbite
test('POST /soundbite - success', async (t) => {
  const { body, statusCode } = await t.context.got.post("user/198772/soundbite", {
    json: postSoundbiteJson,
    headers: { 'X-Wavelength-Api-Key': '12345' },
    throwHttpErrors: false
  });

  t.is(statusCode, 200);
});