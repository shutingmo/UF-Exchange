angular.module('ufxApp').controller('adminController', ['$scope','userFactory', 'itemFactory',
    function($scope, userFactory, itemFactory){

      userFactory.getAllUser().then(function(response) {
        // console.log('response data is ' + JSON.stringify(response.data));
        $scope.users = response.data;
        console.log($scope.users);
        // console.log("Check1");

      }, function(error) {
        console.log('Unable to retrieve selling items:', error);
      });

      itemFactory.getSelling().then(function(response) {
        // console.log('response data is ' + JSON.stringify(response.data));
        $scope.items = response.data;
        console.log($scope.items);
        // console.log("Check1");

      }, function(error) {
        console.log('Unable to retrieve selling items:', error);
      });




      $scope.deleteUser = function(index) {
       /**TODO
          Delete the article using the Listings factory. If the removal is successful,
      navigate back to 'listing.list'. Otherwise, display the error.
         */
        var userId = $scope.users[index]._id;
        $scope.users.splice(index,1);

        userFactory.deleteUser(userId).then(function(err)
        {

          if (err)
          {
            $scope.errorMessage = "Error. Listing not deleted";
            console.log('Unable to delete listings', err);
          }
        });

        };

        $scope.deleteItem = function(index) {
         /**TODO
            Delete the article using the Listings factory. If the removal is successful,
        navigate back to 'listing.list'. Otherwise, display the error.
           */
          var listingId = $scope.items[index]._id;
          $scope.items.splice(index,1);

          itemFactory.delete(listingId).then(function(err)
          {

            if (err)
            {
              $scope.errorMessage = "Error. Listing not deleted";
              console.log('Unable to delete listings', err);
            }
          });

          // Listings.getAll().then(function(response) {
          //   $scope.listings = response.data;
          // }, function(error) {
          //   console.log('Unable to retrieve listings:', error);
          // });



        };



          // Listings.getAll().then(function(response) {
          //   $scope.listings = response.data;
          // }, function(error) {
          //   console.log('Unable to retrieve listings:', error);
          // });




      }
    ]);
