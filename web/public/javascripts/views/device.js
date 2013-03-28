(function(App, $, B, H) {
  var E_SHOW = 'show-device',
    E_EDIT = 'edit-device',
    E_DELETE = 'delete-device';

  var DeviceView = App.DeviceView = B.View.extend({
    template: $('#device-template').html(),
    tagName: 'li',
    className: 'device',
    id: function() {
      return 'device-' + this.model.id;
    },

    events: {
      'click .view': 'onView',
      'click .edit': 'onEdit',
      'click .delete': 'onDelete'
    },

    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'sync', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function() {
      if (!this.template) throw new Error('No template');
      var tmpl = H.compile(this.template);
      this.$el.html(tmpl(this.model.attributes));
    },

    triggerEvent: function(type, e) {
      this.trigger(type, this.model.attributes);
      e.preventDefault();
      e.stopPropagation();
    },

    onView: function(e) {
      this.triggerEvent(E_SHOW, e);
    },
    onEdit: function(e) {
      this.triggerEvent(E_EDIT, e);
    },
    onDelete: function(e) {
      this.triggerEvent(E_DELETE, e);
      if (confirm('Are you sure?')) {
        this.model.destroy();
      }
    },

    removeDevice: function() {
      this.model.destroy();
    }
  });

  DeviceView.EVENTS = [E_SHOW, E_EDIT, E_DELETE];
}(ArduinoApp, $, Backbone, Handlebars));
