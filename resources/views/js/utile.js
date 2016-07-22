
var bDebug = true;

function dd(data) {
    if (bDebug) {
        console.log(data);
    }
};

function onError(data) {
    layer.msg('加载页面出错,请稍后再试...');
    dd(data);
};

function checkInt(strVal, bLayer) {
    return true;
    if (0 == strVal.length){
        return false;
    }

    var strCheck = /^\+?[1-9][0-9]*$/;
    if (!strCheck.test(strVal)){
        if(bLayer){
            layer.msg('亲,请输入数字...');
        }
        return false;
    }

    var iNum = parseInt(strVal);
    if (0 >= iNum){
        if(bLayer){
            layer.msg('亲,数量必须大于0...');
        }
        return false;
    }

    return true;
}

function checkMobile(str) {
    var re = /^0?1[3|4|5|8][0-9]\d{8}$/;
    if (re.test(str)) {
        return true;
    } else {
        return false;
    }
}

function checkEmail(str){
    var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    if(re.test(str)){
        return true;
    }else{
        return false;
    }
}

function checkStr(str) {
    var re = /[\'.,:;*?~`!@#$%^&+=)(<>{}]|\]|\[|\/|\\\|"|\|/;
    if(re.test(str)){
        return true;
    }else{
        return false;
    }
}

function makeItemList(itemData, clientWidth) {
    var itemList = new Array;
    if (!itemData){
        return itemList;
    }

    var itemCount = itemData.length;
    var lineNum = parseInt(clientWidth / 160);//每列多少个
    var rowNum = Math.ceil(itemCount / lineNum);//多少行
    var iIndex = 0;

    for (var i = 0; i < rowNum; i++){
        var itemTmp = new Array;
        for (var j = 0; j < lineNum; j++){
            if (iIndex >= itemCount){
                itemList.push(itemTmp);
                return itemList;
            }

            itemTmp.push(itemData[iIndex]);
            iIndex++;
        }

        itemList.push(itemTmp);
    }

    return itemList;
}

function appendItemList(itemOldeData, itemNewData, clientWidth) {
    var lineNum = parseInt(clientWidth / 150);//每列多少个
    var oldItemNum = itemOldeData.length;
    var iAdded = 0;
    if (0 != oldItemNum){
        //补齐
        if (itemOldeData[oldItemNum - 1].length != lineNum){
            iAdded = lineNum - itemOldeData[oldItemNum - 1].length;
            for (var i = 0; i < iAdded; i++){
                itemOldeData[oldItemNum - 1].push(itemNewData[i]);
            }
        }
    }

    if (iAdded >= itemNewData.length){
        return itemOldeData;
    }

    while (true){
        var itemTmp = new Array;
        for (var j = 0; j < lineNum; j++){
            if (iAdded >= itemNewData.length){
                itemOldeData.push(itemTmp);
                return itemOldeData;
            }

            itemTmp.push(itemNewData[iAdded]);
            iAdded++;
        }

        itemOldeData.push(itemTmp);
        if (iAdded >= itemNewData.length) {
            break;
        }
    }

    return itemOldeData;
}

function getCarItemNum(carInfo) {
    var iNum = 0;
    if (!carInfo){
        return iNum;
    }

    for (i = 0; i < carInfo.length; i++){
        iNum += parseInt(carInfo[i].num);
    }

    return iNum;
}

function getCarPriceTotal(carInfo) {
    var iPrice = 0;
    if (!carInfo){
        return iPrice;
    }

    for (i = 0; i < carInfo.length; i++){
        iPrice += parseInt(carInfo[i].num) * parseInt(carInfo[i].price);
    }

    return iPrice;
}

function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    
    return uuid;
}

function getCityID(Citys, cityNam) {
    for (i = 0; i < Citys.length; i++){
        if (Citys[i].areaname == cityNam){
            return Citys[i].areano;
        }
    }
}

function parseEvaluates(Evaluates) {
    for (i = 0; i < Evaluates.length; i++){
        var iStar = Evaluates[i].star;
        var starArray = [];
        for (j = 0; j < iStar; j++){
            starArray.push(j);
        }
        
        Evaluates[i].star = starArray;
    }

    return Evaluates;
}

function pswMin() {
    return 6;
}

function pswMax() {
    return 12;
}

function errLogin()
{
    return 10000;
}

function removeOrder(orderID, orderList) {
    for (var i = 0; i < orderList.length; i++){
        if (orderList[i].id == orderID){
            orderList.splice(i, 1);
            break;
        }
    }

    return orderList;
}

function arrangeLogistics(logistics) {
    var lastDate = '';
    for (var i = 0; i < logistics.length; i++){
        var dateList = logistics[i].AcceptTime.split(" ");
        if (lastDate != dateList[0]){
            lastDate = dateList[0]
        }
        else {
            logistics[i].AcceptTime = dateList[1];
        }
    }

    return logistics;
}
