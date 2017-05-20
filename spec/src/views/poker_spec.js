describe('Poker View', function() {
  beforeEach(function() {
    this.collection = new App.UsersCollection();
    this.collection.add([
      {id: 1, type: 'voter', username: 'Bravo'},
      {id: 2, type: 'voter', username: 'Alpha'},
      {id: 30, type: 'voter', username: 'Echo'},
      {id: 40, type: 'observer', username: 'Bravo'},
      {id: 50, type: 'observer', username: 'Alpha'}
    ]);
    this.model = new App.StoryModel({title: 'starting'});
    this.view = new App.PokerView({collection: this.collection, model: this.model});
    $('body').append( this.view.render().el );
  });

  afterEach(function() {
    this.view.remove();
  });

  describe('Attendees', function() {
    it('renders Attendees', function() {
      expect($('.attendees > *').length).toEqual(1);
    });

    it('uses attendees view', function() {
      expect(this.view.subViews.attendees instanceof App.AttendeesView)
        .toBeTruthy();
    });
  });

  it('renders cards', function() {
    expect($('.playing-cards a.card').length).toEqual(13);
  });

  describe('Story Title', function() {
    it('has a title field', function() {
      expect($('input#title').val()).toEqual('starting');
    });

    it('updates the title when the model changes', function() {
      this.model.set('title', 'world!!!');
      expect($('input#title').val()).toEqual('world!!!');
    });

    it('triggers an app event when keyup', function(done) {
      this.view.listenTo(App.vent, 'title:changed', function(title) {
        expect(title).toEqual('what.');
        done()
      });

      $('input#title').val('what.')
                      .change()
                      .keyup();
    });
  });

  describe('Card Selection', function() {
    it('triggers app event', function(done) {
      this.view.listenTo(App.vent, 'vote:selected', function(vote) {
        expect(vote).toEqual('.5');
        expect($('.card[data-value=".5"]').hasClass('selected'))
          .toBeTruthy()
        done()
      });

      $('.card[data-value=".5"]').click();
    });
  });
});
