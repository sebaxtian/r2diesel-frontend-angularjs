angular.module("registro", []).controller("RegistroController", [
  "$scope",
  "$http",
  function RegistroController($scope, $http) {
    console.log("RegistroController");
    $scope.doRegistro = false;
    $scope.disabled = "";
    $scope.errorRegistro = false;
    $scope.exitoRegistro = false;
    $scope.registrar = function() {
      console.log("Function Registrar");
      var dataRegistro = {
        name: $scope.nombre,
        email: $scope.email,
        password: $scope.password
      };
      console.log("dataRegistro: ", dataRegistro);
      if (!$scope.doRegistro) {
        $scope.doRegistro = true;
        $scope.disabled = "disabled";
        $scope.errorRegistro = false;
        $scope.exitoRegistro = false;
        $http({
          method: "POST",
          url: "http://r2diesel-backend.test/api/user",
          data: JSON.stringify(dataRegistro)
        }).then(
          function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            console.log("response: ", response);
            if (response.status == 200 && response.data.success) {
              console.log("Registro con exito");
              $scope.exitoRegistro = true;
            } else {
              console.log("Registro sin exito");
              $scope.errorRegistro = true;
            }
            $scope.doRegistro = false;
            $scope.disabled = "";
          },
          function errorCallback(error) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            // console.log("error: ", error);
            console.log("Registro invalido");
            $scope.doRegistro = false;
            $scope.disabled = "";
            $scope.errorRegistro = true;
          }
        );
      }
    };
  }
]);
