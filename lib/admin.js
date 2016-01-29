/**
 * Chris Weed (chris@cjweed.com)
 *
 * This provides the admin interface that's served up as the local root.
 */

var fs = require('fs');
var path = require('path');
var status = 200;

exports.adminRoute = function(req, res) {
  if (req.method === 'GET') {
    return getAdmin(req, res);
  }
  else if (req.method === 'POST') {
    return updateSettings(req, res);
  }
  else if (req.method === 'PUT') {
    return sendStatus(req, res);
  }
  else {
    res.setHeader(404);
    return res.end();
  }
};

exports.getStatus = function() {
  return status;
};

function sendStatus(req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify({status: status}));
}

function getAdmin(req, res) {
  fs.readFile(path.join(__dirname, 'admin.html'), {encoding: 'utf8'}, function(err, adminFile) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(adminFile);
  });
}

function updateSettings(req, res) {
  var body = '';
  req.setEncoding('utf8');
  req.on('data', function(chunk) {
    body += chunk;
  });
  req.on('end', function() {
    // Probably some security issue here :)
    var b = JSON.parse(body);
    status = b.status;

    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({status: status}));
  });
}