App.PokerView = (function() {
  var View,
      template,
      AttendeesView = App.AttendeesView,
      StatsView     = App.StatsView,
      CardsView     = App.PokerCardsView,
      ObserverView  = App.PokerObserverView;

  template =  _.template('<div class="container poker">' +
                '<div class="row">' +
                  '<div class="col-xs-7">' +
                    '<p class="h5 text-right"><span class="username"></span> <a href="javascript:void(0);" class="logout">(logout)</a></p>' +
                    '<input type="text" class="form-control" id="title" placeholder="Task title">' +
                    '<div class="playing-cards">' +
                      /* Poker View (or Observer View) */
                    '</div>' +
                  '</div>' +

                  '<div class="col-xs-3 attendees">' +
                    /* Attendees View Render Here */
                  '</div>' +

                  '<div class="col-xs-2 stats">' +
                    /* Stats View Render Here */
                  '</div>' +
                '</div>' +
              '</div>' +
              '<div class="input-group input-group-sm" id="poker-sharing">' +
                '<span class="input-group-addon"><i class="fa fa-share"></i></span>' +
                '<input type="text" class="form-control" id="share">' +
              '</div>');

  View = Backbone.View.extend({
    template: template,
    bindings: {
      'input#title': 'title',
      '.username': 'username'
    },
    events: {
      'click a.logout': 'onLogoutClick',
      'keyup input#title': 'onTitleChanged'
    },
    initialize: function(config) {
      Backbone.View.prototype.initialize.apply(this, arguments);
      this.subViews = {};
      this.subViews['attendees'] = new AttendeesView({collection: this.collection});
      this.subViews['stats'] = new StatsView({collection: this.collection});
      this.subViews['cards'] = new CardsView();
      this.subViews['observer'] = new ObserverView({collection: this.collection});
    },
    render: function() {
      this.$el.html(this.template());
      this.$el.find('#share').val( window.location.href );
      this.$el.find('.attendees').html(
        this.subViews.attendees.render().el
      );
      this.$el.find('.stats').html(
        this.subViews.stats.render().el
      );
      if (this.model.get('type') == 'observer') {
        this.$el.find('.playing-cards').html(
          this.subViews.observer.render().el
        );
      } else {
        this.$el.find('.playing-cards').html(
          this.subViews.cards.render().el
        );
      }
      this.stickit();
      this.delegateEvents();
      return this;
    },
    remove: function() {
      for(var i in this.subViews) {
        var view = this.subViews[i];
        view.remove();
      }
      Backbone.View.prototype.remove.apply(this, arguments);
    },
    onTitleChanged: function(e) {
      App.vent.trigger('title:changed', this.model.get('title'));
    },
    onLogoutClick: function(e) {
      e.preventDefault();
      if (confirm('Are you sure you want to leave?')) {
        App.vent.trigger('user:logout');
      }
    }
  });

  return View;
})();
