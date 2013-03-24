
var dispatcher = (function() {
  var clients = {}, timeout = 30000;
  return {
    hold: function(sid, res) {
      if (!clients[sid]) clients[sid] = [];
      clients[sid].push(res);
    },
    timeout: function() {
    },
    dispatch: function(data) {
      if (!data) return;
      var sid = data.sensorId;
      if (!clients[sid]) return;
      var list = clients[sid], i, len = list.length;
      for (i = 0; i < len; i++) {
        (list.shift()).send([ data ]);
      }
      delete clients[sid];
    }
  };
}());

module.exports = dispatcher;
