"use strict";


var sqlite3 = require('sqlite3').verbose();
var require('http');
var db = new sqlite3.Database('scrumtastic.sqlite3', function(err) {
  if(err) console.error(err);
});

var router = new (require('./lib/route').Router);

router.add('/app.js', function(req, res) {
  fs.readFile('public/app.js', function(err, body) {
    res.end(body);
  });
});

var migrate = require('./lib/migrate');
migrate(db, 'migrations', function(err) {

  var server = new http.Server(function(req, res) {
    router.route(req, res)
  });
  server.listen(3000, function() {
    console.log("Listening on port " + 3000);
  });
});