'use strict';

describe('Service: subs', function () {

  // load the service's module
  beforeEach(module('raticateApp'));

  // instantiate service
  var subs;
  beforeEach(inject(function (_subs_) {
    subs = _subs_;
  }));

  it('should do something', function () {
    expect(!!subs).toBe(true);
  });

});
