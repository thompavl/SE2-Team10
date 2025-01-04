// Unit tests for GET /user/{userID}/followers and GET /user/{userID}/following

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
GET user/{userID}/followers
*********************************
 */

// JSON response for GET /followers

let getFollowersJson = [
	0,
	0,
];

test('GET /followers - unauthorized', async (t) => {
	// Missing authorization API key
	  const { body, statusCode } = await t.context.got("user/198772/followers", {
	  throwHttpErrors: false
	});
	  t.is(statusCode, 401);
	  t.is(body.message, '\'X-Wavelength-Api-Key\' header required');
	});

	// Test for invalid request (400 Bad Request)
test('GET /followers - invalid request', async (t) => {
    const { body, statusCode } = await t.context.got("user/198772/followers", {
        searchParams: { invalid: 'parameter' }, // Invalid query parameter
        headers: { 'X-Wavelength-Api-Key': '12345' },
        throwHttpErrors: false
    });
    t.is(statusCode, 400);
});

  // Test for successful GET /followers
  test('GET /share - success', async (t) => {
    const { body, statusCode } = await t.context.got("user/198772/followers", {
      headers: { 'X-Wavelength-Api-Key': '12345' },
      throwHttpErrors: false
    });

    t.is(statusCode, 200);
    t.true(Array.isArray(body));
    t.deepEqual(body, getFollowersJson);
  });

  /* 
*********************************
GET user/{userID}/following
*********************************
 */

// JSON response for GET /following

let getFollowingJson = [
	0,
	0,
];

test('GET /following - unauthorized', async (t) => {
	// Missing authorization API key
	  const { body, statusCode } = await t.context.got("user/198772/following", {
	  throwHttpErrors: false
	});
	  t.is(statusCode, 401);
	  t.is(body.message, '\'X-Wavelength-Api-Key\' header required');
	});

	// Test for invalid request (400 Bad Request)
test('GET /following - invalid request', async (t) => {
	const { body, statusCode } = await t.context.got("user/198772/following", {
		searchParams: { invalid: 'parameter' }, // Invalid query parameter
		headers: { 'X-Wavelength-Api-Key': '12345' },
		throwHttpErrors: false
	});
	t.is(statusCode, 400);
});

// Test for successful GET /following
test('GET /following - success', async (t) => {
	const { body, statusCode } = await t.context.got("user/198772/following", {
		headers: { 'X-Wavelength-Api-Key': '12345' },
		throwHttpErrors: false
	});

	t.is(statusCode, 200);
	t.true(Array.isArray(body));
	t.deepEqual(body, getFollowingJson);
});
