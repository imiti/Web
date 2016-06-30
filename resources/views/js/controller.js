'use strict';

var appModule = angular.module('ionicApp.controller', ['ionicApp.server']);

//主页
appModule.controller('homeController',['$scope', '$http', '$ionicSlideBoxDelegate', '$sce', '$timeout', '$window', function($scope, $http, $ionicSlideBoxDelegate, $sce, $timeout, $window){
    $scope.activityItem = [];

    $scope.doRefresh = function () {
        $http.get("indexItem")
            .success(
                function (data, status, header, config) {
                    $scope.activityItem = data.activityItem;
                    $scope.itemList = makeItemList(data.homeItem, $window.innerWidth);

                    //更新轮播
                    $ionicSlideBoxDelegate.$getByHandle('delegateHandler').update();
                    $ionicSlideBoxDelegate.$getByHandle('delegateHandler').loop(true);
                }
            ).error(
            function (data) {
                onError(data);
            }).finally(function () {
                // 停止广播ion-refresher
                $scope.$broadcast('scroll.refreshComplete');
            }
        );
    };

    $scope.doRefresh();

    $scope.index = 0;
    $scope.go = function(index){
        $ionicSlideBoxDelegate.$getByHandle('delegateHandler').slide(index);
    };

    //页面切换后轮播可以继续
    $scope.$on('$ionicView.beforeEnter',function(){
        $ionicSlideBoxDelegate.$getByHandle('delegateHandler').start();
    })
}]);

//分类商品展示
appModule.controller('categoryController',['$scope','$stateParams', '$http', '$window', function($scope, $stateParams, $http, $window){
    $scope.categoryID = $stateParams.categoryID;
    $scope.categoryNam = $stateParams.categoryNam;

    $scope.doRefresh = function () {
        $http.get("categoryInfo/" + $scope.categoryID)
            .success(
                function(data, status, header, config){
                    $scope.itemList = makeItemList(data, $window.innerWidth);
                }
            ).error(
            function(data){
                onError(data);
            }).finally(function() {
                // 停止广播ion-refresher
                $scope.$broadcast('scroll.refreshComplete');
            }
        );
    };

    $scope.doRefresh();
}]);

//物品详情
appModule.controller('iteminfoController', ['$scope','$stateParams', '$ionicHistory', '$ionicSlideBoxDelegate', '$http', '$sce', '$ionicPopover', '$cookieStore', 'carItemNumFactory', function($scope, $stateParams, $ionicHistory, $ionicSlideBoxDelegate, $http, $sce, $ionicPopover, $cookieStore, carItemNumFactory){
    $scope.itemID = $stateParams.itemID;
    $scope.itemInfo = [];
    $scope.slideImg = [];
    $scope.cur_price = '';
    $scope.buynum = '';
    $scope.isCancel = true;
    $scope.isBuy = true;
    $scope.PopData = {};

    //数据获取
    $scope.doRefresh = function () {
        $http.get("itemInfo/" + $scope.itemID)
            .success(
                function (data, status, header, config) {
                    if (data[0].showimg) {
                        $scope.slideImg = data[0].showimg.split(";");
                    }
                    if (data[0].spec) {
                        $scope.itemSpec = data[0].spec.split(";");
                    }

                    $scope.itemInfo = data[0];

                    var f = parseFloat(data[0].cur_price);
                    $scope.cur_price = '惊爆价:￥' + f.toFixed(2);
                    $scope.buynum = '已售:' + data[0].buynum;

                    $ionicSlideBoxDelegate.$getByHandle('delegateHandler').update();
                    $ionicSlideBoxDelegate.$getByHandle('delegateHandler').loop(true);
                }
            ).error(
            function (data) {
                onError(data);
            }).finally(function() {
                // 停止广播ion-refresher
                $scope.$broadcast('scroll.refreshComplete');
            }
        );
    };

    $scope.doRefresh();

    //数字验证
    $scope.checkInput = function (strVal) {
        checkInt(strVal, true);
    };
    //弹出选项
    $scope.popover = $ionicPopover.fromTemplateUrl('resources/views/templates/buyitempopup.html', {
        scope: $scope
    });
    $ionicPopover.fromTemplateUrl('resources/views/templates/buyitempopup.html', {
        scope: $scope
    }).then(function(popover) {
        $scope.popover = popover;
    });
    //取消
    $scope.cancel = function() {
        $scope.isCancel = true;
        $scope.popover.hide();
    };
    //确定
    $scope.confirm = function() {
        if (!checkInt($scope.PopData.chooseNum, true)) {
            return;
        }

        $scope.isCancel = false;
        $scope.popover.hide();
    };
    // 在隐藏浮动框后执行
    $scope.$on('popover.hidden', function() {
        // 执行代码
        if ($scope.isCancel){
            return;
        }

        if ($scope.isBuy){
            alert('发起购买');
        }
        else {
            var car = $cookieStore.get('car');
            if(!car){
                car = [];
            }

            for (var i = 0; i < car.length; i++){
                if (car[i].id == $scope.itemInfo.id
                    && car[i].spec == $scope.PopData.itemSpec)
                {
                    car[i].num += parseInt($scope.PopData.chooseNum);
                    $cookieStore.put("car", car);
                    carItemNumFactory.setCarItemNum(getCarItemNum(car));

                    return;
                }
            }

            var info = {};
            info.id = $scope.itemInfo.id;
            info.name = $scope.itemInfo.name;
            info.spec = $scope.PopData.itemSpec;
            info.num = parseInt($scope.PopData.chooseNum);
            info.price = $scope.itemInfo.cur_price;

            car.push(info);
            $cookieStore.put("car", car);

            carItemNumFactory.setCarItemNum(getCarItemNum(car));
        }
    });

    //购买
    $scope.buy = function($event){
        $scope.isBuy = true;
        $scope.popover.show($event);
        if($scope.itemSpec){
            $scope.PopData.itemSpec = $scope.itemSpec[0];
        }

        $scope.PopData.chooseNum = 1;
    };
    //加进购物车
    $scope.addInCar = function($event){
        $scope.isBuy = false;
        $scope.popover.show($event);
        if($scope.itemSpec){
            $scope.PopData.itemSpec = $scope.itemSpec[0];
        }

        $scope.PopData.chooseNum = 1;
    };

    $scope.index = 0;
    $scope.go = function(index){
        $ionicSlideBoxDelegate.$getByHandle('delegateHandler').slide(index);
    };
    $scope.goBack = function () {
        $ionicHistory.goBack();
    };
    $scope.$on('$ionicView.beforeEnter',function(){
        $ionicSlideBoxDelegate.$getByHandle('delegateHandler').start();
    })
}]);

//用户中心
appModule.controller('uerCenterController', ['$scope', function($scope){
    $scope.groups = [];
    for (var i=0; i<5; i++) {
        $scope.groups[i] = {
            name: i,
            items: [],
            show: false
        };
        for (var j=0; j<3; j++) {
            $scope.groups[i].items.push(i + '-' + j);
        }
    }

    /*
     * if given group is the selected group, deselect it
     * else, select the given group
     */
    $scope.toggleGroup = function(group) {
        group.show = !group.show;
    };
    $scope.isGroupShown = function(group) {
        return group.show;
    };

    $scope.doRefresh = function () {
        $scope.$broadcast('scroll.refreshComplete');
    };

    $scope.doRefresh();
}]);

//购物车
appModule.controller('carController', ['$scope', '$cookieStore', '$ionicPopup', 'carItemNumFactory', function($scope, $cookieStore, $ionicPopup, carItemNumFactory){
    var carInfo = $cookieStore.get('car');
    $scope.itemInCar = carInfo;
    $scope.priceTotal = getCarPriceTotal(carInfo);
    $scope.showCarInfo = false;
    var bPopuped = false;//解决ie会弹出2次

    if (carInfo && carInfo.length > 0){
        $scope.showCarInfo = true;
    }

    $scope.checkout = function(){
        carInfo = $cookieStore.get('car');
        if (!carInfo || 0 == carInfo.length){
            return;
        }

        if (bPopuped){
            return;
        }

        bPopuped = true;

        alert('发起购买');

        bPopuped = false;
    };

    //清空购物车
    $scope.clear = function(){
        carInfo = $cookieStore.get('car');
        if (!carInfo || 0 == carInfo.length){
            return;
        }

        if (bPopuped){
            return;
        }

        bPopuped = true;
        var confirmPopup = $ionicPopup.confirm({
            title: '',
            template: '确定清空购物车?'
        });
        confirmPopup.then(function(res) {
            bPopuped = false;
            if(res) {
                $cookieStore.remove('car');
                $scope.itemInCar = [];
                carItemNumFactory.setCarItemNum(0);
                $scope.priceTotal = 0;
                $scope.showCarInfo = false;
            }
        });
    };

    //修改数量
    $scope.numChange = function (itemID, itemNum) {
        carInfo = $cookieStore.get('car');
        if (!carInfo || 0 == carInfo.length){
            return;
        }

        if (!checkInt(itemNum, true)){
            return;
        }

        var iNum = parseInt(itemNum);
        for (var i = 0; i < carInfo.length; i++){
            if (carInfo[i].id == itemID){
                carInfo[i].num = iNum;
                $cookieStore.put("car", carInfo);
                carItemNumFactory.setCarItemNum(getCarItemNum(carInfo));
                $scope.priceTotal = getCarPriceTotal(carInfo);

                return;
            }
        }
    };

    //删除物品
    $scope.delete = function (itemID) {
        carInfo = $cookieStore.get('car');
        if (!carInfo || 0 == carInfo.length){
            return;
        }

        for (var i = 0; i < carInfo.length; i++){
            if (carInfo[i].id == itemID){
                carInfo.splice(i, 1);
                $cookieStore.put("car", carInfo);
                $scope.itemInCar = carInfo;
                carItemNumFactory.setCarItemNum(getCarItemNum(carInfo));
                $scope.priceTotal = getCarPriceTotal(carInfo);
                if (carInfo.length == 0){
                    $scope.showCarInfo = false;
                }

                return;
            }
        }
    }
}]);

appModule.controller('searchController', ['$scope', '$http', function ($scope, $http) {
    $scope.search = function (strVal) {
        if (!strVal){
            return;
        }
        if (0 == strVal.length){
            return;
        }
        if (checkStr(strVal)){
            return;
        }

        $http.get("search/" + strVal)
            .success(
                function(data, status, header, config){
                    $scope.searchData = data;
                }
            ).error(
            function(data){
                onError(data);
            }
        );
    }

    $scope.Categorys = [];
    $scope.doRefresh = function () {
        $http.get("categorys")
            .success(
                function(data, status, header, config){
                    $scope.Categorys = data;
                }
            ).error(
            function(data){
                onError(data);
            }).finally(function() {
                // 停止广播ion-refresher
                $scope.$broadcast('scroll.refreshComplete');
            }
        );
    };

    $scope.doRefresh();
}]);
