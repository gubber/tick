
exports.DAY = 1000 * 60 * 60 * 24;
exports.HOUR = 1000 * 60 * 60;


exports.ticks = function(data, dateField, targetField, tickSize, latestDate) {
	
	var latestMs;
	var output = {}
	if( latestDate === undefined) {
		latestMs = new Date().getTime()
	} else {
		latestMs = new Date(latestDate).getTime();
	}
	
	var latestTick = Math.floor(latestMs / tickSize)
	var ticks = []
	var fields = {}

	for (var i = data.length - 1; i >= 0; i--) {
		
		var date = new Date(getField(data[i], dateField))
		var tick = latestTick - Math.floor(date / tickSize)
		
		if (ticks[tick] === undefined) {
			var tickTime = new Date();
			tickTime.setTime((latestTick - tick) * tickSize)
			ticks[tick] = {__date__: tickTime}
		}

		fields = listFieldsWithValues(data[i])

	}
	
	output.ticks = ticks;
	output.fields = fields;
	return output;
}

var getField = function(obj, descriptor) {
	var arr = descriptor.split(".");
    while(arr.length && (obj = obj[arr.shift()]));
    return obj;
}


var getStructure = function(obj) {
	var structure = {}
	for(key in obj) {
		if (Object.prototype.toString.call(obj[key]).indexOf('Array') >= 0) {
			structure[key] = "[ " + obj[key].length + " rows ]"
		} else if (Object.prototype.toString.call(obj[key]).indexOf('Object') >= 0){
			structure[key] = getStructure(obj[key])
		} else {
			structure[key] = obj[key]
		}
	}
	return structure
}

var listFieldsWithValues = function(obj) {
	var fields = {}
	for (var key in obj) {
		if (fields[key] === undefined) { fields[key] = [] }
		var value = obj[key]
		if (fields[key].indexOf(value == -1)) { 
			fields[key].push(value)
		}
	}
	return fields
}



exports.listFieldsWithValues = listFieldsWithValues;
exports.getField = getField;
exports.getStructure = getStructure;