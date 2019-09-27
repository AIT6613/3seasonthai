


var app = angular.module('myApp', []);


app.controller('OrderHistoryCtrl', function ($scope, $http) {

  angular.element(document).ready(function () {
    $scope.URL = 'http://ec2-3-14-6-238.us-east-2.compute.amazonaws.com:3000';


    // Set start filter
    $scope.mySortType = "true";
    $scope.findStatus = "";

    $scope.orders = [];
    $scope.orderSummarys= [];
    $scope.orderDetails = [];
    $scope.deliveryAddresses = [];
    $scope.orderList = [];


    $scope.getSummaryOrder(2019,9);
    $scope.getAllDeliveryAddress();
    $scope.getOrderList();

    // display content
    $scope.displayContent();


  });

  $scope.displayContent = function () {
    document.getElementById("order-container").style.visibility = "visible";
  }

  // get all order
  $scope.getSummaryOrder = function (year,month) {
    $http.get($scope.URL + "/api/orders/get/summaryOrder/"+year+"/"+month)
      .then(function mySuccess(response) {
        $scope.orderSummarys = response.data.data;
        console.log($scope.orders);

      }, function myError(response) {
        alert("Get all order fail.");
      });
  }

  // get all order detail
  $scope.getAllOrderDetail = function () {
    $http.get($scope.URL + "/api/orders/get/all/orderDetail")
      .then(function mySuccess(response) {
        $scope.orderDetails = response.data.data;
        console.log($scope.orderDetails);

      }, function myError(response) {
        alert("Get all order detail fail.");
      });
  }

  // get all delivery address
  $scope.getAllDeliveryAddress = function () {
    $http.get($scope.URL + "/api/orders/get/all/deliveryAddress")
      .then(function mySuccess(response) {
        $scope.deliveryAddresses = response.data.data;

      }, function myError(response) {
        alert("Get all delivery address fail.");
      });
  }

  // get all menu
  $scope.getOrderList = function () {
    $http.get($scope.URL + "/api/orders/get/all/orderList")
      .then(function mySuccess(response) {
        $scope.orderList = response.data.data;

      }, function myError(response) {
        alert("Get all menu fail.");
      });
  }

  $scope.showOrderHistoryDetail = function(date){
    $http.get($scope.URL + "/api/orders/get/orderByDate/"+date)
      .then(function mySuccess(response) {
        $scope.orders = response.data.data;
        console.log($scope.orders);

      }, function myError(response) {
        alert("Get all menu fail.");
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





