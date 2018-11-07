angular.module('user').controller('accountController', ['$scope','userFactory', 
    function($scope, userFactory){
        
        console.log('hi')
        
        // var vm = this;
        // vm.user = null;
        // vm.getCurrentUserInfo = getCurrentUserInfo;

        userFactory.getAllUsers().then(function(res){
            console.log('response data is ' + JSON.stringify(res.data));
            $scope.user = res.data;
            console.log('$scope.user is ' + JSON.stringify($scope.user));
            console.log(JSON.stringify($scope.user[0]._id));
            console.log(JSON.stringify($scope.user[1].username));
            // console.log($scope.user.filter(use => use.username === '1')[0])
            // return $scope.user.filter(use => use.username === '1')[0];
            // console.log($scope.user.filter(use => use._id === '5be0d14dda0b18153ab0fc56')[0])
            // $scope.user.filter(use => use._id === '5be0d14dda0b18153ab0fc56')[0];

            console.log($scope.user.filter(user => user.username === $scope.user[0].username))
            
            var person = $scope.user.filter(user => user.username === $scope.user[0].username);
            // $scope.user.filter(use => use._id === '5be0d14dda0b18153ab0fc56')[0];

            // return $scope.user.filter(use => use._id === '1')[0];

            
            // $scope.user.filter(x => x.id === '5be0d14dda0b18153ab0fc56');
            console.log(JSON.stringify(person[0]._id));

            // $scope.user._id = $scope.user.filter(user => user._id === $scope.user[0]._id);

            $scope.user._id = person[0]._id;
            $scope.user.username = person[0].username;
            $scope.user.email = person[0].email;

            // console.log(JSON.stringify($scope.user._id));
            // return $scope.use._id;

        }, function(error) {
            console.log('Unable to retrieve users:', error);
        }, function(){
            console.log($scope.user.filter(use => use.username === '1')[0])
            return $scope.user.filter(use => use.username === '1')[0];
        });

        $scope.getCurrentUserInfo = function(index){
            // console.log('client controller id is ' + _id);
            // userFactory.getCurrentUser(_id).then(function(res){
            //     // console.log('response data is ' + res.data)
            //     // console.log('sanity check')
            //     $scope.user = res.data;
            // }, function(error) {
            //     console.log('Unable to retrieve current user:', error);
            // });
            var person = $scope.user.filter(user => user.username === $scope.user[index].username);
            $scope.user._id = person[index]._id;

        }

        

        // function getCurrentUserInfo() {
        //     console.log('yoo');
        //     userFactory.getAllUsers().then(function(res){
        //         // console.log('response data is ' + JSON.stringify(res.data));
        //         // $scope.user = res.data;
        //         // console.log('$scope.user is ' + JSON.stringify($scope.user));
        //         // console.log(JSON.stringify($scope.user[0]._id));
        //         // console.log(JSON.stringify($scope.user[1].username));
                
        //         // console.log($scope.user.filter(user => user.username === $scope.user[0].username))
                
        //         // var person = $scope.user.filter(user => user.username === $scope.user[0].username);


        //         // console.log(JSON.stringify(person[0]._id));
    
        //         // // $scope.user._id = $scope.user.filter(user => user._id === $scope.user[0]._id);
    
        //         // $scope.user._id = person[0]._id;
        //         // $scope.user.username = person[0].username;
        //         // $scope.user.email = person[0].email;
        //         $scope.user = res.data;

        //         var person = $scope.user.filter(user => user.username === $scope.user[0].username);

        //         vm.user = person;
        //         console.log(JSON.stringify(vm.user));
        //     })
        // }
            // console.log('client controller id is ' + _id);
            // userFactory.getCurrentUser(_id).then(function(res){
            //     // console.log('response data is ' + res.data)
            //     // console.log('sanity check')
            //     $scope.user = res.data;
            // }, function(error) {
            //     console.log('Unable to retrieve current user:', error);
            // });
            // var person = $scope.user.filter(user => user.username === $scope.user[index].username);
            // $scope.user._id = person[index]._id;

            

        


        
        // userFactory.getAllUsers(index).then(function(res){
        //     console.log('response data is ' + JSON.stringify(res.data));
        //     $scope.user = res.data;
        //     console.log('$scope.user is ' + JSON.stringify($scope.user));
        //     console.log(JSON.stringify($scope.user[0]._id));
        //     console.log(JSON.stringify($scope.user[1].username));
        //     // console.log($scope.user.filter(use => use.username === '1')[0])
        //     // return $scope.user.filter(use => use.username === '1')[0];
        //     // console.log($scope.user.filter(use => use._id === '5be0d14dda0b18153ab0fc56')[0])
        //     // $scope.user.filter(use => use._id === '5be0d14dda0b18153ab0fc56')[0];

        //     console.log($scope.user.filter(user => user.username === $scope.user[index].username))
            
        //     var person = $scope.user.filter(user => user.username === $scope.user[index].username);
        //     // $scope.user.filter(use => use._id === '5be0d14dda0b18153ab0fc56')[0];

        //     // return $scope.user.filter(use => use._id === '1')[0];

            
        //     // $scope.user.filter(x => x.id === '5be0d14dda0b18153ab0fc56');
        //     console.log(JSON.stringify(person[index]._id));

        //     // $scope.user._id = $scope.user.filter(user => user._id === $scope.user[0]._id);

        //     $scope.user._id = person[index]._id;
        //     $scope.user.username = person[index].username;
        //     $scope.user.email = person[index].email;

        //     // console.log(JSON.stringify($scope.user._id));
        //     // return $scope.use._id;

        // }, function(error) {
        //     console.log('Unable to retrieve users:', error);
        // }, function(){
        //     console.log($scope.user.filter(use => use.username === '1')[0])
        //     return $scope.user.filter(use => use.username === '1')[0];
        // });
        

        // $scope.getCurrentUserInfo = function(username){
        //     console.log('client controller username is ' + username);
        //     // userFactory.getCurrentUser(_id).then(function(res){
        //     //     // console.log('response data is ' + res.data)
        //     //     // console.log('sanity check')
        //     //     $scope.user = res.data;
        //     // }, function(error) {
        //     //     console.log('Unable to retrieve current user:', error);
        //     // });
        // }
        
        
        
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

