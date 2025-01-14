import test from 'ava';
import http from 'node:http';
import got from 'got';
import {serverPort,app} from "../index.js";

// Start the server and create a context with a got instance
test.before(async (t) => {
	t.context.server = http.createServer(app);
    // Start the server on a random port
    const server = t.context.server.listen();
    const { port } = server.address();
	t.context.got = got.extend({ responseType: "json", prefixUrl: `http://localhost:${port}/api/v1` });

});
// Close the server after the tests
test.after.always((t) => {
	t.context.server.close();
});

/* 
*********************************
GET user/{userID}/import
*********************************
 */

// JSON response for GET /import
let getImportJson = [{"importID":10,"text":"Enjoy my newest album","userID":198772,"platform":"spotify","creation":{"duration":300,"image":"","music-entity-pack":{"albums":[{"date":"mm/dd/yy hh:mm:ss","image":"","songs-ids":[null],"artists-ids":[null],"name":"The Wall","genre":"rap"}],"artists":[{"image":"","albums":[null],"name":"Pink Floyd"}],"songs":[{"duration":0,"name":"To agalma","entity-id":"moneypinkfloyd102562"}],"playlists":[{"songs":[null],"name":"My awesome playlist","creator-id":6}]},"name":198772,"genre":"rap","id":10}},{"importID":10,"text":"Enjoy my newest album","userID":198772,"platform":"spotify","creation":{"duration":300,"image":"","music-entity-pack":{"albums":[{"date":"mm/dd/yy hh:mm:ss","image":"","songs-ids":[null],"artists-ids":[null],"name":"The Wall","genre":"rap"}],"artists":[{"image":"","albums":[null],"name":"Pink Floyd"}],"songs":[{"duration":0,"name":"To agalma","entity-id":"moneypinkfloyd102562"}],"playlists":[{"songs":[null],"name":"My awesome playlist","creator-id":6}]},"name":198772,"genre":"rap","id":10}}];


// Test for unauthorized access to GET /import
test('GET /import - unauthorized', async (t) => {
  // Missing authorization API key
  const { body, statusCode } = await t.context.got("user/198772/import", {
        searchParams: { importID: 10 },
        throwHttpErrors: false
    });
  t.is(statusCode, 401);
  t.is(body.message, '\'X-Wavelength-Api-Key\' header required');
});

// Test for resource not found in GET /import  
test('GET /import - resource not found - invalid importID', async (t) => {
  // Passing authorization by including valid API key
  const { body, statusCode } = await t.context.got("user/198772/import", { 
  searchParams: { importID: 404 }, // Changed importID to non-existent
    headers: { 'X-Wavelength-Api-Key': '12345' },
    throwHttpErrors: false
  });
t.is(statusCode, 404);
t.is(body.message, "Your requested resource is nowhere to be found! Perhaps try searching something else?");
});

test('GET /share - resource not found - invalid userID', async (t) => {
  // Passing authorization by including valid API key
  const { body, statusCode } = await t.context.got("user/404/import", {    // Changed userID to non-existent
    searchParams: { importID: 10 },
    headers: { 'X-Wavelength-Api-Key': '12345' },
    throwHttpErrors: false
  });
      
t.is(statusCode, 404);
t.is(body.message, "Your requested resource is nowhere to be found! Perhaps try searching something else?");
});
    
// Test for successful GET /import
test('GET /import - success', async (t) => {
  const { body, statusCode } = await t.context.got("user/198772/import", {
    searchParams: { importID: 10 },
     headers: { 'X-Wavelength-Api-Key': '12345' }, //Valid API key
    throwHttpErrors: false
  });
    
t.is(statusCode, 200);
t.true(Array.isArray(body));
t.deepEqual(body, getImportJson);
});

/* 
*********************************
POST user/{userID}/import
*********************************
 */

// JSON request for POST /import
let postImportJson = {"importID":10,"text":"Enjoy my newest album","userID":198772,"platform":"spotify","creation":{"duration":300,"image":"","music-entity-pack":{"albums":[{"date":"2024-12-09T12:00:00Z","image":"","songs-ids":["song123"],"artists-ids":["artist456"],"name":"The Wall","genre":"rap"}],"artists":[{"image":"","albums":["album789"],"name":"Pink Floyd"}],"songs":[{"duration":0,"name":"To agalma","entity-id":"moneypinkfloyd102562"}],"playlists":[{"songs":["song123"],"name":"My awesome playlist","creator-id":6}]},"name":198772,"genre":"rap","id":10}};


// Test for unauthorized access to POST /import
test('POST /import - unauthorized', async (t) => {
  // Missing authorization API key
  const { body, statusCode } = await t.context.got.post("user/198772/import", {
      json: postImportJson,
      throwHttpErrors: false
  });

  t.is(statusCode, 401);
  t.is(body.message, '\'X-Wavelength-Api-Key\' header required');
});

// Test for successful POST /import
test('POST /import - success', async (t) => {
  const { body, statusCode } = await t.context.got.post("user/198772/import", {
      json: postImportJson,
      headers: { 'X-Wavelength-Api-Key': '12345' }, //Valid API key
      throwHttpErrors: false
  });
  t.is(statusCode, 200);
});




    
