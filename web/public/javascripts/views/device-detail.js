(function(App, $, B, H) {
  App.DeviceDetailView = B.View.extend({
    template: $('#device-detail-template').html(),
    tagName: 'div',
    className: 'device-detail',
    events: {
      'click .add': 'add'
    },

    initialize: function() {
      // this.listenTo(this.model, 'reset', this.render);
      // this.listenTo(this.model, 'add', this.renderDevice);
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'sync', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function() {
      if (!this.template) throw new Error('No template');
      var tmpl = H.compile(this.template);
      this.$el.html(tmpl(this.model.attributes));
      this.$list = this.$('.sensor-list');
      this.$form = this.$('.add-sensor');
      this.renderSensors();
      this.renderForm();
      // this.model.forEach(this.renderDevice, this);
      this.show();
    },

    renderSensors: function() {
      var sensors = new App.SensorList();
      sensors.url = '/devices/' + this.model.id + '/sensors';
      var $list = this.$list;
      if (!$list) {
        $list = this.$list = this.$('.sensor-list');
      }
      var view = new App.SensorListView({
        el: $list,
        model: sensors
      });
      sensors.fetch();
      this.sensors = sensors;
      var E = App.SensorView.EVENTS, i, len = E.length;
      for (i = 0; i < len; i++) {
        this.subEvents(view, E[i]);
      }
    },

    renderForm: function() {
      var $form = this.$form;
      var form = new App.SensorFormView({
        el: $form
      });
      form.render();
      form.hide();
      this.formView = form;
      this.subEvents(form, 'submit');
    },
    showForm: function(data) {
      this.formView && this.formView.show(data);
    },
    hideForm: function() {
      this.formView && this.formView.hide();
    },

    subEvents: function(subview, type) {
      this.listenTo(subview, type, function(data) {
        this.trigger(type, data);
      });
    },

    add: function(e) {
      e.preventDefault();
      e.stopPropagation();
      this.trigger('add-sensor');
    },

    show: function() {
      this.$el.show();
    },

    hide: function() {
      this.$el.hide();
    }
  });
}(ArduinoApp, $, Backbone, Handlebars));
