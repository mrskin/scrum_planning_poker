describe('Main App Builder', function() {
  beforeEach(function(done) {
    if (/\#roomname/.test(window.location.href) == false) {
      window.location.href = window.location.href + '#roomname';
    }
    this.collection = new App.UsersCollection();
    this.model = new App.StoryModel();
    this.view = new App.MainView({
      model: this.model,
      collection: this.collection,
      socket: this.socket
    });
    $('body').append( this.view.render().el );
    setTimeout(done, 100);
  });

  afterEach(function(done) {
    this.view.remove();
    delete this.collection;
    delete this.model.collection;
    setTimeout(done, 100);
  });

  describe('Poker Screen', function() {
    it('renders the poker view', function() {
      expect(this.view.subViews['screen'] instanceof App.PokerView)
        .toBeTruthy();
    });
  });

  describe('Socket Message Events', function() {
    it('updates title when title:update', function() {
      this.view.onSocketMessage('title:update', 'hello');
      expect(this.model.get('title')).toEqual('hello');
    });

    it('removes a user by id', function() {
      this.collection.add({id: 22, username: 'hello!'});
      this.collection.add({id: 10, username: 'hi!'});
      this.view.onSocketMessage('users:remove', 10);
      expect(this.collection.length).toEqual(1);
      expect(this.collection.find({id: 22})).toBeDefined();
    });

    it('can add a user', function() {
      this.collection.add({id: 22, username: 'hello!'});
      this.view.onSocketMessage('users:add', {id: 11, username: 'num2'});
      expect(this.collection.length).toEqual(2);
      expect(this.collection.find({id: 11})).toBeDefined();
    });

    it('will not add a duplicate user', function() {
      this.collection.add({id: 22, username: 'hello!'});
      this.view.onSocketMessage('users:add', {id: 22, username: 'num2'});
      expect(this.collection.length).toEqual(1);
      expect(this.collection.find({id: 22})).toBeDefined();
    });

    it('will add users with an array', function() {
      this.collection.add({id: 22, username: 'hello!'});
      this.view.onSocketMessage('users:list', [
        {id: 11, username: 'num2'},
        {id: 22, username: 'hello!'}
      ]);

      expect(this.collection.length).toEqual(2);
      expect(this.collection.find({id: 11})).toBeDefined();
      expect(this.collection.find({id: 22})).toBeDefined();
    });

    it('updates user voting', function() {
      this.collection.add({id: 6, username: 'hello!'});
      this.collection.add({id: 22, username: 'hello!'});
      this.view.onSocketMessage('vote:update', {
        id: 22,
        vote: 10
      });

      expect(this.collection.find({id: 22}).get('vote')).toEqual(10);
      expect(this.collection.find({id: 6}).get('vote')).toBeUndefined();
    });
  });
});
