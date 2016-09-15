/**
 * Chris Weed (chris@cjweed.com)
 *
 * The goal is to have 0 external dependencies, NPM install is known to break within
 * our enterprise environment.  So if you have Node you can run this critter!
 */

var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');
var path = require('path');
var admin = require('./admin');

var defaults = {
  port: 3001,
  dataFolder: 'mock-data',
  blacklistQuery: []
};

module.exports = function(config) {
  config = config || defaults;

  // TODO merge better
  if (!config.port) config.port = defaults.port;
  if (!config.dataFolder) config.dataFolder = defaults.dataFolder;
  if (!config.blacklistQuery) config.blacklistQuery = defaults.blacklistQuery;

  var dataFolderMatch = new RegExp(config.dataFolder, 'i');

  http.createServer(function(req, res) {
    if (req.url.match(/^\/$/)) {
      // Admin page
      return admin.adminRoute(req, res);
    }
    else if (req.url.match(dataFolderMatch) || (req.headers.accept && req.headers.accept.match(/application\/json/i))) {
      // If you want an error...
      if (req.url.match(/-error-/gi)) {
        console.log('Returning error code');
        res.writeHead(500, {'Content-Type': 'application/json'});
        res.end();
      }
      else {
        var parsed = url.parse(req.url);
        var resultUrl;
        var queryObj = querystring.parse(parsed.query);
        Object.keys(queryObj).map(function(queryKey) {
          if (config.blacklistQuery.indexOf(queryKey) >= 0) {
            delete queryObj[queryKey];
          }
        });
        delete parsed.search;
        delete parsed.path;
        delete parsed.href;
        // Now reassemble
        parsed.query = querystring.stringify(queryObj);
        resultUrl = url.format(parsed);

        // Parse any search string and add it separated by & signs
        resultUrl = decodeURIComponent(resultUrl.replace(/\?/gi, '~'));
        // Turn all non-GETs into GETS
        resultUrl += '_' + req.method + '.json';
        if (!resultUrl.match(dataFolderMatch)) {
          resultUrl = '/' + config.dataFolder + resultUrl;
        }

        // Add a slight delay
        setTimeout(function() {
          if (admin.getStatus() === 200) {
            fs.readFile(path.join(process.cwd(), resultUrl), {encode: 'utf8'}, function(err, datr) {
              res.writeHead(200, {'Content-Type': 'application/json'});
              res.end(datr);
            });
          }
          else {
            res.writeHead(admin.getStatus());
            res.end();
          }
        }, 500);
      }

      console.log('200: ' + req.url + ' > ' + resultUrl);
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

  }).listen(config.port, 'localhost', function() {
    console.log('Server running on port ' + config.port);
    console.log('Using data folder: ' + config.dataFolder);
  });
};
