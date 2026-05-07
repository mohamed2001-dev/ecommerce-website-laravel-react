<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(){
        $products = Product::with('category')->paginate(10);
        return response()->json($products) ;
    }
    public function store(Request $request)
{
    $fields = $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'nullable|string',
        'price' => 'required|numeric',
        'image' => 'nullable|string',
        'category_id' => 'required|exists:categories,id'
    ]);

    $product = Product::create($fields);

    return response()->json([
        'message' => 'Product created successfully',
        'product' => $product
        ], 201);
}
    public function show($id){
        $product = Product::findOrFail($id);
        return response()->json($product);
    }
    public function update(Request $request, $id)
{
    $fields = $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'nullable|string',
        'price' => 'required|numeric',
        'image' => 'nullable|string',
        'category_id' => 'required|exists:categories,id'
    ]);

    $product = Product::findOrFail($id);
    $product->update($fields);

    return response()->json([
        'message' => 'Product updated successfully',
        'product' => $product
    ]);
}
    public function destroy($id)
{
    $product = Product::findOrFail($id);
    $product->delete();

    return response()->json([
        'message' => 'Product deleted successfully'
    ], 200);
}
}
