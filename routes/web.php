<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ChatroomController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

//Route::get('/dashboard', function () {
//    return Inertia::render('Dashboard');
//})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Routes for authenticated users
Route::middleware(['auth', 'verified'])->group(function () {
    // Chatroom list (dashboard)
    Route::get('/dashboard', [ChatroomController::class, 'index'])->name('dashboard');

    // Create chatroom
    Route::get('/chatrooms/create', [ChatroomController::class, 'create'])->name('chatrooms.create');
    Route::post('/chatrooms', [ChatroomController::class, 'store'])->name('chatrooms.store');

    // Edit chatroom
    Route::get('/chatrooms/{chatroom}/edit', [ChatroomController::class, 'edit'])->middleware('can:update,chatroom')->name('chatrooms.edit');
    Route::put('/chatrooms/{chatroom}', [ChatroomController::class, 'update'])->middleware('can:update,chatroom')->name('chatrooms.update');

    // Delete chatroom
    Route::delete('/chatrooms/{chatroom}', [ChatroomController::class, 'destroy'])->middleware('can:delete,chatroom')->name('chatrooms.destroy');

    // Join chatroom
    Route::get('/chatrooms/join', [ChatroomController::class, 'showJoinForm'])->name('chatrooms.joinForm');
    Route::post('/chatrooms/{chatroom}/join', [ChatroomController::class, 'join'])->name('chatrooms.join');

    // Show chatroom
    Route::get('/chatrooms/{chatroom}', [ChatroomController::class, 'show'])->middleware('can:view,chatroom')->name('chatrooms.show');

    // Leave chatroom
    Route::post('/chatrooms/{chatroom}/leave', [ChatroomController::class, 'leave'])->name('chatrooms.leave');

    // Chatroom messages
    Route::post('chatrooms/{chatroom}/messages', [ChatroomController::class, 'storeMessage'])->name('chatrooms.messages.store');
    Route::delete('chatrooms/{chatroom}/messages/{message}', [ChatroomController::class, 'destroyMessage'])->name('chatrooms.messages.destroy');
});

require __DIR__.'/auth.php';
