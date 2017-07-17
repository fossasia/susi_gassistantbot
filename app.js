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

app.post('/webhook', function(request, response) {
    //console.log('headers: ' + JSON.stringify(request.headers));
    //console.log('body: ' + JSON.stringify(request.body));

    const assistant = new Assistant({
        request: request,
        response: response
    });

    function responseHandler(app) {
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
                    var type = (JSON.parse(body)).answers[0].actions;

                    if (type.length == 1 && type[0].type == "table") {
                        var data = (JSON.parse(body)).answers[0].data;
                        var columns = type[0].columns;
                        var key = Object.keys(columns);
                        var title = (JSON.parse(body)).query;
                        var list = [];

                        for (var i = 0; i < 6; i++) {
                          list[i] = assistant.buildOptionItem(data[i][key[0]], [key[0], key[1], key[2]])
                              .setTitle(data[i][key[0]])
                              .setDescription(key[1].toUpperCase() + ": " + data[i][key[1]] + "\n" + key[2].toUpperCase() + ": " + data[i][key[2]])
                        }

                        assistant.askWithList(assistant.buildRichResponse()
                            .addSimpleResponse('Here is the list: '),
                            // Build a list
                            assistant.buildList(title)
                            .addItems(list[0])
                            .addItems(list[1])
                            .addItems(list[2])
                            .addItems(list[3])
                            .addItems(list[4])
                            .addItems(list[5])
                        );
                    } else if(type.length == 2 && type[1].type == "rss"){
                      var data = (JSON.parse(body)).answers[0].data;
                      var columns = type[1];
                      var key = Object.keys(columns);
                      var list = [];

                      for (var i = 1; i < 4; i++) {
                        list[i] = assistant.buildOptionItem(data[i][key[1]], [key[0], key[1], key[2]])
                            .setTitle(data[i][key[1]])
                            .setDescription(key[2].toUpperCase() + ": " + data[i][key[2]] + "\n" + key[3].toUpperCase() + ": " + data[i][key[3]])
                      }

                      assistant.askWithCarousel(assistant.buildRichResponse()
                        .addSimpleResponse(ans),
                        // Build a carousel
                        assistant.buildCarousel()
                        .addItems(list[1])
                        .addItems(list[2])
                        .addItems(list[3])
                      );
                    } else {
                        assistant.ask(ans);
                    }

                });
                break;

        }
    }
    assistant.handleRequest(responseHandler);
});

// For starting the server
var server = app.listen(app.get('port'), function() {
    console.log('App listening on port %s', server.address().port);
});
