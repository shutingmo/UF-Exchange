/* register the modules the application depends upon here*/
angular.module('items', []);
angular.module('user', []);
angular.module('ngFlash', []);
angular.module('ngAnimate', []);



/* register the application and inject all the necessary dependencies */
// var app = angular.module('ufxAppItem', ['items']);
var app = angular.module('ufxApp', ['user', 'items', 'ngFlash', 'ngAnimate']);
