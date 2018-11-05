angular.module('user').controller('loginController', ['$scope','userFactory', 
    function($scope, userFactory){
        
        $scope.login = function(){
            $scope.user = [];
            $scope.user.push($scope.returnUser);
            console.log(JSON.stringify($scope.returnUser));
            // userFactory.loginUser($scope.returnUser).then(function(res,err){
            //     console.log('in client controller');

            //     if(res.status !== 200)
            //     {
            //        console.log("\nunable to create user");
            //        $scope.errorMessage = "didn't create user";
            //     } 

            //     $scope.returnUser = {};
            // })

            userFactory.loginUser($scope.returnUser).then(function(res,err){
                console.log('in client controller');

                if(res.status !== 200)
                {
                   console.log("\nunable to create user");
                   $scope.errorMessage = "didn't create user";
                } 

                $scope.returnUser = {};
            })
        }
    }

]);

