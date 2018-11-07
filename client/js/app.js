/* register the modules the application depends upon here*/
angular.module('items', []);
// angular.module('user', []);


/* register the application and inject all the necessary dependencies */
var app = angular.module('ufxItemApp', ['items']);

var userApp = angular.module('ufxApp', ['user']);
