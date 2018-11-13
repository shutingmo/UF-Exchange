// angular.module('user', []).factory('userFactory', function($http) {
    
//     var userFactoryMethods = {};

//     // userFactoryMethods.getAllUsers() = function(){
//     //     return $http.get('http://localhost:8080/user');
//     // },
//     // userFactoryMethods.getCurrentUser = function() {
//     //     return $http.get('http://localhost:8080/user');
//     // },

//     // userFactoryMethods.updateUser = function(user) {
//     //     return $http.put('http://localhost:8080/user' + user._id, user);
//     // },
      
//     userFactoryMethods.signupUser = function(user) {
//         return $http.post('http://localhost:3000/user/signup', user);
//     } 

//     // userFactoryMethods.deleteUser = function(_id) {
//     //     return $http.delete('http://localhost:8080/user', _id);
//     // }
  
//     return userFactoryMethods;

    
//   });
  
angular.module('user', []).factory('userFactory', function($http) {
    var userFactoryMethods = {
        signupUser: function(user){
            return $http.post('http://localhost:3000/signup', user);
        },

        loginUser: function(returnUser){
            console.log('in user factory ' + JSON.stringify(returnUser))

            return $http.post('http://localhost:3000/login/auth', returnUser);
        },

        // getAllUsers: function(){
        //     return $http.get('http://localhost:3000/account/getinfo');
        // },

        // getCurrentUser: function(_id){
        //     console.log('in fac id is ' + _id)
        //     return $http.get('http://localhost:3000/account/getinfo/:_id', _id);

        // },

        getCurrentUser: function(){
            console.log('in fac id')
            return $http.get('http://localhost:3000/account/getinfo');

        },

        updateUser: function(updatedUser){
            return $http.post('http://localhost:3000/account/update', updatedUser);
        }

        

    };

    return userFactoryMethods;

    
  });
  