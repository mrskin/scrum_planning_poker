describe('App', function() {
  beforeEach(function(done) {
    if (/\#roomname/.test(window.location.href) == false) {
      window.location.href = window.location.href + '#roomname';
    }
    setTimeout(done, 100);
  });

  describe('Event Listeners', function() {
    it('emits on user:login', function(done) {
      App.vent.trigger('user:login', 'user', 'type');
      setTimeout(function() {
        expect(this.socket.emit)
          .toHaveBeenCalledWith('rt.user',
                                { username: 'user',
                                  type: 'type',
                                  room: 'roomname'});
        done();
      }.bind(this), 600);
    });

    it('emits on title:changed', function(done) {
      App.vent.trigger('title:changed', 'value');
      setTimeout(function() {
        expect(this.socket.emit)
          .toHaveBeenCalledWith('rt.title', 'value');
        done();
      }.bind(this), 600);
    });

    it('emits on vote:selected', function(done) {
      App.vent.trigger('vote:selected', '1');
      setTimeout(function() {
        expect(this.socket.emit)
          .toHaveBeenCalledWith('rt.vote', '1');
        done();
      }.bind(this), 600);
    });
  });
});
