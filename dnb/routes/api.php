<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\PatientController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

# Rutas
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('register', [AuthController::class, 'register']);
Route::middleware(['auth:api', 'role:admin'])->post('register-doctor', [AuthController::class, 'registerDoctor']);

Route::post('login', [AuthController::class, 'login']);
Route::middleware('auth:api')->get('me', [AuthController::class, 'me']);

Route::middleware('auth:api')->post('logout', [AuthController::class, 'logout']); // Ruta para logout



Route::middleware(['auth:api', 'role:admin'])->group(function () {
    Route::get('/admin', [AdminController::class, 'index']);
});

Route::middleware(['auth:api', 'role:doctor'])->group(function () {
    Route::get('/doctor', [DoctorController::class, 'index']);
});

Route::middleware(['auth:api', 'role:patient'])->group(function () {
    Route::get('/patient', [PatientController::class, 'index']);
});



