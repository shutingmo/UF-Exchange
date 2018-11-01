angular.module('listings', []).factory('Listings', function($http) {
    var methods = {
      getAll: function() {
        return $http.get('http://localhost:8080/buying');
      },
      
      createBuying: function(listing) {
        return $http.post('http://localhost:8080/buying', listing);
      }, 

      getSelling: function() {
        return $http.get('http://localhost:8080/selling');
      },

      createSelling: function(listing) {
        return $http.post('http://localhost:8080/selling', listing);
      },

    };
  
    return methods;
  });
  