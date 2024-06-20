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


// Grupo de middleware para autenticación
Route::middleware(['auth:api'])->group(function () {
    // Ruta para obtener el perfil del paciente (solo para pacientes)
    Route::middleware('role:patient')->get('/patient', [PatientController::class, 'index']);

    // Ruta para actualizar el perfil del paciente (solo para pacientes)
    Route::middleware('role:patient')->post('/update-profile', [PatientController::class, 'updateProfile']);
});

