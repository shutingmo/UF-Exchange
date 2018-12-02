angular.module('user').controller('signupController', ['$scope','userFactory', 
    function($scope, userFactory){

        $scope.signup = function(){
            $scope.user = [];

            console.log('scope new user is ' + JSON.stringify($scope.newUser));

            if($scope.newUser === undefined)
            {
                alert('please fill out the fields')
                return;
            }

            $scope.user.push($scope.newUser);

            // set endpoint and your access key
            var access_key = '8bd4fd632f2efd01f3b72e91479b7be5';
            var email_address = 'cynthia.mo.1812@gmail.com';

            // verify email address via AJAX call
            $.ajax({
                url: 'http://apilayer.net/api/check?access_key=' + access_key + '&email=' + email_address,   
                dataType: 'jsonp',
                success: function(json) {

                // Access and use your preferred validation result objects
                console.log(json.format_valid);
                console.log(json.smtp_check);
                console.log(json.score);
                            
                }
            });
        
            userFactory.signupUser($scope.newUser).then(function(res, err){
       
                if(res.status !== 200)
                {
                   console.log("\nunable to create user");
                   $scope.errorMessage = "didn't create user";
                } 
                else if (res.status === 200)
                {
                    console.log('signup was success, front end');
                  
                    window.location.replace('../html/login.html');
                }
               $scope.newUser = {};
           })
       }
    }

]);


