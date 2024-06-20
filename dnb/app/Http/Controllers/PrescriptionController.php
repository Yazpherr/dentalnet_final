<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Prescription;
use App\Models\Patient;
use App\Models\User;
use App\Models\Dentist;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class PrescriptionController extends Controller
{
    public function createPrescription(Request $request)
    {
        try {
            $request->validate([
                'dni' => 'required|string|max:20|exists:patients,dni',
                'id_prescription' => 'required|string|max:255',
                'prescription_date' => 'nullable|date',
                'name_drug' => 'required|string|max:255',
                'instructions_use' => 'required|string',
                'expiration_date' => 'nullable|date'
            ]);

            // Buscar paciente por DNI
            $patient = Patient::where('dni', $request->dni)->first();

            if (!$patient) {
                return response()->json(['error' => 'Patient not found'], 404);
            }

            // Obtener el nombre del paciente desde la tabla users
            $user = User::find($patient->user_id);
            if (!$user || !$user->name) {
                return response()->json(['error' => 'Patient name not found in users table'], 404);
            }

            // Verificar si el doctor existe en la tabla dentists
            $doctor = Dentist::where('user_id', Auth::id())->first();
            if (!$doctor) {
                return response()->json(['error' => 'Doctor not found in dentists table'], 404);
            }

            // Crear la receta
            $prescription = Prescription::create([
                'doctor_id' => $doctor->id, // Asignar el doctor_id del registro en dentists
                'patient_id' => $patient->id,
                'dni' => $request->dni,
                'id_prescription' => $request->id_prescription,
                'prescription_date' => $request->prescription_date,
                'name_patient' => $user->name,
                'name_medic' => $doctor->name, // Nombre del doctor desde la tabla dentists
                'creation_date' => now(),
                'expiration_date' => $request->expiration_date,
                'name_drug' => $request->name_drug,
                'instructions_use' => $request->instructions_use
            ]);

            return response()->json(['message' => 'Prescription created successfully', 'prescription' => $prescription], 201);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to create prescription', 'message' => $e->getMessage()], 500);
        }
    }

    public function getPatientPrescriptions()
    {
        $prescriptions = Prescription::where('patient_id', Auth::id())->get();
        return response()->json(['prescriptions' => $prescriptions]);
    }
}
