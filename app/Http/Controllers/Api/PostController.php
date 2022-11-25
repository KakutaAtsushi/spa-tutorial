<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index(): JsonResponse
    {
        $posts = Post::all();
        return response()->json($posts, 200);
    }

    public function create(Request $request): JsonResponse
    {
        $post = new Post;
        $post->name = $request->input("name");
        $post->content = $request->input("content");
        $post->save();
        return response()->json($post, 200);
    }

    public function edit(Request $request)
    {
        return Post::find($request->input("id"));
    }

    public function update(Request $request)
    {
        $post = Post::find($request->input("id"));
        $post->name = $request->input("name");
        $post->content = $request->input("content");
        $post->save();
        return Post::all();
    }

    public function delete(Request $request)
    {
        $post = Post::find($request->input("id"));
        $post->delete();
        return Post::all();
    }
}
