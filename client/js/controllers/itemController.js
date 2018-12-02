angular.module('items').controller('ItemController', ['$scope', 'itemFactory', 
  function($scope, itemFactory) {

  //   itemFactory.getCurrentUser().then(function(user){
  //     console.log('client controller get cur user')
  //     console.log(JSON.stringify(user.data))
  //     var currUser = user.data;
  //     $scope.currentuser = currUser;

  //     console.log('Hi ' + JSON.stringify(currUser.name) + '!');
  //     console.log('scope current user' + JSON.stringify($scope.currentuser) + '!');
  //     console.log('current user email:' + JSON.stringify(currUser.email));

  // }, function(error){
  //     console.log('unable to get current user ', error)
  // })
    // var select = document.getElementById('cmbitems');
    // select.onchange = function() {
    //   input.value = select.value;
    // }
    

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

    // $scope.setSeller = function() {
    //   console.log(itemFactory.getCurrentUser().email);
    // }

    $scope.setCategory = function(category) {
      //setting the category from dropdown
      $scope.newItem.category = category;
      $scope.items.push($scope.newItem.category);
    }

    $scope.setCondition = function(condition) {
      //setting the condition from dropdown
      $scope.newItem.condition = condition;
      $scope.items.push($scope.newItem.condition);
    }

    $scope.setLocation = function(location) {
      //setting the location from dropdown
      $scope.newItem.location = location;
      $scope.items.push($scope.newItem.location);
    }

    $scope.uploadImg = function(img){
      
    }

    $scope.saveBuying = function() {
      $scope.items.push($scope.newItem);

      console.log(JSON.stringify($scope.newItem));
      itemFactory.createBuying($scope.newItem).then(function(res,err)
      {
        if(res.status !== 200)
        {
            console.log("\nunable to add listing");
        } 
      
        $scope.newItem = {};

      });
    }

    $scope.saveSelling = function() {
      $scope.items.push($scope.newItem);

      console.log(JSON.stringify($scope.newItem));
      itemFactory.createSelling($scope.newItem).then(function(res,err)
      {
        if(res.status !== 200)
        {
            console.log("\nunable to add listing");
        } 

        $scope.newItem = {};


      });
    }

    $scope.setBuyer = function() {
      $scope.items.push($scope.newItem);
      // $scope.newItem.buyer.name = 'cynthia';
      // $scope.newItem.buyer.email = 'momowhales';
      console.log('scope.newItem in set buyer is ' + JSON.stringify($scope.newItem))
      itemFactory.createBuying($scope.newItem).then(function(res,err)
      {
        if(res.status !== 200)
        {
            console.log("\nunable to add listing");
        } 
      
        $scope.newItem = {};

      });

    }

    $scope.setSeller = function(){
      $scope.items.push($scope.newItem);

      console.log('scope.newItem in set seller is ' + JSON.stringify($scope.newItem))
      itemFactory.createSelling($scope.newItem).then(function(res,err)
      {
        if(res.status !== 200)
        {
            console.log("\nunable to add listing");
        } 

        $scope.newItem = {};


      });
    }

  }
]);