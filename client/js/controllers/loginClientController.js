// angular.module('user').controller('loginController', ['$scope','userFactory',
//     function($scope, userFactory){

//         $scope.login = function(){
//             $scope.user = [];
//             $scope.user.push($scope.returnUser);
//             console.log(JSON.stringify($scope.returnUser));

//             userFactory.loginUser($scope.returnUser).then(function(res,err, req){
//                 console.log('in client controller');

//                 if(res.status !== 200)
//                 {
//                    console.log("\nunable to login user");
//                 }
//                 else if (res.status === 200)
//                 {
//                     console.log('login was success, front end');

//                     window.location.replace('../html/userLanding.html');
//                 }
//                 $scope.returnUser = {};
//             })
//         }
//     }

// ]);

// Demo controller
var app = angular.module('user', ['ngFlash', 'ngAnimate']);
app.controller('loginController', ['$rootScope', '$scope', 'Flash', '$timeout', 'userFactory', function($rootScope, $scope, Flash, $timeout, userFactory) {
    $scope.logout = function() {
        console.log('logging you out...');
        userFactory.logout().then(function(err) {
            if (err.status === 200)
                continue;
            else
                console.log('something went wrong', err);
        })
    };
    $scope.successAlert = function () {
        var message = '<strong> Well done!</strong>  You successfully read this important alert message.';
        var id = Flash.create('success', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
    };
    $scope.success = function() {
        var message = '<strong>Well done!</strong> You successfully read this important alert message.';
        Flash.create('success', message);
    };
    $scope.login = function() {
        console.log('in login scope FE controller')

        $scope.user = [];
        $scope.user.push($scope.returnUser);
        console.log(JSON.stringify($scope.returnUser));

        userFactory.loginUser($scope.returnUser).then(function(res,err, req, status){
            console.log('in client controller');

            console.log('status is ' + status)
            console.log('res is ' + JSON.stringify(res))
            console.log('res.data is ' + JSON.stringify(res.data))

            if(res.status === 401) {
                console.log("\nunable to login user");
                var message = '<strong>Error!</strong> Username or password is wrong';
                Flash.create('success', message);
            }
            else if(res.status === 412 ) {
                console.log("You are not verified");
                var message = '<strong>Error!</strong> Check your email to verify your account';
                Flash.create('success', message);
            }
            else if (res.status === 200) {
                console.log('login was success, front end');
                var message = '<strong>Success!</strong> Login was successful';
                Flash.create('success', message);

                setTimeout(function(){
                  if($scope.returnUser.role === "admin") {
                    window.location.replace('../html/adminLanding.html');
                  }
                  else{
                      console.log('check')
                    window.location.replace('js/html/userLanding.html');
                  }
                }, 500);
            }

            console.log('check')
            // var message = '<strong>Error!</strong> Username or password is wrong';
            // Flash.create('success', message);
            // $scope.returnUser = {};
        }, function (err){
            console.log('shit didn\'t work bro ' + JSON.stringify(err))
            if(err.status !== 200)
            {
                console.log("\nunable to login user");
                var message = '<strong>Error!</strong> Username or password is wrong';
                Flash.create('danger', message);
            }
        })

        // var message = '<strong>Well done!</strong> You successfully read this important alert message.';
        // Flash.create('success', message);
    };
    $scope.changePass = function() {
        userFactory.sendPassLink($scope.returnUser).then(function(res, err) {
            if(res.status === 400)
                console.log("something went wrong");
            else
                window.location.replace('../index.html');
        })
    }
    $scope.info = function() {
        var message = '<strong>Heads up!</strong> This alert needs your attention, but it\'s not super important.';
        Flash.create('info', message);
    };
    $scope.warning = function() {
        var message = '<strong>Warning!</strong> Better check yourself, you\'re not looking too good.';
        Flash.create('warning', message);
    };
    $scope.danger = function() {
        var message = '<strong>Oh snap!</strong> Change a few things up and try submitting again.';
        Flash.create('danger', message);
    };
}]);


(function() {
    /*! angular-flash - v2.2.5 - 2016-03-17
     * https://github.com/sachinchoolur/angular-flash
     * Copyright (c) 2016 Sachin; Licensed MIT */

    'use strict';

    var app = angular.module('ngFlash', []);

    app.run(['$rootScope', function ($rootScope) {
        return $rootScope.flashes = [];
    }]);

    app.directive('dynamic', ['$compile', function ($compile) {
        return {
            restrict: 'A',
            replace: true,
            link: function link(scope, ele, attrs) {
                return scope.$watch(attrs.dynamic, function (html) {
                    ele.html(html);
                    return $compile(ele.contents())(scope);
                });
            }
        };
    }]);

    app.directive('closeFlash', ['$compile', '$rootScope', 'Flash', function ($compile, $rootScope, Flash) {
        return {
            link: function link(scope, ele, attrs) {
                return ele.on('click', function () {
                    var id = parseInt(attrs.closeFlash, 10);
                    Flash.dismiss(id);
                    $rootScope.$apply();
                });
            }
        };
    }]);

    app.directive('flashMessage', ['Flash', function (Flash) {
        return {
            restrict: 'E',
            scope: {
                duration: '=',
                showClose: '=',
                onDismiss: '&'
            },
            template: '<div role="alert" ng-repeat="flash in $root.flashes track by $index" id="{{flash.config.id}}" class="alert {{flash.config.class}} alert-{{flash.type}} alert-dismissible alertIn alertOut"><div type="button" class="close" ng-show="flash.showClose" close-flash="{{flash.id}}"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></div> <span dynamic="flash.text"></span> </div>',
            link: function link(scope, ele, attrs) {
                Flash.setDefaultTimeout(scope.duration);
                Flash.setShowClose(scope.showClose);
                function onDismiss(flash) {
                    if (typeof scope.onDismiss !== 'function') return;
                    scope.onDismiss({ flash: flash });
                }

                Flash.setOnDismiss(onDismiss);
            }
        };
    }]);

    app.factory('Flash', ['$rootScope', '$timeout', function ($rootScope, $timeout) {
        var dataFactory = {};
        var counter = 0;
        dataFactory.setDefaultTimeout = function (timeout) {
            if (typeof timeout !== 'number') return;
            dataFactory.defaultTimeout = timeout;
        };

        dataFactory.defaultShowClose = true;
        dataFactory.setShowClose = function (value) {
            if (typeof value !== 'boolean') return;
            dataFactory.defaultShowClose = value;
        };
        dataFactory.setOnDismiss = function (callback) {
            if (typeof callback !== 'function') return;
            dataFactory.onDismiss = callback;
        };
        dataFactory.create = function (type, text, timeout, config, showClose) {
            var $this = undefined,
                flash = undefined;
            $this = this;
            flash = {
                type: type,
                text: text,
                config: config,
                id: counter++
            };
            flash.showClose = typeof showClose !== 'undefined' ? showClose : dataFactory.defaultShowClose;
            if (dataFactory.defaultTimeout && typeof timeout === 'undefined') {
                flash.timeout = dataFactory.defaultTimeout;
            } else if (timeout) {
                flash.timeout = timeout;
            }
            $rootScope.flashes.push(flash);
            if (flash.timeout) {
                flash.timeoutObj = $timeout(function () {
                    $this.dismiss(flash.id);
                }, flash.timeout);
            }
            return flash.id;
        };
        dataFactory.pause = function (index) {
            if ($rootScope.flashes[index].timeoutObj) {
                $timeout.cancel($rootScope.flashes[index].timeoutObj);
            }
        };
        dataFactory.dismiss = function (id) {
            var index = findIndexById(id);
            if (index !== -1) {
                var flash = $rootScope.flashes[index];
                dataFactory.pause(index);
                $rootScope.flashes.splice(index, 1);
                $rootScope.$digest();
                if (typeof dataFactory.onDismiss === 'function') {
                    dataFactory.onDismiss(flash);
                }
            }
        };
        dataFactory.clear = function () {
            while ($rootScope.flashes.length > 0) {
                dataFactory.dismiss($rootScope.flashes[0].id);
            }
        };
        dataFactory.reset = dataFactory.clear;
        function findIndexById(id) {
            return $rootScope.flashes.map(function(flash) {
                return flash.id;
            }).indexOf(id);
        }

        return dataFactory;
    }]);
    })()
