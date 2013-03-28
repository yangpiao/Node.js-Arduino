(function(App, $, B, H) {
  var ChartView = App.ChartView = B.View.extend({
    template: $('#chart-template').html(),

    events: {
    },

    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      // this.listenTo(this.model, 'sync', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function() {
      if (!this.template) throw new Error('No template');
      var tmpl = H.compile(this.template);
      this.$el.html(tmpl(this.model.attributes));
    }
  });
}(ArduinoApp, $, Backbone, Handlebars));
