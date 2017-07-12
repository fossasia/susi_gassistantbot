'use strict';

// Enable debugging
process.env.DEBUG = 'actions-on-google:*';

var Assistant = require('actions-on-google').ApiAiApp;
var express = require('express');
var bodyParser = require('body-parser');

//defining app and port
var app = express();
app.set('port', (process.env.PORT || 8080));
app.use(bodyParser.json());

const SUSI_INTENT = 'question';

app.post('/webhook', function (request, response) {
  //console.log('headers: ' + JSON.stringify(request.headers));
  //console.log('body: ' + JSON.stringify(request.body));

  const assistant = new Assistant({request: request, response: response});

  function responseHandler (app) {
    // intent contains the name of the intent you defined in the Actions area of API.AI
    let intent = assistant.getIntent();
    switch (intent) {
      case SUSI_INTENT:
        var query = assistant.getRawInput(SUSI_INTENT);
        console.log(query);

        var options = {
        method: 'GET',
        url: 'http://api.asksusi.com/susi/chat.json',
        qs: {
            timezoneOffset: '-330',
            q: query
          }
        };

        var request = require('request');
        request(options, function(error, response, body) {
        if (error) throw new Error(error);

        var ans = (JSON.parse(body)).answers[0].actions[0].expression;
        assistant.ask(ans);

        });
        break;

    }
  }
  assistant.handleRequest(responseHandler);
});

// For starting the server
var server = app.listen(app.get('port'), function () {
  console.log('App listening on port %s', server.address().port);
});
