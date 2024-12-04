import http from "node:http";
import test from "ava";
import got from "got";

import app from "../index.js";

test.before(async (t) => {
  t.context.server = http.createServer(app);
  const server = t.context.server.listen();
  const { port } = server.address();
  t.context.got = got.extend({
    responseType: "json",
    prefixUrl: `http://localhost:${port}/api/v1`,
  });
});

test.after.always((t) => {
  t.context.server.close();
});

// Testing for GET / user / {userID} / rating

test("GET /user/id/rating 401", async (t) => {
  try {
    await t.context.got("user/1/rating", {
      searchParams: { userID: 1 },
    });
  } catch (error) {
    var statusCode = error.response.statusCode;
  }
  t.is(statusCode, 401);
});

test("GET /user/id/rating 200", async (t) => {
  const { body, statusCode } = await t.context.got("user/1/rating", {
    headers: {
      "X-Wavelength-Api-Key": "1111",
    },
  });
  t.is(statusCode, 200);
});

test("GET /user/404/rating 404", async (t) => {
  try {
    await t.context.got("user/404/rating", {
      headers: {
        searchParams: { userID: 404 },
        "X-Wavelength-Api-Key": "1111",
      },
    });
  } catch (error) {
    var statusCode = error.response.statusCode;
  }
  t.is(statusCode, 404);
});

// Testing for POST / user / {userID} / rating

test("POST /user/1/rating 401", async (t) => {
  try {
    await t.context.got.post("user/1/rating", {
      searchParams: { userID: 1 },
    });
  } catch (error) {
    var statusCode = error.response.statusCode;
  }
  t.is(statusCode, 401);
});

test("POST /user/id/rating 200", async (t) => {
  const { body, statusCode } = await t.context.got.post("post/1/rating", {
    json: { userID: 1, ratingID: 10, value: "10" },
    headers: {
      "X-Wavelength-Api-Key": "1111",
    },
  });
  t.is(statusCode, 200);
});
