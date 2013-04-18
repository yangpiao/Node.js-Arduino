var ws = require('../ws.js');

exports.send = function(req, res) {
  var data = req.body;
  ws.sendCommand(data);
  res.send(200, {
    msg: 'Command sent'
  });
};
