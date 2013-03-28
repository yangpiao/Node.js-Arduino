(function(App, B, $) {
  var views = App.views, data = App.data, sensor = data.sensor,
    rootUrl = '/devices/:deviceId/sensors/';

  var sensorData = new App.SensorData(),
    chartView = new App.ChartView({
      el: $('#sensor-data'),
      model: sensorData
    });

  App.data.sensorData = sensorData;

  App.showSensor = function(deviceId, id) {
    views.deviceDetail.hide();
    if (!sensor) {
      sensor = new App.Sensor({ _id: id });
      sensor.urlRoot = rootUrl.replace(':deviceId', deviceId);
    }
    sensor.fetch();
    sensorData.set({ _id: id });
    sensorData.fetch();
  };
}(ArduinoApp, Backbone, $));
