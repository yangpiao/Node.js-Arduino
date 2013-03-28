(function(App, B) {
  var Sensor = App.Sensor = B.Model.extend({
    // urlRoot: function() {
    //   return '/devices/' + this.deviceId + '/sensors';
    // },
    idAttribute: '_id',

    defaults: {
      name: 'Unknown Sensor',
      description: '',
      registered: new Date()
    },

    initialize: function() {
      // this.deviceId = '';
    }
  });

  App.SensorList = B.Collection.extend({
    model: Sensor,
    url: '/sensors'
  });
}(ArduinoApp, Backbone));
