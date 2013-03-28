(function(App, B) {
  App.Router = B.Router.extend({
    routes: {
      '': 'index',
      'devices/:id': 'showDevice',
      'devices/:deviceId/sensors/:id': 'showSensor'
    },

    index: function() {
      App.showDeviceList();
    },

    showDevice: function(id) {
      App.showDevice(id);
    },

    showSensor: function(deviceId, id) {
      App.showSensor(deviceId, id);
    }
  });
}(ArduinoApp, Backbone));
