<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::group(["middleware" => "api"], function () {
    Route::get("posts", "App\\Http\\Controllers\\Api\\PostController@index");
    Route::post('post/create', 'App\Http\Controllers\Api\PostController@create');
    Route::post('edit', 'App\Http\Controllers\Api\PostController@edit');
    Route::post('update', 'App\Http\Controllers\Api\PostController@update');
    Route::post('delete', 'App\Http\Controllers\Api\PostController@delete');
});
