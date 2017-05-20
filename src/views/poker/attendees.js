App.AttendeesView = (function() {
  var View,
      template;

  template = _.template(
              '<p class="h2">Awesome People</p>' +
              '<ul class="list-group">' +
                '<% _.each(users, function(user) {%>'+
                  '<li class="list-group-item <%=user.type %>">' +
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
                      '<% } else if (user.type == \'voter\') { %>'+
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
      this.listenTo(this.collection, 'add sort remove change reset', this.render);
    },
    render: function() {
      this.delegateEvents();
      this.$el.html(
        this.template({
          users: this.collection.toJSON(),
          display: this.collection.displayVotes()
        })
      );
      return this;
    }
  });

  return View;
})();
