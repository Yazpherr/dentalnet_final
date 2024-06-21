<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\DentistController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\PrescriptionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

# Rutas
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::middleware('auth:api')->get('me', [AuthController::class, 'me']);
Route::middleware('auth:api')->post('logout', [AuthController::class, 'logout']); // Ruta para logout


// Rutas para administradores
Route::middleware(['auth:api', 'role:admin'])->group(function () {
    Route::get('/admin', [AdminController::class, 'index']);
    Route::post('/register-dentist', [AuthController::class, 'registerDentist']);
    Route::get('/dentists', [AdminController::class, 'getDentists']);
});

// Rutas para doctores
Route::middleware(['auth:api', 'role:doctor'])->group(function () {
    Route::get('/doctor', [DentistController::class, 'index']);
    Route::post('/create-prescription', [PrescriptionController::class, 'createPrescription']);
    Route::post('/doctor/update-patient/{id}', [PatientController::class, 'updatePatientAsDoctor']);
    Route::get('/doctor/patients', [PatientController::class, 'getPatients']);
    
});

// Rutas para pacientes
Route::middleware(['auth:api', 'role:patient'])->group(function () {
    Route::get('/patient', [PatientController::class, 'index']);
    Route::post('/update-profile', [PatientController::class, 'updateProfile']);
    Route::get('/patient-prescriptions', [PrescriptionController::class, 'getPatientPrescriptions']);
});
