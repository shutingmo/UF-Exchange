angular.module('items').controller('ItemController', ['$scope', 'itemFactory',
  function($scope, itemFactory) {
    /* Get all the items, then bind it to the scope */
    // Items.getAll().then(function(response) {
    //   $scope.items = response.data;
    //   //console.log($scope.items._id);
    // }, function(error) {
    //   console.log('Unable to retrieve items:', error);
    // })
    itemFactory.getSelling().then(function(response) {
      // console.log('response data is ' + JSON.stringify(response.data));
      $scope.items = response.data;
      // console.log('$scope.user is ' + JSON.stringify($scope.items[0]));
      // var listing = $scope.items.filter(items => items._id === $scope.items[0]._id);
      // $scope.items._id = listing[0]._id;
      // $scope.items.title = listing[0].title;
      // $scope.items.price = listing[0].price;
      // $scope.items.condition = listing[0].condition;
      // $scope.items.category = listing[0].category;
      // $scope.items.seller = listing[0].seller;
    }, function(error) {
      console.log('Unable to retrieve selling items:', error);
    });

    $scope.detailedInfo = undefined;

    $scope.getCurrentItem = function(index){
      var listing = $scope.items.filter(items => items._id === $scope.items[index]._id);
      // $scope.items._id = listing[0]._id;
      // $scope.items.title = listing[0].title;
      // $scope.items.price = listing[0].price;
      // $scope.items.condition = listing[0].condition;
      // $scope.items.category = listing[0].category;
      // $scope.items.seller = listing[0].seller;
      //console.log('Unable to retrieve selling items:', error);
      // var listing = $scope.items.filter(items => items._id === $scope.items[index]._id);
      $scope.detailedInfo = listing[0];
      console.log($scope.detailedInfo);
    }

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
    }

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
    }

  }
]);
