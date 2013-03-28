(function(App, B) {
  var SensorData = App.SensorData = B.Model.extend({
    idAttribute: '_id',
    urlRoot: '/sensors',
    url: function() {
      return this.urlRoot + '/' + this.id + '/data';
    },

    defaults: function() {
      return {
        data: []
      };
    },

    initialize: function() {
      this.on('change:data', function(model, value) {
        var data = model.attributes.data;
        if (data.length > 1000) {
          // model.attributes.data = data.slice(data.length - 20);
          model.attributes.data = data.slice(0, 1000);
        }
      });
    },

    parse: function(res) {
      return {
        data: res
      };
    }
  });
}(ArduinoApp, Backbone));
