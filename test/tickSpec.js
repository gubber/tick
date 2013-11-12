var assert = require("assert")
var tick = require("../tick/tick")

var testData = [{date:'2013-10-02', value:1}, {date:'2013-10-01', value:2, otherField:"interesting"}]

describe('Tick', function() {
	describe('#tick()', function(){
		it('should split into ticks according to time and mark the date', function(){
			var out = tick.ticks(testData, 'date', 'value', tick.DAY, '2013-10-02')
			assert.equal(out.ticks.length,2);
			assert.deepEqual(out.ticks[0].__date__, new Date('2013-10-02'))
			assert.deepEqual(out.ticks[1].__date__, new Date('2013-10-01'))

		})

		it('should list all the available fields found', function(){

			var out = tick.ticks(testData, 'date', 'value', tick.DAY, '2013-10-02')
			assert.deepEqual(Object.keys(out.fields), ['date', 'value', 'otherField']);

		})

		it('should list all the available values for all fields found', function(){

			var out = tick.ticks(testData, 'date', 'value', tick.DAY, '2013-10-02')
			assert.deepEqual(out.fields.value, [2,1]);

		})



	})

	describe('#getField', function() {

		it('should dereference the object field based on a string descriptor', function() {

			var obj = { one:{two:{three:987}}}
			assert.equal(tick.getField(obj, "one.two.three"), 987)

		})
	})


})