(function(App, B, $) {
  var device = new App.Device();
  var deviceDetailView = new App.DeviceDetailView({
    el: $('#device-view'),
    model: device
  });

  var rootUrl = '/devices/:deviceId/sensors/', deviceId;

  deviceDetailView.on('add-sensor', function() {
    this.showForm();
  });
  deviceDetailView.on('edit-sensor', function(data) {
    this.showForm(data);
  });
  deviceDetailView.on('submit', function(data) {
    if (!data) return;
    if (data.create) {
      var sensor = new App.Sensor(data.data), self = this;
      sensor.url = deviceDetailView.sensors.url;
      // sensor.deviceId = deviceId;
      sensor.once('change', function(model) {
        self.sensors.add(model);
        self.hideForm();
      });
      sensor.save();
    } else {
      var d = data.data, sensor = this.sensors.get(d._id);
      sensor.save();
      this.hideForm();
    }
  });

  deviceDetailView.on('show-sensor', function(data) {
    var s = deviceDetailView.sensors.get(data._id);
    App.data.sensor = s;
    App.router.navigate(s.url(), true);
  });

  var views = App.views;
  views.deviceDetail = deviceDetailView;
  App.showDevice = function(id) {
    views.deviceList.hide();
    device.set('_id', id);
    device.fetch();
    deviceId = id;
    // deviceDetailView.deviceUrl = rootUrl.replace(':deviceId', id);
    // deviceDetailView.show();
    // fetch data
  };
}(ArduinoApp, Backbone, $));
