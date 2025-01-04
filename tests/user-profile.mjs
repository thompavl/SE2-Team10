import http from "http";
import test from "ava";
import got from "got";

import { serverPort, app } from "../index.js";
// Start the server and create a context with a got instance
test.before(async (t) => {
  t.context.server = http.createServer(app);
  // Start the server on a random port
  const server = t.context.server.listen();
  t.context.got_authorized = got.extend({
    responseType: "json",
    prefixUrl: `http://localhost:${serverPort}/api/v1`,
    headers: { "X-Wavelength-Api-Key": "test" },
  });
  t.context.got_unauthorized = got.extend({
    responseType: "json",
    prefixUrl: `http://localhost:${serverPort}/api/v1`,
  });
});
//  Close the server after the tests
test.after.always((t) => {
  t.context.server.close();
});

// GET /user/{userID} tests
test("GET /user returns correct response", async (t) => {
  // Expected response body
  let expectedResponse = {
    about_me: "I love rock'n roll so put another dime in the jukebox",
    id: 0,
    profile_picture: "",
    service_token_pairs: "service_token_pairs",
  };
  const { body, statusCode } = await t.context.got_authorized("user", {
    searchParams: { userID: 100 },
  });
  t.is(statusCode, 200); // Expect the status code to be 200
  t.deepEqual(body, expectedResponse);
});
// Test for GET /user with 404
test("GET /user returns correct response on 404", async (t) => {
  // Expected response body
  let expectedResponse = {
    message:
      "Your requested resource is nowhere to be found! Perhaps try searching something else?",
    code: 404,
  };
  const { body, statusCode } = await t.context.got_authorized("user", {
    searchParams: { userID: 404 },
    throwHttpErrors: false,
  });
  t.is(statusCode, 404); // Expect the status code to be 404
  t.deepEqual(body, expectedResponse);
});
// Test for unauthorized access to GET /user
test("GET /user returns correct response on 401", async (t) => {
  const { body, statusCode } = await t.context.got_unauthorized("user", {
    searchParams: { userID: 4045454 },
    throwHttpErrors: false,
  });
  t.is(statusCode, 401);
});

// POST /user/{userID} tests
// Test for POST /user with 200
test("PUT /user returns correct response", async (t) => {
  // Example request body
  let requestBody = {
    about_me: "I love rock'n roll so put another dime in the jukebox",
    id: 0,
    profile_picture: "",
    service_token_pairs: "service_token_pairs",
  };
  const { body, statusCode } = await t.context.got_authorized.put("user", {
    searchParams: { userID: 100 },
    json: { requestBody },
  });
  t.is(statusCode, 200);
  t.deepEqual(body, requestBody);
});
// Test for PUT /user with 404
test("PUT /user returns correct response on 404", async (t) => {
  // Example request body
  let requestBody = {
    profile_picture: "",
    id: 0,
    about_me: "I love rock'n roll so put another dime in the jukebox",
    service_token_pairs: "service_token_pairs",
  };
  // Expected response body
  let expectedResponse = {
    message:
      "Your requested resource is nowhere to be found! Perhaps try searching something else?",
    code: 404,
  };
  const { body, statusCode } = await t.context.got_authorized.put("user", {
    searchParams: { userID: 404 }, // Non-existing user
    json: { requestBody },
    throwHttpErrors: false,
  });
  t.is(statusCode, 404); // Expect the status code to be 404
  t.deepEqual(body, expectedResponse);
});
// Test for unauthorized access to PUT /user
test("PUT /user returns correct response on 401", async (t) => {
  // Example request body
  let requestBody = {
    profile_picture: "",
    id: 0,
    about_me: "I love rock'n roll so put another dime in the jukebox",
    service_token_pairs: "service_token_pairs",
  };
  const { body, statusCode } = await t.context.got_unauthorized.put("user", {
    searchParams: { userID: 4045454 }, 
    json: { requestBody },
    throwHttpErrors: false,
  });
  t.is(statusCode, 401);
});

// DELETE /user/{userID} tests
// Test for DELETE /user with 200
test("DELETE /user returns correct response", async (t) => {
  // Example request body
  let requestBody = {
    code: 200,
    message: "Successfully completed API operation",
  };
  const { body, statusCode } = await t.context.got_authorized.delete("user", {
    searchParams: { userID: 100 }, // Existing user
    json: { requestBody },
  });
  t.is(statusCode, 200); // Expect the status code to be 200
  t.deepEqual(body, requestBody);
});

// Test for DELETE /user with 404
test("DELETE /user returns correct response on 404", async (t) => {
  let expectedResponse = {
    message:
      "Your requested resource is nowhere to be found! Perhaps try searching something else?",
    code: 404,
  };
  const { body, statusCode } = await t.context.got_authorized.delete("user", {
    searchParams: { userID: 404 }, // Non-existing user
    throwHttpErrors: false,
  });
  t.is(statusCode, 404); // Expect the status code to be 404
  t.deepEqual(body, expectedResponse);
});
// Test for unauthorized access to DELETE /user
test("DELETE /user returns correct response on 401", async (t) => {
  const { body, statusCode } = await t.context.got_unauthorized.delete("user", {
    searchParams: { userID: 4045454 },
    throwHttpErrors: false,
  });
  t.is(statusCode, 401); // Expect the status code to be 401
});
