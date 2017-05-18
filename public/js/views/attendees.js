App.AttendeesView = (function() {
  var View,
      template;

  template = _.template(
              '<p class="h2">Awesome People</p>' +
              '<ul class="list-group">' +
                '<% _.each(users, function(user) {%>'+
                  '<li class="list-group-item observer">' +
                    '<span class="pull-left">' +
                      '<i class="fa fa-<%=user.type %>"></i>' +
                    '</span>' +
                    '<span class="pull-right">' +
                      '<% if (user.vote) { %>' +
                        '<% if (display) { %>' +
                          '<span class="vote"><%= user.vote %></span>' +
                        '<% } else { %>'+
                          '<i class="fa fa-check"></i>' +
                        '<% }; %>'+
                      '<% } else { %>'+
                        '<i class="fa fa-commenting-o"></i>' +
                      '<% }; %>'+
                    '</span>' +
                    '<span class="name"><%- user.username %></span>' +
                  '</li>' +
                '<% }) %>' +
              '</ul>'
              );

  View = Backbone.View.extend({
    template: template,
    initialize: function(config) {
      Backbone.View.prototype.initialize.apply(this, arguments);
      this.listenTo(this.collection, 'add', this.render);
      this.listenTo(this.collection, 'remove', this.render);
      this.listenTo(this.collection, 'change', this.render);
      this.listenTo(this.collection, 'reset', this.render);
    },
    render: function() {
      this.delegateEvents();
      this.$el.html(
        this.template({
          users: this.collection.toJSON(),
          display: this.displayVotes()
        })
      );
      return this;
    },
    displayVotes: function() {
      var display = true;
      _.each(this.collection.models, function(model) {
        if (model.get('type') == 'voter' && !model.get('vote')) {
          display = false;
        }
      });

      return display;
    }
  });

  return View;
})();
