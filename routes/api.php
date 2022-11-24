<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::group(["middleware" => "api"], function () {
    Route::get("posts", "App\\Http\\Controllers\\Api\\PostController@index");
    Route::post('post/create', 'App\Http\Controllers\Api\PostController@create');
});
