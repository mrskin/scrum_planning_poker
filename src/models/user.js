App.UserModel = Backbone.Model.extend({
  defaults: {
    id: null,
    type: null,
    username: null
  },
  url: null,
  sync: function() { return false; }
});
