describe('UserModel', function() {
  beforeEach(function() {
    this.model = new App.UserModel({username: 'Hello', type: 'voter'});
  });

  it('can not sync', function() {
    expect(this.model.fetch()).toEqual(false);
  });

  it('can not save', function() {
    expect(this.model.save()).toEqual(false);
  });

  it('can not destroy', function() {
    expect(this.model.destroy()).toEqual(false);
  });
});
