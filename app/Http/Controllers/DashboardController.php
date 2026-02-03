<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'totalProducts' => Product::count(),
            'totalValue' => Product::sum('price'),
            'lowStock' => Product::where('stock', '<', 10)->where('stock', '>', 0)->count(),
            'outOfStock' => Product::where('stock', 0)->count(),
            'categories' => Product::whereNotNull('category')->distinct('category')->count('category'),
        ];

        // Recent products (last 7 days)
        $recentProducts = Product::where('created_at', '>=', now()->subDays(7))->count();

        // Top category
        $topCategory = Product::selectRaw('category, COUNT(*) as count')
            ->whereNotNull('category')
            ->groupBy('category')
            ->orderByDesc('count')
            ->first();

        // Average product value
        $avgValue = $stats['totalProducts'] > 0 
            ? round($stats['totalValue'] / $stats['totalProducts'], 2) 
            : 0;

        // Weekly data for chart (last 7 days)
        $weeklyData = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = now()->subDays($i);
            $count = Product::whereDate('created_at', $date->toDateString())->count();
            $weeklyData[] = [
                'day' => $date->format('D'),
                'count' => $count,
                'percentage' => $stats['totalProducts'] > 0 ? round(($count / $stats['totalProducts']) * 100, 1) : 0
            ];
        }

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'recentProducts' => $recentProducts,
            'topCategory' => $topCategory?->category ?? 'Not set',
            'avgValue' => $avgValue,
            'weeklyData' => $weeklyData,
        ]);
    }
}
