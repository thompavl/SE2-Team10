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

// Testing GET /user/{userID}/rating for unauthorized access
test("GET /user/id/rating 401", async (t) => {
  try {
    await t.context.got("user/1/rating", {
      searchParams: { userID: 1 }, // Search for a user without an API
    });
  } catch (error) {
    var statusCode = error.response.statusCode;
  }
  t.is(statusCode, 401);
});
// Testing GET /user/{userID}/rating for authorized access
test("GET /user/id/rating 200", async (t) => {
  const { body, statusCode } = await t.context.got("user/1/rating", {
    headers: {
      "X-Wavelength-Api-Key": "1111", // Valid API key
    },
  });

  t.is(statusCode, 200);
});
// Testing GET /user/{userID}/rating for non-existing user
test("GET /user/404/rating 404", async (t) => {
  try {
    await t.context.got("user/404/rating", {
      headers: {
        searchParams: { userID: 404 }, // Search for a non-existing user
        "X-Wavelength-Api-Key": "1111", 
      },
    });
  } catch (error) {
    var statusCode = error.response.statusCode;
  }
  t.is(statusCode, 404); // Expect the status code to be 404  
});

// Testing POST /user/{userID}/rating for unauthorized access
test("POST /user/1/rating 401", async (t) => {
  try {
    await t.context.got.post("user/1/rating", {
      searchParams: { userID: 1 },  // Search for a user without an API
    });
  } catch (error) {
    var statusCode = error.response.statusCode;
  }
  t.is(statusCode, 401); // Expect the status code to be 401
});

// Sample rating payload for POST requests
let rating = {
  ratingId: 10,
  userID: 198772,
  musicEntity: {
    songs: [
      {
        name: "To agalma",
        duration: 0,
        "entity-id": "moneypinkfloyd102562",
        "album-id": "moneypinkfloyd102562",
      },
    ],
    albums: [
      {
        name: "The Wall",
        "entity-id": "moneypinkfloyd102562",
        genre: "rap",
        "songs-ids": ["moneypinkfloyd102562"],
        image: "string",
        date: "mm/dd/yy hh:mm:ss",
        "artists-ids": ["moneypinkfloyd102562"],
      },
    ],
    playlists: [
      {
        name: "My awesome playlist",
        songs: ["moneypinkfloyd102562"],
        "entity-id": "moneypinkfloyd102562",
        "creator-id": 0,
        date: "mm/dd/yy hh:mm:ss",
      },
    ],
    artists: [
      {
        name: "Pink Floyd",
        "entity-id": "moneypinkfloyd102562",
        albums: ["moneypinkfloyd102562"],
        image: "string",
      },
    ],
  },
  rating: 9,
  text: "I really liked this one",
};
// Testing POST /user/{userID}/rating for authorized access
test("POST /user/id/rating 200", async (t) => {
  const { body, statusCode } = await t.context.got.post("post", {
    json: rating,
    headers: {
      "X-Wavelength-Api-Key": "1111", // Valid API key
    },
  });
  t.is(statusCode, 200); // Ensure the status code is 200
});
