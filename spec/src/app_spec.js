describe('App', function() {
  beforeEach(function(done) {
    $(document).ready(done);
  });

  describe('Event Listeners', function() {
    it('emits on user:login', function(done) {
      App.vent.trigger('user:login', 'user', 'type');
      setTimeout(function() {
        expect(this.socket.emit)
          .toHaveBeenCalledWith('rt.user',
                                { username: 'user',
                                  type: 'type'});
        done();
      }.bind(this), 600);
    });

    it('emits on title:changed', function() {
      App.vent.trigger('title:changed', 'value');
      setTimeout(function() {
        expect(this.socket.emit)
          .toHaveBeenCalledWith('rt.title', 'value');
        done();
      }.bind(this), 600);
    });

    it('emits on vote:selected', function() {
      App.vent.trigger('vote:selected', '1');
      setTimeout(function() {
        expect(this.socket.emit)
          .toHaveBeenCalledWith('rt.vote', '1');
        done();
      }.bind(this), 600);
    });
  });
});
