
angular.module('ufxApp').factory('userFactory', function($http) {
    var userFactoryMethods = {
        signupUser: function(user){
            return $http.post('http://localhost:3000/signup', user);
        },

        loginUser: function(returnUser){
            console.log('in user factory ' + JSON.stringify(returnUser))

            return $http.post('http://localhost:3000/login/auth', returnUser)
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

        // getAllUsers: function(){
        //     return $http.get('http://localhost:3000/account/getinfo');
        // },

        // getCurrentUser: function(_id){
        //     console.log('in fac id is ' + _id)
        //     return $http.get('http://localhost:3000/account/getinfo/:_id', _id);

        // },

        getCurrentUser: function(){
            console.log('in fac id')
            return $http.get('http://localhost:3000/account/getinfo');

        },

        updateUser: function(updatedUser){
            return $http.post('http://localhost:3000/account/update', updatedUser);
        },

        logout: function() {
            console.log('still logging you out...')
            return $http.delete('http://localhost:3000/login/auth')
        },

        delete: function(){
            console.log('in process of deleting your account')
            return $http.delete('http://localhost:3000/account/delete')
        },


    };

    return userFactoryMethods;  
  });
  