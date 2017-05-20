describe('Users Collection', function() {
  beforeEach(function() {
    this.collection = new App.UsersCollection();
  });

  it('is a Backbone.Collection', function() {
    expect(this.collection instanceof Backbone.Collection).toBeTruthy();
  });

  it('makes User Models', function() {
    this.collection.add({id: 10, type: 'voter'});
    expect(this.collection.models[0] instanceof App.UserModel).toEqual(true);
  });

  it('orders the models properly', function() {
    this.collection.add([
      {id: 1, type: 'voter', username: 'Bravo'},
      {id: 2, type: 'voter', username: 'Alpha'},
      {id: 30, type: 'voter', username: 'Echo'},
      {id: 40, type: 'observer', username: 'Bravo'},
      {id: 50, type: 'observer', username: 'Alpha'}
    ]);

    expect(this.collection.models[0].get('username')).toEqual('Alpha');
    expect(this.collection.models[0].get('type')).toEqual('observer');
    expect(this.collection.models[1].get('username')).toEqual('Bravo');
    expect(this.collection.models[1].get('type')).toEqual('observer');
    expect(this.collection.models[2].get('username')).toEqual('Alpha');
    expect(this.collection.models[2].get('type')).toEqual('voter');
    expect(this.collection.models[3].get('username')).toEqual('Bravo');
    expect(this.collection.models[3].get('type')).toEqual('voter');
    expect(this.collection.models[4].get('username')).toEqual('Echo');
    expect(this.collection.models[4].get('type')).toEqual('voter');
  });

  it('can not sync', function() {
    expect(this.collection.fetch()).toEqual(false);
  });
});
