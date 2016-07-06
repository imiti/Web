<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::group([], function () {
    Route::get('/', 'ShopController@index');
    Route::get('getConfig', 'ShopController@getConfig');
    Route::get('categorys', 'ShopController@categorys');
    Route::get('indexItem', 'ShopController@indexItem');
    Route::get('loadMoreIndexItem/{page}', 'ShopController@loadMoreIndexItem');
    Route::get('categoryInfo/{id}/{page}', 'ShopController@categoryInfo');
    Route::get('itemInfo/{id}', 'ShopController@itemInfo');
    Route::get('itemName/{id}', 'ShopController@itemName');
    Route::get('itemContent/{id}', 'ShopController@itemContent');
    Route::get('itemEvaluate/{id}/{page}', 'ShopController@itemEvaluate');
    Route::get('search/{param}', 'ShopController@search');

    //admin
    Route::any('admin/login', 'Admin\LoginController@login');
    Route::get('admin/code', 'Admin\LoginController@code');
});

Route::group(['middleware' => ['admin.login'], 'prefix'=>'admin', 'namespace'=>'Admin'], function () {
    Route::any('upload', 'CommonController@upload');

    Route::get('index', 'IndexController@index');
    Route::get('quit', 'LoginController@quit');
    Route::any('pass', 'IndexController@pass');
    Route::get('info', 'IndexController@info');

    Route::post('category/changeOrder', 'CategoryController@changeOrder');
    Route::resource('category', 'CategoryController');

    Route::any('shop/searchbycate/{cate_id}', 'ShopController@searchbycate');
    Route::any('shop/searchbyname/{name}', 'ShopController@searchbyname');
    Route::resource('shop', 'ShopController');

    Route::get('user/index', 'UserController@index');


    Route::get('order/index', 'OrderController@index');
});
