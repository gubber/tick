var http = require('http');
var tick = require('../tick/tick')

exports.data = function(req, res){
	var path = req.params.dataUrl;

	callback = function(response) {
		var str = '';

		response.on('data', function (chunk) {
			str += chunk;
		});

		response.on('end', function () {
			var data = JSON.parse(str);
			//var output = tick.ticks(data, '_timestamp.$date', req.params.targetField, tick.DAY)
			var output = tick.getStructure(data)
			res.json(output);
		});
	}

	var options = {
	  host: 'event-tracker-uat.wdsserve.com',
	  path: '/event-tracker-server/v3/query?filter_type=' + req.params.eventType + '&sort=-_id&limit=1000&debug=true',
	  auth: 'user:pass'
	};

	console.log(decodeURIComponent(path))
	http.get(path, callback); 
	console.log(new Date(), "Reading")
	

};

exports.index = function(req, res) {
	res.render('index')
}


//https://spreadsheets.google.com/feeds/list/0AgkBEhhar-DKdHF3YTdTUUx2dVJIdkZHTi1xLVhaVlE/od6/public/values?alt=json-in-script&callback=