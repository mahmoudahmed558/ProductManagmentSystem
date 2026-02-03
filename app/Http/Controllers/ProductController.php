<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Product::query();

        // Search functionality
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('sku', 'like', "%{$search}%");
            });
        }

        // Filter by category
        if ($request->has('category') && $request->category) {
            $query->where('category', $request->category);
        }

        // Get paginated products
        $products = $query->latest()->paginate(12)->through(function ($product) {
            $product->featured_image = $product->featured_image ? Storage::url($product->featured_image) : null;

            return $product;
        });

        // Get unique categories for filter
        $categories = Product::whereNotNull('category')->distinct()->pluck('category');

        return Inertia::render('products/index', [
            'products' => $products,
            'categories' => $categories,
            'filters' => $request->only(['search', 'category']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia::render('products/product-form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        $validated = $request->validated();

        $image = null;
        $imageName = null;

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $imageName = $file->getClientOriginalName();
            $image = $file->store('products', 'public');
        }

        $product = Product::create([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'price' => $validated['price'],
            'category' => $validated['category'] ?? null,
            'stock' => $validated['stock'] ?? 0,
            'sku' => $validated['sku'] ?? null,
            'featured_image' => $image,
            'featured_image_original_name' => $imageName,
        ]);

        if ($product) {
            return redirect()->route('products.index')->with('success', 'Product created successfully.');
        }

        return redirect()->route('products.create')->with('error', 'Product creation failed.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        $product->featured_image = $product->featured_image ? Storage::url($product->featured_image) : null;

        return Inertia::render('products/product-form', ['product' => $product]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        $validated = $request->validated();

        $image = $product->featured_image;
        $imageName = $product->featured_image_original_name;

        // Handle new image upload
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($product->featured_image && Storage::disk('public')->exists($product->featured_image)) {
                Storage::disk('public')->delete($product->featured_image);
            }

            $file = $request->file('image');
            $imageName = $file->getClientOriginalName();
            $image = $file->store('products', 'public');
        }

        $product->update([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'price' => $validated['price'],
            'category' => $validated['category'] ?? $product->category,
            'stock' => $validated['stock'] ?? $product->stock,
            'sku' => $validated['sku'] ?? $product->sku,
            'featured_image' => $image,
            'featured_image_original_name' => $imageName,
        ]);

        return redirect()->route('products.index')->with('success', 'Product updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        if ($product) {
            // Delete image if exists
            if ($product->featured_image && Storage::disk('public')->exists($product->featured_image)) {
                Storage::disk('public')->delete($product->featured_image);
            }

            $product->delete();

            return redirect()->back()->with('success', 'Product deleted successfully.');
        }

        return redirect()->back()->with('error', 'Product deletion failed.');
    }
}
