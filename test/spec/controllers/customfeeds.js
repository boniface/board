'use strict';

describe('Controller: CustomfeedsCtrl', function () {

  // load the controller's module
  beforeEach(module('boardApp'));

  var CustomfeedsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CustomfeedsCtrl = $controller('CustomfeedsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
