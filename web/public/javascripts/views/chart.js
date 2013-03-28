(function(App, $, B, H) {
  var ChartView = App.ChartView = B.View.extend({
    template: $('#chart-template').html(),

    events: {
    },

    initialize: function() {
      this.listenTo(this.model, 'change:data', this.render);
      this.listenTo(this.model, 'poll-data', this.addData);
      // this.listenTo(this.model, 'sync', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },

    addData: function(model, newData) {
      if (!this.chart) return;
      console.log('add data');
      var chart = this.chart, graph = chart.svg,
        line = chart.line, x = chart.x;
      var data = this.model.attributes.data;
      x.domain(data.map(function(d) { return d.uploaded; }));
      graph.selectAll('path').datum(data).attr('d', line);

      // graph.selectAll("path")
      //   .data([data])
      //   .attr("transform", "translate(" + x(1) + ")")
      //   .attr("d", line)
      //   .transition()
      //   .ease("linear")
      //   .duration(500)
      //   .attr("transform", "translate(" + x(0) + ")");
    },

    render: function() {
      if (!this.template) throw new Error('No template');
      var tmpl = H.compile(this.template);
      this.$el.html(tmpl());
      var data = this.model.attributes.data;


      var margin = {top: 20, right: 20, bottom: 20, left: 50},
        width = 860 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

      // var x = d3.time.scale().range([0, width]);
      x = d3.scale.ordinal().rangePoints([0, width]);
      var y = d3.scale.linear().range([height, 0]);
      var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(5);
      var yAxis = d3.svg.axis().scale(y).orient("left");
      var line = d3.svg.line()
        .x(function(d) { return x(d.uploaded); })
        .y(function(d) { return y(d.value); })
        .interpolate('linear');

      var svg = d3.select(".chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // x.domain(d3.extent(data, function(d) { return d.uploaded; }));
      x.domain(data.map(function(d) { return d.uploaded; }));
      y.domain(d3.extent(data, function(d) { return d.value; }));

      // svg.append("g")
      //   .attr("class", "x axis")
      //   .attr("transform", "translate(0," + height + ")")
      //   .call(xAxis)
      //   .selectAll('text').attr('dx', '-2em').attr('dy', '.3em')
      //   .attr('transform', 'rotate(-90)');
      svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);
      svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line);

      this.chart = {
        svg: svg,
        line: line,
        x: x,
        y: y
      };

    }
  });
}(ArduinoApp, $, Backbone, Handlebars));
