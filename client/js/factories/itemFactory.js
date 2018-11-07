angular.module('items', []).factory('Items', function($http) {
    var methods = {
      getAll: function() {
        return $http.get('http://localhost:3000/buying');
      },
      
      createBuying: function(listing) {
        return $http.post('http://localhost:3000/buying', listing);
      }, 

      getSelling: function() {
        return $http.get('http://localhost:3000/selling');
      },

      createSelling: function(listing) {
        return $http.post('http://localhost:3000/selling', listing);
      },

    };
  
    return methods;
  });
  