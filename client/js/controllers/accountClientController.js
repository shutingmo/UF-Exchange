angular.module('user').controller('accountController', ['$scope','userFactory', 
    function($scope, userFactory){

        userFactory.getCurrentUser().then(function(user){
            console.log('client controller get cur user')
            console.log(JSON.stringify(user.data))
            var currUser = user.data;
            $scope.user = currUser;
        
            console.log('Hi ' + JSON.stringify(currUser.name) + '!');
        }, function(error){
            console.log('unable to get current user ', error)
        })

        $scope.update = function(){
            console.log('front end update user')
            userFactory.updateUser($scope.updatedUser).then(function(res,err){
                if(res.status !== 200)
                {
                    console.log("\nunable to update user");

                    $scope.errorMessage = "didn't update user";
                } 
                else if (res.status === 200)
                {
                    console.log('update was success, front end');
                    
                    window.location.replace('../html/userLanding.html');

                }
    
                $scope.updatedUser = {};
            })
        }

        $scope.logout = function() {
            console.log('logging you out...');
            userFactory.logout().then(function(err) {
                if (err.status === 200)
                    window.location.replace('../html/homeLanding.html');
                else
                    console.log('couldn\'t log you out', err);
            })
        };

        $scope.delete = function() {
            console.log('logging you out...');

            if (confirm("Are you sure you want to delete your account?")) {

                userFactory.delete().then(function(err) {
                    if (err.status === 200)
                        window.location.replace('../html/homeLanding.html');
                    else
                        console.log('couldn\'t delete your account', err);
                })

            } else {
                
            }   
            
        };
    }


]);

