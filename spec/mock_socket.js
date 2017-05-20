var socketMock = {
  send: function() {},
  emit: function() {},
  on: function() {},
  off: function() {}
};
var ioStub = sinon.stub(io, 'connect')
                  .returns(socketMock);

beforeEach(function() {
  spyOn(socketMock, 'send');
  spyOn(socketMock, 'emit');
  spyOn(socketMock, 'on');

  this.socket = socketMock;
});

afterEach(function() {});
