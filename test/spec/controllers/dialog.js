'use strict';

describe('Controller: DialogctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('raticateApp'));

  var DialogctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DialogctrlCtrl = $controller('DialogctrlCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DialogctrlCtrl.awesomeThings.length).toBe(3);
  });
});
