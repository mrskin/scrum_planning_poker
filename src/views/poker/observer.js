App.PokerObserverView = (function() {
  var View,
      template;

  template = _.template(
    '<% if (count == 0) { %>' +
      '<div class="alert alert-warning">So lonely...</div>' +
    '<% } else if (display) { %>' +
      '<div class="alert alert-success">Voting Done.</div>' +
    '<% } else { %>' +
      '<div class="alert alert-info">Waiting for votes....</div>' +
    '<% }; %>'
  );

  View = Backbone.View.extend({
    id: 'observerView',
    template: template,
    initialize: function(config) {
      Backbone.View.prototype.initialize.apply(this, arguments);
      this.listenTo(this.collection, 'add sort remove change reset', this.render);
    },
    render: function() {
      this.delegateEvents();
      this.$el.html(
        this.template({
          display: this.collection.displayVotes(),
          count: this.collection.length
        })
      );
      return this;
    }
  });

  return View;
})();
