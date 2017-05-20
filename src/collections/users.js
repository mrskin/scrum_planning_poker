App.UsersCollection = Backbone.Collection.extend({
  url: null,
  model: App.UserModel,
  displayVotes: function() {
    var display = true;
    _.each(this.models, function(model) {
      if (model.get('type') == 'voter' && !model.get('vote')) {
        display = false;
      }
    });
    return display;
  },
  comparator: function(a, b) {
    var buff1 = a.get('type') == 'observer' ? 10 : 0;
    var buff2 = b.get('type') == 'observer' ? 10 : 0;
    var value1 = a.get('username').toString().toLowerCase();
    var value2 = b.get('username').toString().toLowerCase();
    var sortValue = value1 > value2 ? 1 : -1;
    return sortValue - (buff1 - buff2);
  },
  sync: function() { return false; }
});
