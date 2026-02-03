<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class LowStockController extends Controller
{
    public function index()
    {
        // Get products with stock less than 10
        $lowStockProducts = Product::where('stock', '<', 10)
            ->orderBy('stock', 'asc')
            ->get()
            ->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'stock' => $product->stock ?? 0,
                    'threshold' => 10, // Can be customized per product later
                    'category' => $product->category ?? 'Uncategorized',
                    'image' => $product->featured_image
                        ? Storage::url($product->featured_image)
                        : null,
                ];
            });

        $stats = [
            'lowStockCount' => $lowStockProducts->where('stock', '>', 0)->count(),
            'outOfStockCount' => Product::where('stock', 0)->count(),
            'totalUnitsLeft' => $lowStockProducts->sum('stock'),
        ];

        return Inertia::render('low-stock', [
            'lowStockProducts' => $lowStockProducts,
            'stats' => $stats,
        ]);
    }
}
