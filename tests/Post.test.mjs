import http from "node:http";

import test from "ava";
import got from "got";

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

//###################################
//          GET /feed/{ID}
//###################################

// Testing GET /feed/{ID} for unauthorized access
test("GET /feed/1 401", async (t) => {
    try{
        await t.context.got("feed/1", { // No API key
        });
    } catch(error){
        var statusCode = error.response.statusCode;
    }
	t.is(statusCode, 401); // Expect the status code to be 401
})

// Testing GET /feed/{ID} for invalid ID
test("/feed/dummy 400", async (t) => {
    try{
        await t.context.got("feed/dummy", {
            headers: {
                "X-Wavelength-Api-Key": "123"
            }
        });
    } catch(error){
        var statusCode = error.response.statusCode;
    }
	t.is(statusCode, 400); // Expect the status code to be 400
})

// Testing GET /feed/{ID} for non-existing feed
test("GET /feed/404 404", async (t) => {
    try{
        await t.context.got("feed/404", { // Non-existing feed
            headers: {
                "X-Wavelength-Api-Key": "123"
            }
        });
    } catch(error){
        var statusCode = error.response.statusCode;
    }
	t.is(statusCode, 404); // Expect the status code to be 404
})

// Testing GET /feed/{ID} for authorized access
test("GET /feed/1 200", async (t) => {
	const { body, statusCode } = await t.context.got("feed/1", {
        headers: {
            "X-Wavelength-Api-Key": "123" // Valid API key
        }
    });
	t.is(statusCode, 200); // Expect the status code to be 200
})

//###################################
//      GET /user/{ID}/posts
//###################################

// Testing GET /user/{ID}/posts for unauthorized access 
test("GET /user/1/posts 401", async (t) => {
    try{
        await t.context.got("user/1/posts", { //Missing API key
        });
    } catch(error){
        var statusCode = error.response.statusCode;
    }
	t.is(statusCode, 401); // Expect the status code to be 401
})

// Testing GET /user/{ID}/posts for invalid ID
test("GET /user/dummy/posts 400", async (t) => {
    try{
        await t.context.got("user/dummy/posts", { //Invalid ID
            headers: {
                "X-Wavelength-Api-Key": "123"
            }
        });
    } catch(error){
        var statusCode = error.response.statusCode;
    }
	t.is(statusCode, 400);  // Expect the status code to be 400
})

// Testing GET /user/{ID}/posts for non-existing user
test("GET /user/404/posts 404", async (t) => {
    try{
        await t.context.got("user/404/posts", { //Non-existing user
            headers: {
                "X-Wavelength-Api-Key": "123"
            }
        });
    } catch(error){
        var statusCode = error.response.statusCode;
    }
	t.is(statusCode, 404); // Expect the status code to be 404
})
// Testing GET /user/{ID}/posts for authorized access
test("GET /user/1/posts 200", async (t) => {
	const { body, statusCode } = await t.context.got("user/1/posts", {
        headers: {
            "X-Wavelength-Api-Key": "123" // Valid API key
        }
    });
	t.is(statusCode, 200);  // Expect the status code to be 200
})


//###################################
//        GET /post?postID=ID
//###################################

// Testing GET /post?postID=ID for unauthorized access
test("GET /post?postID=1 401", async (t) => {
    try{
        await t.context.got("post?postID=1", { // Missing API key
        });
    } catch(error){
        var statusCode = error.response.statusCode;
    }
	t.is(statusCode, 401); // Expect the status code to be 401
})

// Testing GET /post?postID=ID for invalid ID
test("GET /post?postID=dummy 400", async (t) => {
    try{
        const { body, statusCode } = await t.context.got("post?postID=dummy", {     // Invalid ID
            headers: {
                "X-Wavelength-Api-Key": "123"
            }
        });
    } catch(error){
        var statusCode = error.response.statusCode;
    }
	t.is(statusCode, 400); // Expect the status code to be 400
})

// Testing GET /post?postID=ID for non-existing post
test("GET /post?postID=404 404", async (t) => {
    try{
        const { body, statusCode } = await t.context.got("post?postID=404", { // Non-existing post
            headers: {
                "X-Wavelength-Api-Key": "123"
            }
        });
    } catch(error){
        var statusCode = error.response.statusCode;
    }
	t.is(statusCode, 404);  // Expect the status code to be 404
})

// Testing GET /post?postID=ID for authorized access
test("GET /post?postID=1 200", async (t) => {
	const { body, statusCode } = await t.context.got("post?postID=1", { 
        headers: {
            "X-Wavelength-Api-Key": "123" // Valid API key
        }
    });
	t.is(statusCode, 200); // Expect the status code to be 200
})

//###################################
//           POST /post
//###################################

// Sample post JSON for POST requests
let postJson = {
  "postComments": [
    {
      "authorID": 2,
      "content": "content"
    },
    {
      "authorID": 2,
      "content": "content"
    }
  ],
  "eventID": 5,
  "postReactions": [
    {
      "authorID": 5,
      "value": "laugh"
    },
    {
      "authorID": 5,
      "value": "laugh"
    }
  ],
  "postID": 1,
  "eventType": "rating",
  "userID": 6
};

// Testing POST /post for unauthorized access
test("POST /post 401", async (t) => {
    try{
        await t.context.got.post("post", { // Missing API key
            json: postJson
        });
    } catch(error){
        var statusCode = error.response.statusCode;
    }
	t.is(statusCode, 401); // Expect the status code to be 401
})

// Testing POST /post for malformed JSON
test("POST /post 400", async (t) => {
    try{
        await t.context.got.post("post", {
            json: {"postComments":"this_should_be_malformed_enough"}, // Malformed JSON
            headers: {
                "X-Wavelength-Api-Key": "123" 
            }
        });
    } catch(error){
        var statusCode = error.response.statusCode;
    }
	t.is(statusCode, 400); // Expect the status code to be 400
})

// Testing POST /post for authorized access
test("POST /post 200", async (t) => {
    const { body, statusCode } = await t.context.got.post("post", {
        json: postJson,
        headers: {
            "X-Wavelength-Api-Key": "123" // Valid API key
        }
    });
	t.is(statusCode, 200); // Expect the status code to be 200
})

//###################################
//      DELETE /post?postID=ID
//###################################

// Testing DELETE /post?postID=ID for unauthorized access
test("DELETE /post?postID=1 401", async (t) => {
    try{
        await t.context.got.delete("post?postID=1", { // Missing API key
        });
    } catch(error){
        var statusCode = error.response.statusCode;
    }
	t.is(statusCode, 401);  // Expect the status code to be 401
})

// Testing DELETE /post?postID=ID for invalid ID
test("GET /post?postID=1 400", async (t) => {
    try{
        await t.context.got.delete("post?postID=dummy", { // Invalid ID
            headers: {
            "X-Wavelength-Api-Key": "123"
            }
        });
    } catch(error){
        var statusCode = error.response.statusCode;
    }
	t.is(statusCode, 400); // Expect the status code to be 400
})

// Testing DELETE /post?postID=ID for non-existing post
test("DELETE /post?postID=1 200", async (t) => {
    const { body, statusCode } = await t.context.got.delete("post?postID=1", {
        headers: {
            "X-Wavelength-Api-Key": "123"   // Valid API key
        }
    });
	t.is(statusCode, 200); // Expect the status code to be 200
})
//###################################
//      POST /post/{ID}/react
//###################################

// Testing POST /post/{ID}/react for unauthorized access
test("POST /post/1/react 401", async (t) => {
    try{
        await t.context.got.post("post/1/react", { // Missing API key
        });
    } catch(error){
        var statusCode = error.response.statusCode;
    }
	t.is(statusCode, 401); // Expect the status code to be 401
})

// Testing POST /post/{ID}/react for invalid ID
test("POST /post/dummy/react 400", async (t) => {
    try{
        await t.context.got.post("post/dummy/react", {
            json: {authorID: "dummy", value: "laugh"}, // Invalid ID
            headers: {
            "X-Wavelength-Api-Key": "123" 
            }
        });
    } catch(error){
        var statusCode = error.response.statusCode;
    }
	t.is(statusCode, 400); // Expect the status code to be 400
})

// Testing POST /post/{ID}/react for authorized access
test("POST /post/1/react 200", async (t) => {
    const { body, statusCode } =  await t.context.got.post("post/1/react", {
        json: {authorID: 1, value: "laugh"},
        headers: {
        "X-Wavelength-Api-Key": "123" // Valid API key
        }
    });
	t.is(statusCode, 200);  // Expect the status code to be 200
})
//###################################
//      POST /post/{ID}/comment
//###################################

// Testing POST /post/{ID}/comment for unauthorized access
test("POST /post/1/comment 401", async (t) => {
    try{
        await t.context.got.post("post/1/comment", {   // Missing API key
        });
    } catch(error){
        var statusCode = error.response.statusCode;
    }
	t.is(statusCode, 401);  // Expect the status code to be 401
})


// Testing POST /post/{ID}/comment for invalid ID
test("POST /post/dummy/comment 400", async (t) => {
    try{
        await t.context.got.post("post/dummy/comment", {
            json: {authorID: "dummy", content: "test"}, // Invalid ID
            headers: {
            "X-Wavelength-Api-Key": "123"
            }
        });
    } catch(error){
        var statusCode = error.response.statusCode;
    }
	t.is(statusCode, 400); // Expect the status code to be 400
})

// Testing POST /post/{ID}/comment for authorized access
test("POST /post/1/comment 200", async (t) => {
    const { body, statusCode } =  await t.context.got.post("post/1/comment", {
        json: {authorID: 1, content: "test"},
        headers: {
        "X-Wavelength-Api-Key": "123" // Valid API key
        }
    });
	t.is(statusCode, 200); // Expect the status code to be 200
})
