import test from 'ava';
import * as utils from '../utils/writer.js';
import * as EventController from '../controllers/Event.js';


test.beforeEach(t => {
  t.context.res = {
    writeHead: (code, headers) => {
      t.context.res.code = code;
      t.context.res.headers = headers;
    },
    end: (payload) => {
      t.context.res.payload = payload;
    }
  };
  t.context.body = {
    shareID: 10,
    userID: 198772,
    musicEntity: {
      songs: [{ entityId: "moneypinkfloyd102562" }],
      albums: [{ entityId: "moneypinkfloyd102562" }],
      playlists: [{
        name: "My awesome playlist",
        songs: ["moneypinkfloyd102562"],
        entityId: "moneypinkfloyd102562",
        creatorId: 6,
        date: "2024-11-27T00:00:00Z"
      }],
      artists: [{
        name: "Pink Floyd",
        entityId: "moneypinkfloyd102562",
        albums: ["moneypinkfloyd102562"],
        image: ""
      }]
    },
    text: "I really liked this one"
  };
});

// Test for unauthorized (missing API key)
test('postShare - unauthorized', async t => {
  const req = { headers: {}, params: { userID: 12345 } }; 

  await EventController.postShare(req, t.context.res, t.context.next, t.context.body, req.params.userID);

  const responseBody = JSON.parse(t.context.res.payload);
  t.is(responseBody.message, "User is unauthorized, you need an API key to access this resource!");
  t.is(responseBody.code, 401);
  t.is(t.context.res.code, 401);
  t.is(t.context.res.headers['Content-Type'], 'application/json');
});

// Test for missing request body
test('postShare - missing request body', async t => {
  const req = { headers: { 'X_Wavelength_Api_Key': '12345' }, params: { userID: 198772 } };
  const body = {}; //missing body

  await EventController.postShare(req, t.context.res, t.context.next, body, req.params.userID);

  const responseBody = JSON.parse(t.context.res.payload);
  t.is(responseBody.message, "The request was malformed. Try modifying your input.");
  t.is(responseBody.code, 400);
  t.is(t.context.res.code, 400);
  t.is(t.context.res.headers['Content-Type'], 'application/json');
});

// Test for invalid request body
test('postShare - invalid request body', async t => {
  const req = { headers: { 'X_Wavelength_Api_Key': '12345' }, params: { userID: 198772 } };
  const body = { shareID: 10 }; // Missing required fields like `musicEntity` and `text`

  await EventController.postShare(req, t.context.res, t.context.next, body, req.params.userID);

  const responseBody = JSON.parse(t.context.res.payload);
  t.is(responseBody.message, "The request was malformed. Try modifying your input.");
  t.is(responseBody.code, 400);
  t.is(t.context.res.code, 400);
  t.is(t.context.res.headers['Content-Type'], 'application/json');
});

// Test for success
test('postShare - success', async t => {
  const req = { headers: { 'X_Wavelength_Api_Key': '12345' }, params: { userID: 198772 } };

  await EventController.postShare(req, t.context.res, t.context.next, t.context.body, req.params.userID);

  t.is(t.context.res.code, 200);
  t.is(t.context.res.headers['Content-Type'], 'application/json');

});
