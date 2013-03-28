(function(App, B) {
  // start the app
  var app = new App.Router();
  App.router = app;
  B.history.start();
}(ArduinoApp, Backbone));
