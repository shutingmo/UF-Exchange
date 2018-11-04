angular.module('user', []).factory('userFactory', function($http) {
    
    var userFactoryMethods = {};

    userFactoryMethods.getCurrentUser = function() {
        return $http.get('http://localhost:8080/user');
    },

    userFactoryMethods.updateUser = function(user) {
        return $http.put('http://localhost:8080/user' + user._id, user);
    },
      
    userFactoryMethods.createUser = function(user) {
        return $http.post('http://localhost:8080/user', user);
    }, 

    userFactoryMethods.deleteUser = function(_id) {
        return $http.delete('http://localhost:8080/user', _id);
    }
  
    return userFactoryMethods;

    
  });
  