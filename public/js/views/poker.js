App.PokerView = (function() {
  var View,
      template,
      AttendeesViews = App.AttendeesView,
      Cards = [0, '.5', 1, 2, 3, 5, 8, 13, 20, 40, 100, '<i class="fa fa-question"></i>', '<i class="fa fa-coffee"></i>'];

  template =  _.template('<div class="container poker">' +
                '<div class="row">' +
                  '<div class="col-xs-9">' +
                    '<input type="text" class="form-control" id="title" placeholder="Task title">' +
                    '<div class="playing-cards">' +
                      '<% _.each(cards, function(card) {%>' +
                        '<a href="javascript:void(0);" class="card" data-value=\'<%- card %>\'><span class="number"><%= card %></span></a>' +
                      '<% }); %>' +
                    '</div>' +
                  '</div>' +

                  '<div class="col-xs-3 attendees">' +
                    /* Attendees View Render Here */
                  '</div>' +
                '</div>' +
              '</div>');

  View = Backbone.View.extend({
    template: template,
    bindings: {
      'input#title': 'title'
    },
    events: {
      'click a.card': 'onCardSelected',
      'keyup input#title': 'onTitleChanged'
    },
    initialize: function(config) {
      Backbone.View.prototype.initialize.apply(this, arguments);
      this.subViews = {};
      this.subViews['attendees'] = new AttendeesViews({collection: this.collection});
    },
    render: function() {
      this.$el.html(this.template({cards: Cards}));
      this.$el.find('.attendees').html(
        this.subViews.attendees.render().el
      )
      this.stickit();
      this.delegateEvents();
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
    },
    onTitleChanged: function(e) {
      App.vent.trigger('title:changed', this.model.get('title'));
    }
  });

  return View;
})();
