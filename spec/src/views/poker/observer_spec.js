describe('Observer View', function() {
  beforeEach(function() {
    this.collection = new App.UsersCollection();
    this.view = new App.PokerObserverView({collection: this.collection});
    $('body').append( this.view.render().el );
  });

  afterEach(function() {
    this.view.remove();
  });

  it('renders an alert if no users', function() {
    expect($('#observerView .alert.alert-warning').length)
      .toEqual(1);
  });

  it('renders an alert if voting not done', function() {
    this.collection.add({id: 10, type: 'voter', username: 'alpha'});
    expect($('#observerView .alert.alert-info').length)
      .toEqual(1);
  });

  it('renders an alert if voting is all done', function() {
    this.collection.add({id: 10, type: 'voter', username: 'alpha', vote: '.5'});
    expect($('#observerView .alert.alert-success').length)
      .toEqual(1);
  });
});
