angular.module("dash", []).controller("DashController", [
  "$scope",
  "$http",
  "$window",
  function DashController($scope, $http, $window) {
    console.log("DashController");
    var usuario = JSON.parse(localStorage.getItem('usuario'));
    if (usuario) {
      var api_token = localStorage.getItem('api_token');
      $scope.usuarioNombre = usuario.name;
      $scope.usuarioCreatedAt = usuario.created_at;
    } else {
      $window.location.href = 'index.html';
    }
    $scope.salir = function() {
      localStorage.clear();
      $window.location.href = 'index.html';
    }
  }
]);
