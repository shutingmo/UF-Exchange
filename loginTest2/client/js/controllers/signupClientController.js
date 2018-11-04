// var UserModel = require('../../server/models/userServerModel.js')

angular.module('user').controller('signupController', ['$scope','userFactory', signupControl]);


function signupControl($scope, userFactory){
    
    // userFactory.getAllUsers().then(function(res) {
    //     $scope.users = res.data;
    // }, function(error) {
    // console.log('Unable to retrieve listings:', error);
    // });    
      
    // $scope.signupUser = function(){
        
    //     $scope.users.push($scope.newUser);

    //     userFactory.createUser().then(function(err){
    //         if(err)
    //         {
    //             console.log("unable to create user");
    //             $scope.errorMessage = "didn't create user";
    //         }
    //     })
    // }

    $scope.signupUser = function(){
        
        // var newUser = UserModel();

        // newUser.name = $scope.newUser.name;
        // newUser.username = $scope.newUser.username;
        // newUser.email = $scope.newUser.email;
        // newUser.password = $scope.newUser.password;

        UserModel.signupUser($scope.newUser).then(function(res, err){
            if(err)
            {
                console.log("unable to create user");
                $scope.errorMessage = "didn't create user";
            }

            $scope.newUser = {};
        })
    }

}