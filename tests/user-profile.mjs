import http from 'http';
import test from 'ava';
import got from 'got';

import {serverPort,app} from '../index.js';

test.before(async (t) => {
	t.context.server = http.createServer(app);
    const server = t.context.server.listen();
	t.context.got_authorized = got.extend({ responseType: 'json', prefixUrl: `http://localhost:${serverPort}/api/v1` , headers: {"X-Wavelength-Api-Key": "test"}});
	t.context.got_unauthorized = got.extend({ responseType: 'json', prefixUrl: `http://localhost:${serverPort}/api/v1` });
});

test.after.always((t) => {
	t.context.server.close();
});

test("GET /user returns correct response", async (t) => {
	let expectedResponse = {
		about_me: "I love rock'n roll so put another dime in the jukebox",
		id: 0,
		profile_picture: "",
		service_token_pairs: "service_token_pairs"
	};
	const { body, statusCode } = await t.context.got_authorized("user",{searchParams: {"userID": 100}});
	t.is(statusCode, 200);
	t.deepEqual(body,expectedResponse);
});

test("GET /user returns correct response on 404", async (t) => {
	let expectedResponse = {
		"message": "Your requested resource is nowhere to be found! Perhaps try searching something else?",
		"code": 404
	};
	const { body, statusCode } = await t.context.got_authorized("user",{searchParams: {"userID": 404}, throwHttpErrors: false});
	t.is(statusCode, 404);
	t.deepEqual(body,expectedResponse);
});

test("GET /user returns correct response on 401", async (t) => {
	const { body, statusCode } = await t.context.got_unauthorized("user",{searchParams: {"userID": 4045454}, throwHttpErrors: false});
	t.is(statusCode, 401);
});

test("PUT /user returns correct response", async (t) => {
	let requestBody = {
		about_me: "I love rock'n roll so put another dime in the jukebox",
		id: 0,
		profile_picture: "",
		service_token_pairs: "service_token_pairs"
	};
	const { body, statusCode } = await t.context.got_authorized.put("user",{searchParams: {"userID": 100}, json: {requestBody}});
	t.is(statusCode, 200);
	t.deepEqual(body,requestBody);
});

test("PUT /user returns correct response on 404", async (t) => {
	let requestBody = {
		"profile_picture": "",
		"id": 0,
		"about_me": "I love rock'n roll so put another dime in the jukebox",
		"service_token_pairs": "service_token_pairs"
	};
	let expectedResponse = {
		"message": "Your requested resource is nowhere to be found! Perhaps try searching something else?",
		"code": 404
	};
	const { body, statusCode } = await t.context.got_authorized.put("user",{searchParams: {"userID": 404}, json: {requestBody},throwHttpErrors: false});
	t.is(statusCode, 404);
	t.deepEqual(body,expectedResponse);
});

test("PUT /user returns correct response on 401", async (t) => {
	let requestBody = {
		"profile_picture": "",
		"id": 0,
		"about_me": "I love rock'n roll so put another dime in the jukebox",
		"service_token_pairs": "service_token_pairs"
	};
	const { body, statusCode } = await t.context.got_unauthorized.put("user",{searchParams: {"userID": 4045454}, json: {requestBody},throwHttpErrors: false});
	t.is(statusCode, 401);
});

test("DELETE /user returns correct response", async (t) => {
	let requestBody = {
		"code": 200,
		"message": "Successfully completed API operation"
	  };
	const { body, statusCode } = await t.context.got_authorized.delete("user",{searchParams: {"userID": 100}, json: {requestBody}});
	t.is(statusCode, 200);
	t.deepEqual(body,requestBody);
});

test("DELETE /user returns correct response on 404", async (t) => {
	let expectedResponse = {
		"message": "Your requested resource is nowhere to be found! Perhaps try searching something else?",
		"code": 404
	};
	const { body, statusCode } = await t.context.got_authorized.delete("user",{searchParams: {"userID": 404}, throwHttpErrors: false});
	t.is(statusCode, 404);
	t.deepEqual(body,expectedResponse);
});

test("DELETE /user returns correct response on 401", async (t) => {
	const { body, statusCode } = await t.context.got_unauthorized.delete("user",{searchParams: {"userID": 4045454}, throwHttpErrors: false});
	t.is(statusCode, 401);
});