var URL = require('url');
var apikey = "82aa023bc561b179";
var express = require('express');
var app = express();

var weather = function (apikey) {
    var format = ".json";
    var host = 'http://api.wunderground.com/api/' + apikey;

    var get = function (callback, path) {
        var url = host + path;
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                body = JSON.parse(body);
                callback(error, body);
            }
            else if (error) {
                console.log('error: ' + err);
            }
         });
    };

    this.conditions = function (query, callback) {
        var path = "/conditions/q/" + query + format;
        get(callback, path);
    };
};

app.get('/conditions', function(req, res){
   var query = URL.parse(req.url).query;
   var w = new weather(apikey);
   w.conditions(query, function(err, obj) {
        if (err){
            console.log('errors: ' + err);
        }
        res.end(obj);
   });
});

app.listen(8080);