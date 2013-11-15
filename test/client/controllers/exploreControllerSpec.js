

describe('ExploreController', function() {
  beforeEach(module('explore'));
  var $httpBackend, $rootScope, createController;
 
   beforeEach(inject(function($injector) {
     $httpBackend = $injector.get('$httpBackend');
     $rootScope = $injector.get('$rootScope');
     var $controller = $injector.get('$controller');
 
     createController = function() {
       return $controller('ExploreController', {'$scope' : $rootScope });
     };
   }));
 
   afterEach(function() { 
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
   });

 
    it('should fetch the named url which will be encoded', inject(function($controller) {
      var controller = createController();
      $rootScope.dataUrl = "http://eeek-wow.com?data=peanuts&endpoint=342";
 	  $httpBackend.expectGET('data/' + encodeURIComponent('http://eeek-wow.com?data=peanuts&endpoint=342')).respond(200,'');
 	  $rootScope.fetch();
 	  $httpBackend.flush();
    }));

});