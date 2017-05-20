describe('Login Screen', function() {
  beforeEach(function() {
    if (/\#roomname/.test(window.location.href) == false) {
      window.location.href = window.location.href + '#roomname';
    }
    this.view = new App.LoginScreen();
    $('body').append( this.view.render().el );
  });

  afterEach(function(done) {
    this.view.remove();
    setTimeout(done, 100);
  });

  it('renders prompt', function() {
    expect($('.credentials').length).toEqual(1);
  });

  it('has a login window', function() {
    expect($('.credentials input#name').length).toEqual(1);
    expect($('.credentials select#user_type').length).toEqual(1);
  });

  describe('Event Listeners', function() {
    it('submits a form when data entered', function(done) {
      this.view.listenTo(App.vent, 'user:login', function(name, type) {
        expect(name).toEqual('some user name');
        expect(type).toEqual('voter');
        done();
      });

      $('#name').val('some user name');
      $('#user_type').val('voter');
      $('form').submit();
    });

    it('alerts if creds are not filled', function() {
      spyOn(window, 'alert');
      $('form').submit();
      expect(window.alert).toHaveBeenCalledWith('You need a call sign.');
    });
  });

  describe('Authentication', function() {
    it('submits a login event to sockets', function() {
      $('#name').val('some user name');
      $('#user_type').val('voter');
      $('form').submit();
      expect(this.socket.emit)
        .toHaveBeenCalledWith('rt.user',
                              { username: 'some user name',
                                type: 'voter',
                                room: 'roomname'})
    });
  });
});
