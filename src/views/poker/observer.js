App.PokerObserverView = (function() {
  var View,
      template,
      Cards = [0, '.5', 1, 2, 3, 5, 8, 13, 20, 40, 100, '<i class="fa fa-question"></i>', '<i class="fa fa-coffee"></i>'];

  template = _.template(
    '<% if (display) { %>' +
      '<div class="alert alert-success">Voting Done.</div>' +
    '<% } else { %>' +
      '<div class="alert alert-info">Waiting for votes....</div>' +
    '<% }; %>'
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
        this.template({display: this.collection.displayVotes()})
      );
      return this;
    }
  });

  return View;
})();
