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

// Testing for GET / music-entity / {id}

test("GET music-entity/id 200", async (t) => {
  const { body, statusCode } = await t.context.got("music-entity/1", {
    searchParams: { "entity-id": 1 },
    headers: {
      "X-Wavelength-Api-Key": "1111",
    },
  });
  t.is(statusCode, 200);
});
test("GET music-entity/id 401", async (t) => {
  try {
    await t.context.got("feed/1", {
      searchParams: { "entity-id": 1 },
    });
  } catch (error) {
    var statusCode = error.response.statusCode;
  }
  t.is(statusCode, 401);
});
test("GET music-entity/id 404", async (t) => {
  try {
    await t.context.got("feed/404", {
      searchParams: { "entity-id": 404 },
      headers: {
        "X-Wavelength-Api-Key": "123",
      },
    });
  } catch (error) {
    var statusCode = error.response.statusCode;
  }
  t.is(statusCode, 404);
});
