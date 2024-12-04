import http from "node:http";

import test from "ava";
import got from "got";

import {serverPort,app} from "../index.js";

test.before(async (t) => {
	t.context.server = http.createServer(app);
    const server = t.context.server.listen();
    const { port } = server.address();
	t.context.got = got.extend({ responseType: "json", prefixUrl: `http://localhost:${port}/api/v1` });
    console.log(`http://localhost:${port}/api/v1`);
});

test.after.always((t) => {
	t.context.server.close();
});

//###################################
//          GET /feed/{ID}
//###################################
test("GET /feed/1 401", async (t) => {
    try{
        await t.context.got("feed/1", {
        });
    } catch(error){
        var statusCode = error.response.statusCode;
    }
	t.is(statusCode, 401);
})

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
	t.is(statusCode, 400);
})

test("GET /feed/404 404", async (t) => {
    try{
        await t.context.got("feed/404", {
            headers: {
                "X-Wavelength-Api-Key": "123"
            }
        });
    } catch(error){
        var statusCode = error.response.statusCode;
    }
	t.is(statusCode, 404);
})

test("GET /feed/1 200", async (t) => {
	const { body, statusCode } = await t.context.got("feed/1", {
        headers: {
            "X-Wavelength-Api-Key": "123"
        }
    });
	t.is(statusCode, 200);
})

//###################################
//      GET /user/{ID}/posts
//###################################
test("GET /user/1/posts 401", async (t) => {
    try{
        await t.context.got("user/1/posts", {
        });
    } catch(error){
        var statusCode = error.response.statusCode;
    }
	t.is(statusCode, 401);
})

test("GET /user/dummy/posts 400", async (t) => {
    try{
        await t.context.got("user/dummy/posts", {
            headers: {
                "X-Wavelength-Api-Key": "123"
            }
        });
    } catch(error){
        var statusCode = error.response.statusCode;
    }
	t.is(statusCode, 400);
})

test("GET /user/404/posts 404", async (t) => {
    try{
        await t.context.got("user/404/posts", {
            headers: {
                "X-Wavelength-Api-Key": "123"
            }
        });
    } catch(error){
        var statusCode = error.response.statusCode;
    }
	t.is(statusCode, 404);
})

test("GET /user/1/posts 200", async (t) => {
	const { body, statusCode } = await t.context.got("user/1/posts", {
        headers: {
            "X-Wavelength-Api-Key": "123"
        }
    });
	t.is(statusCode, 200);
})


//###################################
//        GET /post?postID=ID
//###################################
test("GET /post?postID=1 401", async (t) => {
    try{
        await t.context.got("post?postID=1", {
        });
    } catch(error){
        var statusCode = error.response.statusCode;
    }
	t.is(statusCode, 401);
})

test("GET /post?postID=dummy 400", async (t) => {
    try{
        const { body, statusCode } = await t.context.got("post?postID=dummy", {
            headers: {
                "X-Wavelength-Api-Key": "123"
            }
        });
    } catch(error){
        var statusCode = error.response.statusCode;
    }
	t.is(statusCode, 400);
})

test("GET /post?postID=404 404", async (t) => {
    try{
        const { body, statusCode } = await t.context.got("post?postID=404", {
            headers: {
                "X-Wavelength-Api-Key": "123"
            }
        });
    } catch(error){
        var statusCode = error.response.statusCode;
    }
	t.is(statusCode, 404);
})

test("GET /post?postID=1 200", async (t) => {
	const { body, statusCode } = await t.context.got("post?postID=1", {
        headers: {
            "X-Wavelength-Api-Key": "123"
        }
    });
	t.is(statusCode, 200);
})

//###################################
//           POST /post
//###################################
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

test("POST /post 401", async (t) => {
    try{
        await t.context.got.post("post", {
            json: postJson
        });
    } catch(error){
        var statusCode = error.response.statusCode;
    }
	t.is(statusCode, 401);
})

test("POST /post 400", async (t) => {
    try{
        await t.context.got.post("post", {
            json: {"postComments":"this_should_be_malformed_enough"},
            headers: {
                "X-Wavelength-Api-Key": "123"
            }
        });
    } catch(error){
        var statusCode = error.response.statusCode;
    }
	t.is(statusCode, 400);
})

test("POST /post 200", async (t) => {
    const { body, statusCode } = await t.context.got.post("post", {
        json: postJson,
        headers: {
            "X-Wavelength-Api-Key": "123"
        }
    });
	t.is(statusCode, 200);
})

//###################################
//      DELETE /post?postID=ID
//###################################
test("DELETE /post?postID=1 401", async (t) => {
    try{
        await t.context.got.delete("post?postID=1", {
        });
    } catch(error){
        var statusCode = error.response.statusCode;
    }
	t.is(statusCode, 401);
})
test("GET /post?postID=1 400", async (t) => {
    try{
        await t.context.got.delete("post?postID=dummy", {
            headers: {
            "X-Wavelength-Api-Key": "123"
            }
        });
    } catch(error){
        var statusCode = error.response.statusCode;
    }
	t.is(statusCode, 400);
})
test("DELETE /post?postID=1 200", async (t) => {
    const { body, statusCode } = await t.context.got.delete("post?postID=1", {
        headers: {
            "X-Wavelength-Api-Key": "123"
        }
    });
	t.is(statusCode, 200);
})
//###################################
//      POST /post/{ID}/react
//###################################
test("POST /post/1/react 401", async (t) => {
    try{
        await t.context.got.post("post/1/react", {
        });
    } catch(error){
        var statusCode = error.response.statusCode;
    }
	t.is(statusCode, 401);
})
test("POST /post/dummy/react 400", async (t) => {
    try{
        await t.context.got.post("post/dummy/react", {
            json: {authorID: "dummy", value: "laugh"},
            headers: {
            "X-Wavelength-Api-Key": "123"
            }
        });
    } catch(error){
        var statusCode = error.response.statusCode;
    }
	t.is(statusCode, 400);
})
test("POST /post/1/react 200", async (t) => {
    const { body, statusCode } =  await t.context.got.post("post/1/react", {
        json: {authorID: 1, value: "laugh"},
        headers: {
        "X-Wavelength-Api-Key": "123"
        }
    });
	t.is(statusCode, 200);
})
//###################################
//      POST /post/{ID}/comment
//###################################
test("POST /post/1/comment 401", async (t) => {
    try{
        await t.context.got.post("post/1/comment", {
        });
    } catch(error){
        var statusCode = error.response.statusCode;
    }
	t.is(statusCode, 401);
})
test("POST /post/dummy/comment 400", async (t) => {
    try{
        await t.context.got.post("post/dummy/comment", {
            json: {authorID: "dummy", content: "test"},
            headers: {
            "X-Wavelength-Api-Key": "123"
            }
        });
    } catch(error){
        var statusCode = error.response.statusCode;
    }
	t.is(statusCode, 400);
})
test("POST /post/1/comment 200", async (t) => {
    const { body, statusCode } =  await t.context.got.post("post/1/comment", {
        json: {authorID: 1, content: "test"},
        headers: {
        "X-Wavelength-Api-Key": "123"
        }
    });
	t.is(statusCode, 200);
})
