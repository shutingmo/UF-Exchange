angular.module('user').controller('accountController', ['$scope','userFactory',
    function($scope, userFactory){

    userFactory.getCurrentUser().then(function(user){
        console.log('client controller get cur user')
        console.log(JSON.stringify(user.data))
        currUser = user.data;
        $scope.currentuser = currUser;

        console.log('Hi ' + JSON.stringify(currUser.name) + '!');
        console.log('scope current user' + JSON.stringify($scope.currentuser) + '!');

        getUserFavs()

        // getUserOrders()
    }, function(error){
        console.log('unable to get current user ', error)
    })

    // $scope.favs = [];

    function getUserFavs(){
        console.log('fe get user favs')
        userFactory.getUserFavorites().then(function(res){
            console.log('get user favs fe is '+JSON.stringify(res.data.favorite))
            // $scope.favs.push(res.data.favorite);
            $scope.favs = res.data.favorite

            console.log($scope.favs)

            console.log('get user orders fe is '+JSON.stringify(res.data.orders))
            $scope.userOrders = res.data.orders
            console.log($scope.userOrders)

        }, function(err){
            console.log('unable to get user my orders ', error)
        })
    }

    function getUserOrders(){
        console.log('fe get user orders')
        userFactory.getUserOrders().then(function(res){
            console.log('get user orders fe is '+JSON.stringify(res.data.orders))

            $scope.myOrders = res.data.orders
        })
    }

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
                    window.location.replace('../html/index.html');
                else
                    console.log('couldn\'t delete your account', err);
            })

        } else {

        }

    };

    $scope.getCurrentItem = function(items){
        var itemId = items._id;
        console.log(items);
        sessionStorage.setItem('selected', itemId);
      }
    },


]);
