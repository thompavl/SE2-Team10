'use strict';

var path = require('path');
var http = require('http');
var cors = require('cors');

var oas3Tools = require('oas3-tools');
var serverPort = 8080;

// swaggerRouter configuration
var options = {
    routing: {
        controllers: path.join(__dirname, './controllers')
    },
};

var expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);

const app = expressAppConfig.getApp();

//add CORS header to prevent 405 error when using UI (check https://github.com/bug-hunters/oas3-tools/issues/19#issuecomment-2148726784)
app.use(cors());

// Get a reference to the router stack
let stack = app._router.stack;

// Find the indices of corsMiddleware and expressInit
let corsIndex = stack.findIndex(layer => layer.name === 'corsMiddleware');
let expressInitIndex = stack.findIndex(layer => layer.name === 'expressInit');

// Check if both middleware are in the stack
if (corsIndex !== -1 && expressInitIndex !== -1) {
    // Remove corsMiddleware from its current position
    let corsMiddleware = stack.splice(corsIndex, 1)[0];

    // If cors was after expressInit in the stack, decrement expressInitIndex
    if (corsIndex > expressInitIndex) {
        expressInitIndex--;
    }

    // Insert corsMiddleware before expressInit
    stack.splice(expressInitIndex, 0, corsMiddleware);
}

// Initialize the Swagger middleware
http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
});

module.exports = {serverPort,app};

