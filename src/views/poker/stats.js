App.StatsView = (function() {
  var View,
      template;

  template = _.template('\
    <p class="h2">Statistics</p>\
    <table class="table table-bordered">\
      <thead>\
        <tr>\
          <th>Vote</th>\
          <th>Total</th>\
        </tr>\
      </thead>\
      <tbody>\
        <% _.each(totals, function(count, value) { %>\
          <tr>\
            <td><%= value %></td>\
            <td><%= count %></td>\
          </tr>\
        <% }); %>\
      </tbody>\
    </table>\
  ');

  View = Backbone.View.extend({
    template: template,

    initialize: function(config) {
      Backbone.View.prototype.initialize.apply(this, arguments);
      this.listenTo(this.collection, 'add sort remove change reset', this.onCollectionChange.bind(this));
      this.listenTo(App.vent, 'vote:display_votes', this.onDisplayVotes.bind(this));
      this.listenTo(App.vent, 'vote:clear', this.onVotesClear.bind(this));
      this.isShown = false;
    },

    render: function() {
      if (this.isShown) {
        this.$el.html(
          this.template({
            totals: this.totals()
          })
        );
      } else {
        this.$el.empty();
      }

      return this;
    },

    onDisplayVotes: function (value) {
      this.isShown = value || this.collection.displayVotes();
      this.render();
    },

    onCollectionChange: function () {
      this.onDisplayVotes(false);
    },

    onVotesClear: function () {
      this.isShown = false;
      this.render();
    },

    totals: function() {
      var votes = this.collection.pluck('vote').map(function (vote) {
        return typeof vote !== 'undefined' && vote !== null ? vote : 'none';
      });

      return _.countBy(votes);
    },
  });

  return View;
})();
