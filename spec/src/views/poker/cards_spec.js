describe('Poker Cards', function() {
  beforeEach(function() {
    this.view = new App.PokerCardsView();
    $('body').append( this.view.render().el );
  });

  afterEach(function() {
    this.view.remove();
  });

  it('renders 13 cards', function() {
    expect($('a.card').length).toEqual(13);
  });

  describe('when card clicked', function() {
    it('triggers an event', function(done) {
      this.view.listenTo(App.vent, 'vote:selected', function(vote) {
        expect(vote).toEqual('.5');
        done();
      });

      $('a.card[data-value=".5"]').click();
    });

    it('adds a selected class', function(done) {
      this.view.listenTo(App.vent, 'vote:selected', function(vote) {
        expect(vote).toEqual('.5');
        expect($('a.card[data-value=".5"]').hasClass('selected'))
          .toBeTruthy();
        done();
      });

      $('a.card[data-value=".5"]').click();
    });
  });
});
