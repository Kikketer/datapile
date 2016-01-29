/**
 * Chris Weed (christopher.weed@libertymutual.com)
 * Copyright 2015 Liberty Mutual Insurance
 *
 * The goal is to have 0 external dependencies, NPM install is known to break within
 * our enterprise environment.  So if you have Node you can run this critter!
 *
 * TODO: Allow command line to adjust port
 * TODO: Allow command line to adjust the mock-data folder location
 * TODO: Potentially have a .mockserver config file
 */

var http = require('http');
var fs = require('fs');
var path = require('path');
var port = 3001;

http.createServer(function(req, res) {
  if (req.url.match(/mock\-data/gi) || (req.headers.accept && req.headers.accept.match(/application\/json/i))) {
    // If you want an error...
    if (req.url.match(/-error-/gi)) {
      console.log('Returning error code');
      res.writeHead(500, {'Content-Type': 'application/json'});
      res.end();
    }
    else {
      // Parse any search string and add it separated by & signs
      req.url = '.' + decodeURIComponent(req.url.replace(/\?/gi, '~'));
      // Turn all non-GETs into GETS
      req.url += '_' + req.method + '.json';
      if (!req.url.match(/mock\-data/gi)) {
        req.url = '/mock-data' + req.url;
        //req.url = req.url.replace(/\/mock\-data/, '');
      }

      // Add a slight delay
      setTimeout(function() {
        fs.readFile(path.join(__dirname, req.url), {encode: 'utf8'}, function(err, datr) {
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.end(datr);
        });
      }, 500);
    }

    console.log('200: ' + req.url);
  }
  // Simply serve up a 404 if it's an invalid data endpoint (pure data server)
  else {
    console.log('404: ' + req.url);
    res.writeHead(404);
    res.end();
  }
  // Enable this if we want to serve up static web content
  //else {
  //  req.url = '.' + req.url;
  //  if (req.url.match(/\/$/)) {
  //    req.url += 'index.html';
  //  }
  //  console.log(req.url);
  //  fs.readFile(req.url, {encoding: 'utf8'}, function(err, item) {
  //    res.writeHead(200);
  //    res.end(item);
  //  });
  //}

}).listen(port, 'localhost', function() {
  console.log('Server running on port ' + port);
});