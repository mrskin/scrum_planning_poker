App.PokerCardsView = (function() {
  var View,
      template,
      Cards = [0, '.5', 1, 2, 3, 5, 8, 13, 20, 40, 100, '<i class="fa fa-question"></i>', '<i class="fa fa-coffee"></i>'];

  template = _.template(
              '<% _.each(cards, function(card) {%>' +
                '<a href="javascript:void(0);" class="card" data-value=\'<%- card %>\'><span class="number"><%= card %></span></a>' +
              '<% }); %>'
              );

  View = Backbone.View.extend({
    template: template,
    events: {
      'click a.card': 'onCardSelected'
    },
    initialize: function(config) {
      Backbone.View.prototype.initialize.apply(this, arguments);
    },
    render: function() {
      this.delegateEvents();
      this.$el.html(
        this.template({ cards: Cards })
      );
      return this;
    },
    onCardSelected: function(e) {
      e.preventDefault();
      var ele   = $(e.currentTarget);

      if (!ele.hasClass('selected')) {
        vote = ele.attr('data-value')+'';
        this.$el.find('a.card').removeClass('selected');
        ele.addClass('selected');
      } else {
        vote = null;
        this.$el.find('a.card').removeClass('selected');
      }
      App.vent.trigger('vote:selected', vote);
    }
  });

  return View;
})();
