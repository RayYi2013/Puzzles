'use strict';

describe('Controller: NewuserCtrl', function () {

  // load the controller's module
  beforeEach(module('mflowApp'));

  var NewuserCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewuserCtrl = $controller('NewuserCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
