var path = require('path');

function getResource(p) {
  return require('./resources/' + p);
}

require('bogus-api').create({
  resourceDir: path.resolve(__dirname, './resources'),
  resourceUriPrefix: '/rest',

  priorityRoutes: function(server) {

    // ----- SEARCH
    server.get('/v1/search.json', function(req, res) {
      res.status(200).json(getResource('search'));
    });

	  // ----- CURRENT
	  server.get('/v1/current.json', function(req, res) {
		  res.status(200).json(getResource('current'));
	  });

	  // ----- FORECAST
	  server.get('/v1/forecast.json', function(req, res) {
		  res.status(200).json(getResource('forecast'));
	  });

  }
}).start();
