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
    },

    parse: function(res) {
      return {
        data: res
      };
    }
  });
}(ArduinoApp, Backbone));
