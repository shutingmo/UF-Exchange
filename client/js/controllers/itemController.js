angular.module('items').controller('ItemController', ['$scope', 'Items', 
  function($scope, Items) {
    /* Get all the items, then bind it to the scope */

    Items.getAll().then(function(response) {
      $scope.items = response.data;
    }, function(error) {
      console.log('Unable to retrieve items:', error);
    });

    Items.getSelling().then(function(response) {
      $scope.items = response.data;
    }, function(error) {
      console.log('Unable to retrieve selling items:', error);
    });

    $scope.setCondition = function(condition) {
      //setting the location from dropdown
      $scope.newItem.condition = condition;
      $scope.items.push($scope.newItem.condition);
    }

    $scope.setLocation = function(location) {
      //setting the location from dropdown
      $scope.newItem.location = location;
      $scope.items.push($scope.newItem.location);
    }

    $scope.saveBuying = function() {
      $scope.items.push($scope.newItem);

      Items.createBuying($scope.newItem).then(function(err)
      {
        if(err)
        {
          $scope.errorMessage = "Error. Listing not successfully added";
          console.log('Unable to add listing', err);
        }

        $scope.newItem = {};
        
      });
    };

    $scope.saveSelling = function() {
      $scope.items.push($scope.newItem);

      Items.createSelling($scope.newItem).then(function(err)
      {
        if(err)
        {
          $scope.errorMessage = "Error. Listing not successfully added";
          console.log('Unable to add listing', err);
        }
        
        $scope.newItem = {};

      });
    };

  }
]);

