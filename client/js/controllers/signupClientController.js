angular.module('user').controller('signupController', ['$scope','userFactory', 
    function($scope, userFactory){

        $scope.signup = function(){
            $scope.user = [];

            $scope.user.push($scope.newUser);
        
           userFactory.signupUser($scope.newUser).then(function(res, err){
       
                if(res.status !== 200)
                {
                   console.log("\nunable to create user");
                   $scope.errorMessage = "didn't create user";
                } 
                else if (res.status === 200)
                {
                    console.log('signup was success, front end');
                  
                    window.location.replace('../html/login.html');
                }
               $scope.newUser = {};
           })
       }
    }

]);


