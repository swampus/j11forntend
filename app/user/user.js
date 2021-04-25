'use strict';

angular.module('myApp.user', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/user', {
            templateUrl: 'user/user.html',
            controller: 'UserCtrl'
        });
    }])

    .controller('UserCtrl', ['$scope', '$http', function ($scope, $httpClient) {


        $scope.submitUserRegistration = function () {
            var userDTO = {
                username: $scope.username,
                email: $scope.email,
                personalCode: $scope.personalCode,
                address: $scope.address,
                favoriteBook: $scope.favoriteBook
            };

            var submitData = JSON.stringify(userDTO);

            $httpClient.post("http://localhost:9000/api/rest/User.svc/user", submitData).then(function (response) {

                console.log(response.data);

                if(response.data.error === true){
                    var errorDiv = document.getElementById("isa_error");
                    errorDiv.style.display = 'block';
                    document.getElementById("error_msg_text").innerHTML = response.data.message;

                    setTimeout(function(){
                        errorDiv.style.display = 'none';
                    },3000);


                }else{
                    var infoDiv = document.getElementById("isa_info");
                    infoDiv.style.display = 'block';
                    document.getElementById("info_msg_text").innerHTML = "User: " + response.data.id + " is registered!";

                    setTimeout(function(){
                        infoDiv.style.display = 'none';
                    },3000);

                }
            }).catch(function (error) {
                console.log(error);
            });


        }
    }]);