var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    var x0 = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var x1 = d3.scale.ordinal();

    var y = d3.scale.linear()
        .range([height, 0]);

    var color = d3.scale.ordinal()
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    var xAxis = d3.svg.axis()
        .scale(x0)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(d3.format(".2s"));

    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.json(dataUrl, function(error, data) {
      var ageNames = data.fieldNames;
      var ymax = 0;

      data.ticks.forEach(function(d, index) {
        if (d == null) {
            data.ticks[index] = {}
            d = data.ticks[index]

        }
        ymax = Math.max(ymax, d3.max(d3.keys(d).filter(function(name) { return name !== "date" }).map(function(key) { return d[key]})))
        d.slice = index;
      });

      console.log("Ymax", ymax)
      

      x0.domain(data.ticks.map(function(d, index) { return d.date; }));
      x1.domain(ageNames).rangeRoundBands([0, x0.rangeBand()]);
      y.domain([0, ymax]);

      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Event Count");

      var state = svg.selectAll(".slice")
          .data(data.ticks)
        .enter().append("g")
          .attr("class", "g")
          .attr("transform", function(d) { return "translate(" + x0(d.date) + ",0)"; });

      state.selectAll("rect")
          .data(function(d) { return d3.keys(d).filter(function(name) { return name !== "slice" && name !== "date"}).map(function(key) { return {name:key, value:d[key]}})})
        .enter().append("rect")
          .attr("width", x1.rangeBand())
          .attr("x", function(d) { return x1(d.name); })
          .attr("y", function(d) { return y(d.value); })
          .attr("height", function(d) { return height - y(d.value); })
          .style("fill", function(d) { return color(d.name); });

      var legend = svg.selectAll(".legend")
          .data(ageNames.slice().reverse())
        .enter().append("g")
          .attr("class", "legend")
          .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

      legend.append("rect")
          .attr("x", width - 18)
          .attr("width", 18)
          .attr("height", 18)
          .style("fill", color);

      legend.append("text")
          .attr("x", width - 24)
          .attr("y", 9)
          .attr("dy", ".35em")
          .style("text-anchor", "end")
          .text(function(d) { return d; });

    });