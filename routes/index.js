var http = require('http');
var tick = require('../tick/tick')

exports.data = function(req, res){
	var path = req.url

	callback = function(response) {
		var str = '';

		response.on('data', function (chunk) {
			str += chunk;
		});

		response.on('end', function () {
			var data = JSON.parse(str);
			var output = tick.ticks(data, '_timestamp.$date', req.params.targetField, tick.DAY)
			res.json(output);
		});
	}

	var options = {
	  host: 'event-tracker-uat.wdsserve.com',
	  path: '/event-tracker-server/v3/query?filter_type=' + req.params.eventType + '&sort=-_id&limit=1000&debug=true',
	  auth: 'user:pass'
	};

	
	http.request(options, callback).end(); 
	console.log(new Date(), "Reading")
	

};

exports.index = function(req, res) {
	var dataUrl = '/data/' + req.params.eventType + '/' + req.params.targetField
	res.locals({dataUrl: dataUrl})
	res.render('index')
}
