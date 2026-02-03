<?php

use App\Http\Controllers\AnalyticsController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LowStockController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

// Dashboard with real data
Route::get('dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

// Feature Pages with Controllers
Route::get('categories', [CategoryController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('categories');

Route::get('low-stock', [LowStockController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('low-stock');

Route::get('analytics', [AnalyticsController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('analytics');

Route::get('reports', function () {
    return Inertia::render('reports');
})->middleware(['auth', 'verified'])->name('reports');

require __DIR__.'/settings.php';

// --------------------- Product Routes ---------------------//

Route::resource('products', ProductController::class)->middleware(['auth', 'verified']);
