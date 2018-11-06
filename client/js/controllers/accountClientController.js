angular.module('user').controller('accountController', ['$scope','userFactory', 
    function($scope, userFactory){
        
        // $scope.user = {};
        // $scope.user.name = JSON.stringify("john");
        // // $scope.getCurrentUserInfo = function(){
        // //     userFactory.getCurrentUser().then(function(res,err){

        // //     })
        // // }
        // $scope.user = {};
        console.log('hi')

        userFactory.getAllUsers().then(function(res){
            console.log('response data is ' + JSON.stringify(res.data));
            $scope.user = res.data;
            console.log('$scope.user is ' + JSON.stringify($scope.user));
        }, function(error) {
            console.log('Unable to retrieve users:', error);
        });

        // $scope.getCurrentUserInfo = function(_id){
        //     console.log('client controller id is ' + _id);
        //     userFactory.getCurrentUser(_id).then(function(res){
        //         // console.log('response data is ' + res.data)
        //         // console.log('sanity check')
        //         $scope.user = res.data;
        //     }, function(error) {
        //         console.log('Unable to retrieve current user:', error);
        //     });
        // }

        $scope.getCurrentUserInfo = function(username){
            console.log('client controller username is ' + username);
            // userFactory.getCurrentUser(_id).then(function(res){
            //     // console.log('response data is ' + res.data)
            //     // console.log('sanity check')
            //     $scope.user = res.data;
            // }, function(error) {
            //     console.log('Unable to retrieve current user:', error);
            // });
        }
        
        
        
        // $scope.update = function(){

        //     // $scope.user = this;
        //     // console.log($scope.user.updatedUser);

        //     // let user = $scope.user;
        //     // console.log(user.name);
        //     $scope.user = [];
        //     $scope.user.push($scope.updatedUser);

        //     userFactory.updateUser($scope.updatedUser).then(function(res,err){
        //         if(res.status !== 200)
        //         {
        //            console.log("\nunable to update user");
        //            $scope.errorMessage = "didn't update user";
        //         } 
        //         else if (res.status === 200)
        //         {
        //             console.log('update was success, front end');
        //             // return res.send('woohoo login done, front end');
        //             // res.redirect('../../../')
        //             window.location.replace('../html/userLanding.html');

        //         }
   
        //        $scope.updatedUser = {};
        //     })
        // }
    }

]);

