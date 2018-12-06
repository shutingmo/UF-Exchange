angular.module('ufxApp').factory('userFactory', function($http) {
    var userFactoryMethods = {
        signupUser: function(user){
            return $http.post('/signup', user);
        },

        loginUser: function(returnUser){
            console.log('in user factory ' + JSON.stringify(returnUser))

            return $http.post('/login/auth', returnUser)
                .success(
                    function(res){
                        console.log('Fac,res.data is '+ JSON.stringify(res.data))
                        return res.data
                    }
                )
                .error(
                    function(status){
                        console.log('status is ' + JSON.stringify(status))
                        // alert('please work')
                        return status
                    }
                )
                ;
        },

        sendPassLink: function(returnUser) {
            return $http.put('/login/auth', returnUser);
        },

        // getAllUsers: function(){
        //     return $http.get('http://localhost:3000/account/getinfo');
        // },

        // getCurrentUser: function(_id){
        //     console.log('in fac id is ' + _id)
        //     return $http.get('http://localhost:3000/account/getinfo/:_id', _id);

        // },

        getCurrentUser: function(){
            console.log('in fac id')
            return $http.get('/account/getinfo');

        },

        uploadImage: function(file){
            console.log('checking in upload fac' + file)
            // return $http.post('http://localhost:3000/upload',file);
            return $http.post('http://localhost:3000/imageupload')
            .success(
                function(res){
                    console.log('Fac,res.data is '+ JSON.stringify(res))
                    // return res.data
                }
            )
            .error(
                function(status){
                    console.log('status is ' + JSON.stringify(status))
                    // alert('please work')
                    // return status
                }
            )
            ;
    
        },

        getAllUser: function(){
            console.log('in fac id')
            return $http.get('http://localhost:3000/account/getinfo/admin');

        },

        updateUser: function(updatedUser){
            return $http.post('/account/update', updatedUser);
        },

        logout: function() {
            console.log('still logging you out...')
            return $http.delete('/login/auth')
        },

        delete: function(){
            console.log('in process of deleting your account')
            return $http.delete('http://localhost:3000/account/delete')
        },

        deleteUser: function(_id) {
          return $http.delete('http://localhost:3000/account/getinfo/admin/' + _id);
        },

        getUserFavorites: function(){
            console.log('in fac get fav')

            return $http.get('/account/getinfo/getFavs');

            // return $http.get('http://localhost:3000/account/getinfo/getFavs');
        }

    };

    return userFactoryMethods;
  });