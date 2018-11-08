angular.module('user').controller('signupController', ['$scope','userFactory', 
    function($scope, userFactory){

        $scope.signup = function(){
            $scope.user = [];

            $scope.user.push($scope.newUser);
            // console.log('inside create user')
   
            // console.log('new user is ' + newUser);
           
   
           userFactory.signupUser($scope.newUser).then(function(res, err){
            //    if(err)
            //    {
            //        console.log(err);
            //        console.log("\nunable to create user");
            //        $scope.errorMessage = "didn't create user";
            //    }
                if(res.status !== 200)
                {
                   console.log("\nunable to create user");
                   $scope.errorMessage = "didn't create user";
                } 
                else if (res.status === 200)
                {
                    console.log('signup was success, front end');
                    // return res.send('woohoo login done, front end');
                    // res.redirect('../../../')
                    window.location.replace('../html/login.html');

                }
   
               $scope.newUser = {};
           })
       }
    }

]);


