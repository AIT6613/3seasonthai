var app = angular.module('myApp', []);

app.controller('OrderManagementCtrl', function ($scope, $http) {

  angular.element(document).ready(function () {
    $scope.URL = 'http://ec2-3-14-6-238.us-east-2.compute.amazonaws.com:3000';

    // Set start filter
    $scope.mySortType = "true";
    $scope.findStatus = "";
    
    $scope.orders = [];

    $scope.getAllOrder();
  });

  // get all order
  $scope.getAllOrder = function () {
    $http.get($scope.URL + "/api/orders/get/all/order")
      .then(function mySuccess(response) {
        $scope.orders = response.data.data;
        console.log($scope.orders);
      }, function myError(response) {
        alert("Get all order fail.");
      });
  }


  // Sort Table function
  $scope.orderByMe = function (name) {
    if ($scope.myOrderBy == name) {
      if ($scope.mySortType == "") {
        $scope.mySortType = "true";
      } else {
        $scope.mySortType = "";
      }
    } else {
      $scope.mySortType = "";
    }
    $scope.myOrderBy = name;


  }

  // get student detail
  $scope.getStudentDetail = function (studentNumber) {
    $http.post("../includes/queryStudentRecord.php",
      {
        postRequest: 'getStudentDetail',
        studentId: studentNumber
      })
      .then(function mySuccess(response) {
        $scope.studentDetails = response.data.studentDetails;
        $scope.showStudentDetails = true;
      }, function myError(response) {
        alert("Get student detail fail.");
      });
  }

  $scope.updateSearchKey = function (keyEvent, searchField) {
    /*
    if (keyEvent.which==13 && searchField=="studentID") {
      $scope.searchStudentID = $scope.findStudentID;
    }

    if (keyEvent.which==13 && searchField=="studentName") {
      $scope.searchStudentName = $scope.findName;
    }
    */
  }

});










