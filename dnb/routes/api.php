<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\DentistController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\PrescriptionController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\AppointmentController;
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
    Route::get('/patients', [PatientController::class, 'getPatients']);
    Route::get('/admin/patients', [PatientController::class, 'getPatientsForAdmin']); // Nueva ruta para admin
});

// Rutas para doctores
Route::middleware(['auth:api', 'role:doctor'])->group(function () {
    Route::get('/doctor', [DentistController::class, 'index']);
    Route::get('/doctor/patients', [PatientController::class, 'getPatients']);  // lista de pacientes
    Route::post('/doctor/update-patient/{id}', [PatientController::class, 'updatePatientAsDoctor']); // modificar paciente del lado del doctor
    // modulos recetas
    Route::post('/create-prescription', [PrescriptionController::class, 'createPrescription']); // crear receta
    Route::get('/doctor/prescriptions', [PrescriptionController::class, 'getAllPrescriptions']); // obtener todas las recetas

    // Rutas para horarios y citas
    Route::get('/schedules', [ScheduleController::class, 'index']);
    Route::post('/schedules', [ScheduleController::class, 'store']);
    Route::put('/schedules/{id}', [ScheduleController::class, 'update']);
    Route::delete('/schedules/{id}', [ScheduleController::class, 'destroy']);
    Route::get('/appointments', [AppointmentController::class, 'index']);
    Route::post('/appointments', [AppointmentController::class, 'store']);
    Route::put('/appointments/{id}', [AppointmentController::class, 'update']);
    Route::delete('/appointments/{id}', [AppointmentController::class, 'destroy']);
});

// Rutas para pacientes
Route::middleware(['auth:api', 'role:patient'])->group(function () {
    Route::get('/patient', [PatientController::class, 'index']);
    Route::post('/update-profile', [PatientController::class, 'updateProfile']);
    Route::get('/patient/prescriptions', [PrescriptionController::class, 'getPatientPrescriptions']);
    Route::get('/patient/profile', [PatientController::class, 'getProfile']);  // Nueva ruta para obtener el perfil del pacientes
// citas medicas
    Route::get('/available-schedules', [ScheduleController::class, 'getAvailableSchedules']);
    Route::post('/book-appointment', [AppointmentController::class, 'bookAppointment']);



});

