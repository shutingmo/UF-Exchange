// angular.module('items', []).factory('itemFactory', function($http) {
angular.module("ufxApp").factory('itemFactory', function($http) {
    var currId;
    var methods = {
      getCurrentUser: function(){
        console.log('in fac id')
        return $http.get('http://localhost:3000/account/getinfo');
      },
      getBuying: function() {
        return $http.get('http://localhost:3000/buying');
      },

      getSelling: function() {
        return $http.get('http://localhost:3000/selling');
      },

      createBuying: function(listing) {
        return $http.post('http://localhost:3000/buying', listing);
      },

      createSelling: function(listing) {
        return $http.post('http://localhost:3000/selling', listing);
      },

      setId: function(listingId){
        currId = listingId;
      },

      findItem: function(_id) {
        return $http.get('http://localhost:3000/selling/' + _id);
      },

      findSellingItem: function(_id) {
        return $http.get('http://localhost:3000/selling/' + _id);
      },

      findBuyingItem: function(_id) {
        return $http.get('http://localhost:3000/buying/' + _id);
      },

      deleteSelling: function(_id) {
        return $http.delete('http://localhost:3000/selling/' + _id);
      },

      deleteBuying: function(_id) {
        return $http.delete('http://localhost:3000/buying/' + _id);
      },

      flagItem: function(flagged){
        console.log('in flac item fac')
        return $http.post('http://localhost:3000/selling/flagItem', flagged);
      },

      flagUser: function(flagged){
        console.log('in flac item fac')
        return $http.post('http://localhost:3000/selling/flagUser', flagged);
      },

      favorite: function(like){
        console.log('in fav item fac')

        return $http.post('http://localhost:3000/selling/favorite', like);

      }

    };

    return methods;
  });
