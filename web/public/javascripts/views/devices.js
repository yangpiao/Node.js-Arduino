(function(App, $, B, H) {
  App.DeviceListView = B.View.extend({
    template: $('#device-list-template').html(),
    // tagName: 'ul',
    // className: 'device-list',
    events: {
      'click .add': 'add'
    },

    initialize: function() {
      // this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'reset', this.render);
      // this.listenTo(this.model, 'sync', this.render);
      this.listenTo(this.model, 'add', this.renderDevice);
      // sub views
      // this.deviceViews = [];
      // this.render();
    },

    render: function() {
      if (!this.template) throw new Error('No template');
      var tmpl = H.compile(this.template);
      this.$el.html(tmpl());
      this.$list = this.$('.device-list');
      this.$form = this.$('.add-device');
      this.renderForm();
      // this.deviceViews = [];
      this.model.forEach(this.renderDevice, this);
      this.show();
    },

    renderDevice: function(device) {
      // var $el = this.$el;
      var view = new App.DeviceView({
        // el: $el,
        model: device
      });
      view.render();
      var E = App.DeviceView.EVENTS, i, len = E.length;
      for (i = 0; i < len; i++) {
        this.subEvents(view, E[i]);
      }
      // this.$el.append(view.el);
      if (!this.$list) {
        this.$list = this.$('.device-list');
      }
      this.$list.append(view.el);
      // this.deviceViews.push(view);
    },

    renderForm: function() {
      var $form = this.$form;
      var form = new App.DeviceFormView({
        el: $form
      });
      form.render();
      this.formView = form;
      this.subEvents(form, 'submit');
    },

    showForm: function(data) {
      this.formView.show(data);
    },
    hideForm: function() {
      this.formView.hide();
    },

    subEvents: function(subview, type) {
      this.listenTo(subview, type, function(data) {
        this.trigger(type, data);
      });
    },

    add: function(e) {
      e.preventDefault();
      e.stopPropagation();
      this.trigger('add-device');
    },

    show: function() {
      this.$el.show();
    },

    hide: function() {
      this.$el.hide();
    }
  });
}(ArduinoApp, $, Backbone, Handlebars));
