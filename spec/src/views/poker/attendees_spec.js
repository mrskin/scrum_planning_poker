describe('Attendee List', function() {
  beforeEach(function() {
    this.collection = new App.UsersCollection();
    this.collection.add([
      {id: 1, type: 'voter', username: 'Bravo'},
      {id: 2, type: 'voter', username: 'Alpha'},
      {id: 30, type: 'voter', username: 'Echo'},
      {id: 40, type: 'observer', username: 'Bravo'},
      {id: 50, type: 'observer', username: 'Alpha'}
    ]);

    this.view = new App.AttendeesView({collection: this.collection});
    $('body').append( this.view.render().el );
  });

  afterEach(function() {
    this.view.remove();
  });

  it('renders some awesome people', function() {
    expect($('ul.list-group li').length).toEqual(5);
  });

  it('renders 2 observers', function() {
    expect($('ul.list-group li.observer').length).toEqual(2);
  });

  it('renders 3 voters', function() {
    expect($('ul.list-group li.voter').length).toEqual(3);
  });

  describe('when voting', function() {
    it('hides display when missing a vote', function() {
      this.collection.get(1).set('vote', '1');
      this.collection.get(2).set('vote', '1');
      expect($('ul.list-group li.voter .fa.fa-check').length).toEqual(2);
      expect($('ul.list-group li.voter .fa.fa-commenting-o').length).toEqual(1);
    });

    it('shows results when all voters voted', function() {
      this.collection.get(1).set('vote', '1');
      this.collection.get(2).set('vote', '1');
      this.collection.get(30).set('vote', '1');
      expect($('ul.list-group li.voter .fa.fa-check').length).toEqual(0);
      expect($('ul.list-group li.voter .vote').length).toEqual(3);
    });
  });

  describe('on collection events', function() {
    it('adds a user to list', function() {
      this.collection.add({id: 60, type: 'voter', username: 'Hello'});
      expect($('ul.list-group li.voter').length).toEqual(4);
    });

    it('removes a user from list', function() {
      this.collection.remove(1);
      expect($('ul.list-group li.voter').length).toEqual(2);
    });

    it('waits for any resets', function() {
      this.collection.reset();
      expect($('ul.list-group li').length).toEqual(0);
    });
  });
});
