angular.module('items')
.controller('ItemController', ['$scope', '$location', '$window','itemFactory',
  function($scope, $location, $window, itemFactory) {

    $scope.listings = [];

    

    itemFactory.getSelling().then(function(response) {

      console.log('response data in item controller is ' + JSON.stringify(response.data));
      $scope.items = response.data;
      $scope.listings = response.data;
      console.log('scope items is ' + JSON.stringify($scope.items))
      $scope.sellingItems = response.data;
      console.log(response.data.length)

      // var scopeItems = $scope.items
      console.log($scope.items)
      

    }, function(error) {
      console.log('Unable to retrieve selling items:', error);
    });


    itemFactory.getBuying().then(function(response) {
      console.log('response data in get buying is ' + JSON.stringify(response.data));
      $scope.buyingItems = response.data;
      // console.log("Check1");
    }, function(error) {
      console.log('Unable to retrieve buying items:', error);
    });



    $scope.postItem = function(){
      console.log('checking post item with ejs')
      itemFactory.uploadImage().then(function(response){
        console.log('response from post item is ' + JSON.stringify(response.config.url))
        window.location.replace(response.config.url)
      },function(error){
        console.log('Unable to retrieve buying items:', error);

      })

    }

    $scope.getCurrentItem = function(items){
      var itemId = items._id;
      console.log(items);
      sessionStorage.setItem('selected', itemId);
    }

    var email;
    var itemTitle;
    var currItem;

    // $scope.details = function(){
    //   var selectedItem = sessionStorage.getItem('selected');
    //   $scope.initial = function(id){
    //     console.log("initial check");
    //     itemFactory.findItem(id).then(function(response){
    //       console.log(JSON.stringify(response.data));
    //       currItem = response.data;
    //       $scope.detailedInfo = currItem;
    //       console.log($scope.detailedInfo);

    //       if(response.data.seller){
    //         email = response.data.seller.email
    //         itemTitle = response.data.title
    //       }
    //       else if(response.data.buyer){
    //         email = response.data.buyer.email
    //         itemTitle = response.data.title
    //       }

    //       console.log('email check is ' + email)

    //     }, function(error){
    //       console.log('Unable to retrieve selling items:', error);
    //     })
    //   }
    //   $scope.initial(selectedItem);
    // }

    $scope.details = function(){
      var selectedItem = sessionStorage.getItem('selected');
      
        console.log("initial check");


        itemFactory.findSellingItem(selectedItem).then(function(response){
            if(response.data === null){
                console.log("IN IF STATEMENT");
                // console.log(id);
                itemFactory.findBuyingItem(selectedItem).then(function(response){
                  console.log(response.data);
                  var currItem = response.data;
                  $scope.detailedInfo = currItem;
                  console.log($scope.detailedInfo);

                  console.log('found buying item, image is ' + response.data.image.id)
                  
                  itemFactory.getCurrentImageFilename(response.data.image.filename).then(function(response){
                    // console.log('resposne in fe item controller ' + JSON.stringify(response))
                    console.log(response.config.url)
      
                    // $scope.response.config.url = response.config.url;
                    $scope.response = response.config.url;
                    console.log($scope.response)
                    // $scope.response.config.url = "http://localhost:3000/image/"+detailedInfo.image.filename;
      
                    // window.location.replace(response.config.url)
      
                  })

                }, function(error){
                  console.log('Unable to retrieve buying items:', error);
                });
                return;
            }
            console.log("Out of If");
            var currItem = response.data;
            $scope.detailedInfo = currItem;
            console.log($scope.detailedInfo);

            console.log('found selling item, image is ' + JSON.stringify(response.data.image.id))

            // itemFactory.getCurrentImageID(response.data.image.id).then(function(response){
              
            // })

            itemFactory.getCurrentImageFilename(response.data.image.filename).then(function(response){
              // console.log('resposne in fe item controller ' + JSON.stringify(response))
              console.log(response.config.url)

              // $scope.response.config.url = response.config.url;
              $scope.response = response.config.url;
              console.log($scope.response)
              // $scope.response.config.url = "http://localhost:3000/image/"+detailedInfo.image.filename;

              // window.location.replace(response.config.url)

            })

            if(response.data.seller){
              email = response.data.seller.email
              itemTitle = response.data.title
            }
            else if(response.data.buyer){
              email = response.data.buyer.email
              itemTitle = response.data.title
            }
            }, function(error){
                console.log('Unable to retrieve buying items:', error);
            })

        
            $scope.buyNow = function(){
              var buyItem = sessionStorage.getItem('selected');
              console.log('fe buy now item '+ buyItem)
              itemFactory.findItem(buyItem).then(function(response){
                console.log(JSON.stringify(response.data));
        
                if(response){
                  itemFactory.buyItemNow(response.data).then(function(res){
                    if(res.status !== 200)
                    {
                      console.log("\nunable to buy item");
                    }
                    else if (res.status === 200)
                    {
                      console.log('buy was success, front end');
                    }
        
                  })
                }
        
              }, function(error){
                console.log('Unable to retrieve selling items:', error);
              })
            }
        
            $scope.favorite = function(){
              var favItem = sessionStorage.getItem('selected');
              console.log('fe favorites '+ favItem)
              
              itemFactory.findSellingItem(favItem).then(function(response){
                console.log(JSON.stringify(response));
                console.log((response));
                
                if(response.data === null)
                {
                  itemFactory.findBuyingItem(favItem).then(function(response){
                    if(response){
                      itemFactory.favorite(response.data).then(function(res){
                        if(res.status !== 200)
                        {
                          console.log("\nunable to fav item");
                        }
                        else if (res.status === 200)
                        {
                          console.log('fav was success, front end');
                        }
            
                      })
                    }
                
                  }, function(error){
                      console.log('error favoriting buying item ' + buyingItems)
                  })
                }
                else if(response)
                {
                  itemFactory.favorite(response.data).then(function(res){
                    if(res.status !== 200)
                    {
                      console.log("\nunable to fav item");
                    }
                    else if (res.status === 200)
                    {
                      console.log('fav was success, front end');
                    }
        
                  })
                }
        
              }, function(error){
                console.log('Unable to retrieve selling items:', error);
              })
            }

            $scope.buyNow = function(){
              var buyItem = sessionStorage.getItem('selected');
              console.log('fe buy now item '+ buyItem)

              itemFactory.findSellingItem(buyItem).then(function(response){
                console.log(JSON.stringify(response));
                console.log((response));
                
                if(response.data === null)
                {
                  itemFactory.findBuyingItem(buyItem).then(function(response){
                    if(response){
                      itemFactory.buyItemNow(response.data).then(function(res){
                        if(res.status !== 200)
                        {
                          console.log("\nunable to fav item");
                        }
                        else if (res.status === 200)
                        {
                          console.log('fav was success, front end');
                        }
            
                      })
                    }
                
                  }, function(error){
                      console.log('error favoriting buying item ' + buyingItems)
                  })
                }
                else if(response)
                {
                  itemFactory.buyItemNow(response.data).then(function(res){
                    if(res.status !== 200)
                    {
                      console.log("\nunable to fav item");
                    }
                    else if (res.status === 200)
                    {
                      console.log('fav was success, front end');
            $scope.flagListing = function(){
              var flagItem = sessionStorage.getItem('selected');
              console.log('flag item is ' + flagItem)
        
              itemFactory.findItem(flagItem).then(function(response){
                console.log(JSON.stringify(response.data));
                // flaggedItem = response.data;
                // $scope.detailedInfo = flaggedItem;
                // console.log($scope.detailedInfo);
                if(response){
                  response.data.flagged = true;
        
                  console.log(response.data.flagged)
                  console.log(response)
        
                  itemFactory.flagItem(response.data).then(function(res){
                    if(res.status !== 200)
                    {
                      console.log("\nunable to flag user");
                    }
                    else if (res.status === 200)
                    {
                      console.log('flag was success, front end');
                    }
        
                  })
                }
        
              }, function(error){
                console.log('Unable to retrieve selling items:', error);
              })


            }

            $scope.filterItems = function(category){
              console.log('check 1')
              $scope.itemSearch = {};
              $scope.itemSearchBar = "";
        
              if ($scope.itemSearch.category === category) {
                $scope.itemSearch = {};
                $scope.itemSearchBar = "";
        
              }
              else {
                $scope.itemSearch.category = category;
              }
            }
      }
    // $scope.setFlag = function(item, flagged) {
    //   // console.log("in here");
    //   // console.log(item.flagged);
    //   // console.log(flagged);
    //   item.flagged = flagged;
    // }

    $scope.setCategory = function(category) {
      //setting the category from dropdown
      $scope.newItem.category = category;
      // $scope.items.push($scope.newItem.category);
    }

    $scope.setCondition = function(condition) {
      //setting the condition from dropdown
      $scope.newItem.condition = condition;
      // $scope.items.push($scope.newItem.condition);
    }

    $scope.setLocation = function(location) {
      //setting the location from dropdown
      $scope.newItem.location = location;
      // $scope.items.push($scope.newItem.location);
    }

    $scope.uploadImg = function(file){
      console.log('hello uplaod image')
      console.log($scope.picture)
      itemFactory.uploadImage(file).then(function(res,err){
        if(err){
          console.log(err + " error in uploading image")
        }
        else{
          console.log('upload image worked ' + JSON.stringify(res))
        }
      })


    $scope.saveBuying = function() {
      $scope.buyingItems.push($scope.newItem);

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
      $scope.sellingItems.push($scope.newItem);

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
      $scope.buyingItems.push($scope.newItem);
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
      $scope.sellingItems.push($scope.newItem);

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
    };

    $scope.sendMail = function() {
     
      window.location.href = "mailto:"+email+"?subject=Interested in "+itemTitle+"&body=hello i am interested";

    }

    // $scope.theFilter = {};

    // $scope.filterItems = function(category){
    //   console.log('check 1')
    //   $scope.itemSearch = {};
    //   $scope.itemSearchBar = "";

    //   if ($scope.itemSearch.category === category) {
    //     $scope.itemSearch = {};
    //     $scope.itemSearchBar = "";

    //   }
    //   else {
    //     $scope.itemSearch.category = category;
    //   }
    // }

    // $scope.flagListing = function(){
    //   var flagItem = sessionStorage.getItem('selected');
    //   console.log('flag item is ' + flagItem)

    //   itemFactory.findItem(flagItem).then(function(response){
    //     console.log(JSON.stringify(response.data));
    //     // flaggedItem = response.data;
    //     // $scope.detailedInfo = flaggedItem;
    //     // console.log($scope.detailedInfo);
    //     if(response){
    //       response.data.flagged = true;

    //       console.log(response.data.flagged)
    //       console.log(response)

    //       itemFactory.flagItem(response.data).then(function(res){
    //         if(res.status !== 200)
    //         {
    //           console.log("\nunable to flag user");
    //         }
    //         else if (res.status === 200)
    //         {
    //           console.log('flag was success, front end');
    //         }

    //       })
    //     }

    //   }, function(error){
    //     console.log('Unable to retrieve selling items:', error);
    //   })
    // }

    $scope.flagUser = function(){
      var flagItem = sessionStorage.getItem('selected');

      itemFactory.findItem(flagItem).then(function(response){
        console.log(JSON.stringify(response.data));
        // flaggedItem = response.data;
        // $scope.detailedInfo = flaggedItem;
        // console.log($scope.detailedInfo);
        if(response){
          // response.data.flagged = true;

          // console.log(response.data.flagged)
          // console.log(response)

          itemFactory.flagUser(response.data).then(function(res){
            if(res.status !== 200)
            {
              console.log("\nunable to flag user");
            }
            else if (res.status === 200)
            {
              console.log('flag was success, front end');
            }

          })
        }

      }, function(error){
        console.log('Unable to retrieve selling items:', error);
      })
    }

    // $scope.buyNow = function(){
    //   var buyItem = sessionStorage.getItem('selected');
    //   console.log('fe buy now item '+ buyItem)
    //   itemFactory.findItem(buyItem).then(function(response){
    //     console.log(JSON.stringify(response.data));

    //     if(response){
    //       itemFactory.buyItemNow(response.data).then(function(res){
    //         if(res.status !== 200)
    //         {
    //           console.log("\nunable to buy item");
    //         }
    //         else if (res.status === 200)
    //         {
    //           console.log('buy was success, front end');
    //         }

    //       })
    //     }

    //   }, function(error){
    //     console.log('Unable to retrieve selling items:', error);
    //   })
    // }

    // $scope.favorite = function(){
    //   var favItem = sessionStorage.getItem('selected');
    //   console.log('fe favorites '+ favItem)
    //   itemFactory.findItem(favItem).then(function(response){
    //     console.log(JSON.stringify(response.data));

    //     if(response){
    //       itemFactory.favorite(response.data).then(function(res){
    //         if(res.status !== 200)
    //         {
    //           console.log("\nunable to fav item");
    //         }
    //         else if (res.status === 200)
    //         {
    //           console.log('fav was success, front end');
    //         }

    //       })
    //     }

    //   }, function(error){
    //     console.log('Unable to retrieve selling items:', error);
    //   })
    // }
  }
}
]);