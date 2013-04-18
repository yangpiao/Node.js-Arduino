var sio = require('socket.io-client'),
  firmata = require('firmata'),
  config = require('./config'),
  url = config.uploadUrl,
  interval = config.uploadInterval,
  deviceId = config.deviceId,
  sensors = config.sensors,
  serial = config.serial;

var board = new firmata.Board(serial, function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('[connected] Firmware: ' + board.firmware.name + '-' +
    board.firmware.version.major + '.' + board.firmware.version.minor);

  // socket
  var socket = sio.connect(url);
  socket.on('connect', function() {
    socket.on('disconnect', function(data) {
      console.log('Disconnected');
      process.exit(0);
    });

    // upload sensor data
    var pin;
    for (pin in sensors) {
      (function(pin) {
        var id = sensors[pin];
        setInterval(function() {
          board.addListener('analog-read-' + pin, function(data) {
            send(id, data);
            board.removeAllListeners('analog-read-' + pin);
          });
        }, interval);
      })(pin);
    }

    // wait for commands
    socket.on('command', function(data) {
      if (!data) return;
      var pin = parseInt(data.pin, 10),
        value = parseInt(data.value, 10),
        duration = parseInt(data.duration, 10) || 0;
      board.pinMode(pin, board.MODES.OUTPUT);
      board.digitalWrite(pin, value);
      if (duration > 0) {
        setTimeout(function() {
          board.digitalWrite(pin, (value + 1) % 2);
        }, duration);
      }
    });

  });

  function send(sid, data) {
    socket.emit('upload-sensor-data', {
      data: data,
      sensorId: sid
    });
  }
});

// MODES = {
//   INPUT: 0x00,
//   OUTPUT: 0x01,
//   ANALOG: 0x02,
//   PWM: 0x03,
//   SERVO: 0x04
// };
