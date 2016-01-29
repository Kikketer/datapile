#!/usr/bin/env node

/**
 * Chris Weed (christopher.weed@libertymutual.com)
 * Copyright 2016 Liberty Mutual Insurance
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
    else if (!arguments[i + 1]) {
      console.error('Error in your command, check the docs');
    }
  }
}

var datapile = require('../app.js')(resultConfig);
