// angular.module('items', []).factory('itemFactory', function($http) {
angular.module("ufxApp").factory('itemFactory', function($http) {
    var currId;
    var methods = {
      getCurrentUser: function(){
        console.log('in fac id')
        return $http.get('/account/getinfo');
      },
      getBuying: function() {
        return $http.get('/buying');
      },

      getSelling: function() {
        return $http.get('/selling');
      },

      createBuying: function(listing) {
        return $http.post('/buying', listing);
      },

      createSelling: function(listing) {
        return $http.post('/selling', listing);
      },
      setId: function(listingId){
        currId = listingId;
      },

      findItem: function(_id) {
        return $http.get('http://localhost:3000/selling/' + _id);
      },

      findSellingItem: function(_id) {
        return $http.get('/selling/' + _id);
      },

      findBuyingItem: function(_id) {
        return $http.get('/buying/' + _id);
      },

      deleteSelling: function(_id) {
        return $http.delete('/selling/' + _id);
      },

      deleteBuying: function(_id) {
        return $http.delete('/buying/' + _id);
      },

      flagItem: function(flagged){
        console.log('in flac item fac')
        return $http.post('http://localhost:3000/selling/flagItem', flagged);
      },

      buyItemNow: function(buy){
        console.log('in buy now item fac')
        return $http.post('http://localhost:3000/selling/buyNow', buy);
      },

      flagUser: function(flagged){
        console.log('in flac item fac')
        return $http.post('http://localhost:3000/selling/flagUser', flagged);
      },

      favorite: function(like){
        console.log('in fav item fac')

        return $http.post('http://localhost:3000/selling/favorite', like);
      },

      buyItemNow: function(buy){
        console.log('in buy now item fac')
        return $http.post('http://localhost:3000/selling/buyNow', buy);
      }

    };

    return methods;
  });