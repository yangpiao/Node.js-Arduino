(function(App, $, B, H) {
  App.SensorListView = B.View.extend({
    events: {},

    initialize: function() {
      this.listenTo(this.model, 'reset', this.render);
      this.listenTo(this.model, 'add', this.renderSensor);
    },

    render: function() {
      this.model.forEach(this.renderDevice, this);
      this.show();
    },

    renderSensor: function(sensor) {
      var view = new App.SensorView({
        model: sensor
      });
      view.render();
      var E = App.SensorView.EVENTS, i, len = E.length;
      for (i = 0; i < len; i++) {
        this.subEvents(view, E[i]);
      }
      this.$el.append(view.el);
    },

    subEvents: function(subview, type) {
      this.listenTo(subview, type, function(data) {
        this.trigger(type, data);
      });
    },

    show: function() {
      this.$el.show();
    },

    hide: function() {
      this.$el.hide();
    }
  });
}(ArduinoApp, $, Backbone, Handlebars));
