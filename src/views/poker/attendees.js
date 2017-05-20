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
              '</ul>' +
              '<button type="button" class="btn btn-sm btn-warning">Clear Board</button>' +
              '<button type="button" class="btn btn-sm btn-info">Display Votes</button>'
              );

  View = Backbone.View.extend({
    template: template,
    events: {
      'click .btn-warning': 'onClearBoard',
      'click .btn-info': 'onDisplayVotes'
    },
    initialize: function(config) {
      Backbone.View.prototype.initialize.apply(this, arguments);
      this.listenTo(this.collection, 'add sort remove change reset', this.render);
      this.listenTo(App.vent, 'vote:display_votes', this.displayVotes.bind(this));
      this.forceDisplay = false;
    },
    render: function() {
      this.delegateEvents();
      this.$el.html(
        this.template({
          users: this.collection.toJSON(),
          display: this.forceDisplay || this.collection.displayVotes()
        })
      );
      return this;
    },
    displayVotes: function(value) {
      this.forceDisplay = value;
      this.render();
    },
    onDisplayVotes: function(e) {
      e.preventDefault();
      App.vent.trigger('vote:display');
    },
    onClearBoard: function(e) {
      e.preventDefault();
      App.vent.trigger('vote:clear');
    }
  });

  return View;
})();
