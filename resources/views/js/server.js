'use strict';

var appModule = angular.module('ionicApp.server', []);

//配置
appModule.run(['$rootScope', '$http', function($rootScope, $http) {
    $rootScope.config = [];
    $rootScope.clientWidth = $(window).width();
    $rootScope.imgHeight = getSlideImgH();
    $http.get("getConfig")
        .success(
            function(data, status, header, config){
                $rootScope.config = data;
                document.title = data.title;
                dd('module:run');
                dd(data);
            }
        ).error(
        function(data){
            onError(data);
        }
    );
}])
