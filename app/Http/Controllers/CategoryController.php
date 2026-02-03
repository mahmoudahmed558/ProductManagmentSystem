<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        // Get all unique categories with product counts
        $categories = Product::selectRaw('category, COUNT(*) as count')
            ->whereNotNull('category')
            ->groupBy('category')
            ->get()
            ->map(function ($item, $index) {
                // Assign different gradient colors
                $colors = [
                    'from-cyan-400 to-blue-600',
                    'from-pink-500 to-rose-600',
                    'from-orange-400 to-red-500',
                    'from-purple-400 to-indigo-600',
                    'from-emerald-400 to-green-600',
                    'from-lime-400 to-green-500',
                    'from-yellow-400 to-amber-500',
                    'from-fuchsia-400 to-pink-600',
                ];
                
                return [
                    'id' => $index + 1,
                    'name' => $item->category,
                    'count' => $item->count,
                    'color' => $colors[$index % count($colors)],
                ];
            });

        $stats = [
            'totalCategories' => $categories->count(),
            'totalProducts' => Product::whereNotNull('category')->count(),
            'avgPerCategory' => $categories->count() > 0 
                ? round(Product::whereNotNull('category')->count() / $categories->count(), 1) 
                : 0,
        ];

        return Inertia::render('categories', [
            'categories' => $categories,
            'stats' => $stats,
        ]);
    }
}
