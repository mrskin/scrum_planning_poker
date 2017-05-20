App.MainView = (function() {
  var View;

  View = Backbone.View.extend({
    initialize: function(config) {
      Backbone.View.prototype.initialize.apply(this, arguments);

      this.socket             = config.socket;
      this.subViews           = {};
      this.subViews['screen'] = new App.PokerView({collection: this.collection, model: this.model});
      this.listenTo(App.vent, 'title:changed', this.onTitleSet.bind(this));
      this.listenTo(App.vent, 'vote:selected', this.onVoteSet.bind(this));
      this.listenTo(App.vent, 'vote:display', this.onVoteDisplay.bind(this));
      this.listenTo(App.vent, 'vote:clear', this.onVoteClear.bind(this));
      this.socket.on('message', this.onSocketMessage.bind(this));
    },
    remove: function() {
      this.socket.off('message', this.onSocketMessage.bind(this));
      Backbone.View.prototype.remove.apply(this, arguments);
    },
    render: function() {
      this.$el.html( this.subViews['screen'].render().el );
      return this;
    },
    addUser: function(user) {
      var exists = !!this.collection.find({id: user.id});
      if (!exists) { this.collection.add(user); }
    },
    onTitleSet: function(value) {
      this.socket.emit('rt.title', value);
    },
    onVoteSet: function(value) {
      this.socket.emit('rt.vote', value);
    },
    onVoteDisplay: function() {
      this.socket.emit('rt.vote:display');
    },
    onVoteClear: function() {
      this.socket.emit('rt.vote:clear');
    },
    updateMemberVote: function(data) {
      model = this.collection.find({id: data.id});
      model.set('vote', data.vote);
    },
    onSocketMessage: function(title, message) {
      switch(title) {
        case 'title:update':
          this.model.set('title', message);
        case 'users:remove':
          this.collection.remove(message);
          break;
        case 'users:add':
          this.collection.add(message);
          break;
        case 'users:list':
          this.collection.add(message);
          break;
        case 'vote:update':
          this.updateMemberVote(message);
          break;
        case 'vote:display':
          App.vent.trigger('vote:display_votes', message);
          break;
      }
    }
  });

  return View;
})();
