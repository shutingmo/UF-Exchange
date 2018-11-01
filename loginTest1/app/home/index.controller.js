// (function () {
//     'use strict';

//     angular
//         .module('app')
//         .controller('Home.IndexController', Controller);

//     function Controller(UserService) {
//         var vm = this;

//         vm.user = null;

//         initController();

//         function initController() {
//             // get current user
//             UserService.GetCurrent().then(function (user) {
//                 vm.user = user;
//             });
//         }
//     }

// })();
// (function () {
//     'use strict';

//     angular
//         .module('app')
//         .controller('Home.IndexController', Controller);

//     function Controller(UserService, $scope) {
        

//         // $scope.user = null;
//         $scope.user.name = 'john';

//         // initController();

//         // function initController() {
//         //     // get current user
//         //     UserService.GetCurrent().then(function (user) {
//         //         $scope.user = user;
//         //     });
//         // }
//     }

// })();

angular.module('app').controller('Home.IndexController', Controller);

    function Controller(UserService, $http, $scope) {
        
        $scope.user={};
        // $scope.user = null;
        // $http.get('/api/users/current')
        //     .then(function(res) {
        //         $scope.user = res.data;
        //         console.log('user is ' + $scope.user.name);
        //     })
        //     .catch(function(err){
        //         throw err;
        //     })

        
        console.log('in index.controller for home')
        initController();

        function initController() {
            //get current user
            UserService.GetCurrent().then(function (user) {
                $scope.user = user;
            });

            
        }
    }