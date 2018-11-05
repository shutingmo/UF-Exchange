angular.module('user').controller('accountController', ['$scope','userFactory', 
    function($scope, userFactory){
        
        // $scope.user = {};
        // $scope.user.name = JSON.stringify("john");
        // // $scope.getCurrentUserInfo = function(){
        // //     userFactory.getCurrentUser().then(function(res,err){

        // //     })
        // // }
        $scope.user = {};
        
        userFactory.getCurrentUser().then(function(res){
            $scope.user = res.data;
        })
        
    }

]);

