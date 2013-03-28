(function(App, B, $) {
  var deviceList = new App.DeviceList(),
    deviceListView = new App.DeviceListView({
      el: $('#devices'),
      model: deviceList
    });

  App.data.deviceList = deviceList;
  App.views.deviceList = deviceListView;

  // deviceListView.on('delete-device', function(data) {
  //   console.log('delete: ', arguments);
  // });

  deviceListView.on('add-device', function() {
    this.showForm();
  });
  deviceListView.on('edit-device', function(data) {
    this.showForm(data);
  });

  deviceListView.on('submit', function(data) {
    if (!data) return;
    if (data.create) {
      var device = new App.Device(data.data), self = this;
      device.once('change', function(model) {
        self.model.add(model);
        self.hideForm();
      });
      device.save();
    } else {
      var d = data.data, device = this.model.get(d._id);
      device.save();
      this.hideForm();
    }
  });

  deviceListView.on('show-device', function(data) {
    App.router.navigate('devices/' + data._id, true);
  });

  App.showDeviceList = function() {
    deviceList.fetch({ reset: true });
  };
}(ArduinoApp, Backbone, $));
