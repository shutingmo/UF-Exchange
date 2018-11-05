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
            return $http.post('http://localhost:3000/signup', user)
        },

        // loginUser: function(user){
        //     var u = JSON.stringify(user)
        //     console.log('in user factory '+ u)

        //     return $http.get('http://localhost:3000/login', user)
        // }
        loginUser: function(returnUser){
            console.log('in user factory ' + JSON.stringify(returnUser))

            return $http.post('http://localhost:3000/login/auth', returnUser)
        }

        // loginUser: function(){
        //     console.log('in user factory ')

        //     return $http.get('http://localhost:3000/login/auth')
        //     // return $http({
        //     //     url: 'http://localhost:3000/login/auth',
        //     //     method: "GET",
        //     //     params: {
        //     //         // username: $scope.returnUser.username,
        //     //         // password: $scope.returnUser.password
        //     //         user:$scope.returnUser
        //     //     }
        //     // })
        // }

    };

    return userFactoryMethods;

    
  });
  