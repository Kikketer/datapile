#!/usr/bin/env node

/**
 * Chris Weed (chris@cjweed.com)
 */

var path = require('path');
// Local version replace global one
try {
  var localDatapile = require.resolve(path.join(process.cwd(), 'node_modules', 'datapile', 'bin', 'datapile.js'));
  if (__filename !== localDatapile) {
    return require(localDatapile);
  }
} catch (e) {
}

// TODO Some argument parsing
var resultConfig = {};
var arguments = process.argv;
if (arguments) {
  for (var i = 2; i < arguments.length; i += 2) {
    if (arguments[i] === '--port' && arguments[i + 1]) {
      resultConfig.port = arguments[i + 1];
    }
    else if (arguments[i] === '--dataFolder' && arguments[i + 1]) {
      resultConfig.dataFolder = arguments[i + 1];
    }
    else if (arguments[i] === '--host' && arguments[i + 1]) {
      resultConfig.host = arguments[i + 1];
    }
    else if (arguments[i] === '--delay' && arguments[i + 1]) {
      resultConfig.delay = arguments[i + 1];
    }
    else if (arguments[i] === '--static' && arguments[i + 1] != null) {
      resultConfig.static = arguments[i + 1];
    }
    else if (arguments[i] === '--ignoreQuery' && arguments[i + 1] != null) {
      resultConfig.blacklistQuery = arguments[i + 1].split(',');
    }
    else if (!arguments[i + 1]) {
      console.error('Error in your command, check the docs');
    }
  }
}

var datapile = require('../lib/app.js')(resultConfig);
