(function(App, $, B, H) {
  var E_SUBMIT = 'submit';

  var DeviceFormView = App.DeviceFormView = B.View.extend({
    template: $('#device-form-template').html(),
    events: {
      'click .submit': 'submit',
    },

    initialize: function() {
      this.create = false;
      this.render();
    },

    render: function() {
      if (!this.template) throw new Error('No template');
      var tmpl = H.compile(this.template);
      this.$el.html(tmpl());
      this.$el.hide();
      this.$name = this.$('.name');
      this.$desc = this.$('.description');
    },

    show: function(data) {
      if (!data || !data.name) {
        this.create = true;
        data = {};
      } else {
        this.create = false;
      }
      this.data = data;
      this.$name.val(data.name || '');
      this.$desc.val(data.description || '');
      this.$el.slideDown(200);
    },

    hide: function() {
      this.$el.slideUp(200);
    },

    submit: function(e) {
      var data = this.data || {}, self = this;
      data.name = $.trim(this.$name.val());
      data.description = $.trim(this.$desc.val());
      this.trigger(E_SUBMIT, {
        data: data,
        create: self.create
      });
      e.preventDefault();
      e.stopPropagation();
    }
  });
}(ArduinoApp, $, Backbone, Handlebars));
