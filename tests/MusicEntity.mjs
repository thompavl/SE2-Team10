import http from "node:http";
import test from "ava";
import got from "got";

import { serverPort, app } from "../index.js";
// Set up the server before tests
test.before(async (t) => {
  t.context.server = http.createServer(app);
  // Start the server on a random port
  const server = t.context.server.listen();
  const { port } = server.address();
  t.context.got = got.extend({
    responseType: "json",
    prefixUrl: `http://localhost:${port}/api/v1`,
  });
});
// Ensure the server is closed after tests
test.after.always((t) => {
  t.context.server.close();
});

// Testing GET /music-entity/{id} for authorized access
test("GET music-entity/id 200", async (t) => {
  const { body, statusCode } = await t.context.got("music-entity/1", {
    headers: {
      "X-Wavelength-Api-Key": "1111", // Valid API key 
    },
  });
  t.is(statusCode, 200); // Expect the status code to be 200
});

// Testing GET /music-entity/{id} for unauthorized access
test("GET music-entity/id 401", async (t) => {
  try {
    await t.context.got("music-entity/1", {}); // No API key
  } catch (error) {
    var statusCode = error.response.statusCode;
  }
  t.is(statusCode, 401); // Expect the status code to be 401
});

// Testing GET /music-entity/{id} for non-existing music entity
test("GET music-entity/id 404", async (t) => {
  try {
    await t.context.got("music-entity/404", { // Non-existing music entity
      headers: {
        "X-Wavelength-Api-Key": "1111",
      },
    });
  } catch (error) {
    var statusCode = error.response.statusCode;
  }
  t.is(statusCode, 404); // Expect the status code to be 404
});
