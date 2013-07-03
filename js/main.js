var app = angular.module('main', ['angular-markdown', 'jsonrpc']);

app.config([
    '$routeProvider', 'jsonrpcProvider',
    function($routeProvider, jsonrpcProvider) {
      jsonrpcProvider.setBasePath('http://localhost:8080/rpc');
      $routeProvider.
          when('/', {
            templateUrl: 'entries',
            controller: 'EntriesCtrl'
          });
    }]);

app.service('blogService', ['jsonrpc', function(jsonrpc) {
  var service = jsonrpc.newService('blog');
  this.search = service.createMethod('Search');
}]);

app.controller('EntriesCtrl', [
    '$scope', 'blogService',
    function($scope, blogService) {
      $scope.ctrl = {entries: []};
      blogService.search({'q': '*'}).
          success(function(result) {
            $scope.ctrl.entries = result.entries;
          }).
          error(function(result) {
            $scope.ctrl.error = result.error;
          });
    }]);
