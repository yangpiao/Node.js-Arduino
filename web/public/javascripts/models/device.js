(function(App, B) {
  var Device = App.Device = B.Model.extend({
    urlRoot: '/devices',
    idAttribute: '_id',

    defaults: {
      name: 'Unknown Device',
      description: '',
      registered: new Date()
    },

    initialize: function() {
    }
  });

  App.DeviceList = B.Collection.extend({
    model: Device,
    url: '/devices'
  });
}(ArduinoApp, Backbone));
