angular.module("index", []).controller("IndexController", [
  "$scope",
  "$http",
  "$window",
  function IndexController($scope, $http, $window) {
    console.log("IndexController");
    // $scope.email = "sebaxtian@mail.co";
    // $scope.password = "123456";
    $scope.doLogin = false;
    $scope.disabled = "";
    $scope.errorLogin = false;
    $scope.ingresar = function() {
      console.log("Function Ingresar");
      var dataLogin = {
        email: $scope.email,
        password: $scope.password
      };
      console.log("dataLogin: ", dataLogin);
      if (!$scope.doLogin) {
        $scope.doLogin = true;
        $scope.disabled = "disabled";
        $scope.errorLogin = false;
        $http({
          method: "POST",
          url: "http://r2diesel-backend.test/api/login",
          data: JSON.stringify(dataLogin)
        }).then(
          function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            console.log("response: ", response);
            if (response.status == 200 && response.data.success) {
              var usuario = response.data.data;
              var api_token = usuario.api_token;
              localStorage.setItem("usuario", JSON.stringify(usuario));
              localStorage.setItem("api_token", api_token);
              $window.location.href = 'dash.html';
            } else {
              console.log("Autenticacion invalida");
              $scope.errorLogin = true;
            }
            $scope.doLogin = false;
            $scope.disabled = "";
          },
          function errorCallback(error) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            // console.log("error: ", error);
            console.log("Autenticacion invalida");
            $scope.doLogin = false;
            $scope.disabled = "";
            $scope.errorLogin = true;
          }
        );
      }
    };
  }
]);
