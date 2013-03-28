(function(App, B, $) {
  var oneDay = 24 * 60 * 60 * 1000;
  var SensorData = App.SensorData = B.Model.extend({
    idAttribute: '_id',
    urlRoot: '/sensors',
    url: function() {
      return this.urlRoot + '/' + this.id +
        '/data?n=1000&from=' + (this.startTime() || '');
    },

    defaults: function() {
      return {
        data: []
      };
    },

    initialize: function() {
      this.on('change:data', function(model, value) {
        this.limit(1000);
      });
      this.polling = true;
    },

    limit: function(n) {
      n = n || 1000;
      var data = this.attributes.data;
      if (data.length > n) {
        this.attributes.data = data.slice(data.length - n);
        // model.attributes.data = data.slice(0, 1000);
      }
    },

    poll: function(forced) {
      var pollUrl = this.urlRoot + '/' + this.id + '/poll', self = this;
      if (forced) this.polling = true;
      if (this.polling) {
        $.ajax({
          url: pollUrl,
          method: 'get',
          data: { ts: Date.now() },
          success: function(data) {
            var d = self.get('data');
            for (var i = 0, len = data.length; i < len; i++) {
              var item = data[i];
              item.uploaded = new Date(Date.parse(item.uploaded));
              d.push(item);
              if (d.length > 1000) {
                d.shift();
              }
            }
            self.trigger('poll-data', self, data);
            self.poll();
          },
          timeout: function() {
            self.poll();
          }
        });
      }
    },

    stopPolling: function() {
      this.polling = false;
    },

    parse: function(res) {
      res.forEach(function(d) {
        d.uploaded = new Date(Date.parse(d.uploaded));
      });
      return {
        data: res
      };
    },

    startTime: function() {
      var now = new Date();
      return now - oneDay;
    }
  });
}(ArduinoApp, Backbone, $));
