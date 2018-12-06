angular.module('ufxApp').controller('adminController', ['$scope','userFactory', 'itemFactory',
    function($scope, userFactory, itemFactory){

      userFactory.getAllUser().then(function(response) {
        // console.log('response data is ' + JSON.stringify(response.data));
        $scope.users = response.data;
        var users = $scope.users;
        // $scope.users = users.filter(user => user.banned == 1);
        console.log($scope.users);
      
        // console.log("Check1");

      }, function(error) {
        console.log('Unable to retrieve selling items:', error);
      });

      itemFactory.getSelling().then(function(response) {
        // console.log('response data is ' + JSON.stringify(response.data));
        $scope.sellingItems = response.data;

        console.log($scope.sellingItems);

      }, function(error) {
        console.log('Unable to retrieve selling items:', error);
      });

      itemFactory.getBuying().then(function(response) {
        // console.log('response data is ' + JSON.stringify(response.data));
        $scope.buyingItems = response.data;
        console.log($scope.buyingItems);

        // console.log("Check1");
      }, function(error) {
        console.log('Unable to retrieve buying items:', error);
      });


      $scope.deleteUser = function(index) {
       
        var userId = $scope.users[index]._id;
        $scope.users.splice(index,1);

        console.log('in delete user ')
        userFactory.deleteUser(userId).then(function(response){
            console.log("Success");

          }, function(error) {
            console.log('Unable to retrieve users:', error);
          });

        };

      $scope.deleteSellingItem = function(index) {
        /**TODO
          Delete the article using the Listings factory. If the removal is successful,
      navigate back to 'listing.list'. Otherwise, display the error.
          */
         console.log('delete selling')
        var listingId = $scope.sellingItems[index]._id;
        $scope.sellingItems.splice(index,1);

        itemFactory.deleteSelling(listingId).then(function(response)
        {

          console.log("Success");
          window.location.reload();


        }, function(error) {
          console.log('Unable to retrieve selling items:', error);
        });

      };

      $scope.deleteBuyingItem = function(index) {
        /**TODO
          Delete the article using the Listings factory. If the removal is successful,
      navigate back to 'listing.list'. Otherwise, display the error.
          */
        var listingId = $scope.buyingItems[index]._id;
        $scope.buyingItems.splice(index,1);

        itemFactory.deleteBuying(listingId).then(function(response)
        {

          console.log("Success");

          window.location.reload();

        }, function(error) {
          console.log('Unable to retrieve selling items:', error);
        });

      };


      }
    ]);
