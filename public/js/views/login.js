App.LoginScreen = (function() {
  var template = '<div class="container credentials">' +
                    '<div class="well well-sm">' +
                      '<form class="form-horizontal">' +
                        '<fieldset>' +
                          '<legend>Enter in your credentials</legend>' +
                          '<div class="form-group">' +
                            '<input type="text" class="form-control" id="name" placeholder="Your callsign">' +
                          '</div>' +
                          '<div class="text-right">' +
                            '<button class="btn btn-primary" type="submit">Enter <i class="fa fa-sign-in"></i></button>' +
                          '</div>' +
                        '</fieldset>' +
                      '</form>' +
                    '</div>' +
                  '</div>';

  return Backbone.View.extend({
    template: _.template(template),
    events: {
      'submit form': 'onFormSubmit'
    },
    render: function() {
      this.$el.html( this.template() );
      return this;
    },
    onFormSubmit: function(e) {
      e.preventDefault();
      var name = this.$el.find('#name').val().trim();
      if (name.length > 0) {
        App.vent.trigger('user:login', name);
      } else {
        alert('You need a call sign.')
      }
    }
  });
})();
