angular.module('listings').controller('ItemController', ['$scope', 'Listings', 
  function($scope, Listings) {
    /* Get all the listings, then bind it to the scope */

    Listings.getAll().then(function(response) {
      $scope.listings = response.data;
    }, function(error) {
      console.log('Unable to retrieve listings:', error);
    });

    Listings.getSelling().then(function(response) {
      $scope.listings = response.data;
    }, function(error) {
      console.log('Unable to retrieve selling listings:', error);
    });

    $scope.setCondition = function(condition) {
      //setting the location from dropdown
      $scope.newListing.condition = condition;
      $scope.listings.push($scope.newListing.condition);
    }

    $scope.setLocation = function(location) {
      //setting the location from dropdown
      $scope.newListing.location = location;
      $scope.listings.push($scope.newListing.location);
    }

    $scope.saveBuying = function() {
      $scope.listings.push($scope.newListing);

      Listings.createBuying($scope.newListing).then(function(err)
      {
        if(err)
        {
          $scope.errorMessage = "Error. Listing not successfully added";
          console.log('Unable to add listing', err);
        }

        $scope.newListing = {};
        
      });
    };

    $scope.saveSelling = function() {
      $scope.listings.push($scope.newListing);

      Listings.createSelling($scope.newListing).then(function(err)
      {
        if(err)
        {
          $scope.errorMessage = "Error. Listing not successfully added";
          console.log('Unable to add listing', err);
        }
        
        $scope.newListing = {};

      });
    };

  }
]);

