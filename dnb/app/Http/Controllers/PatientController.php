<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Patient;
use Illuminate\Support\Facades\Auth;

class PatientController extends Controller
{
    public function updateProfile(Request $request)
    {
        $request->validate([
            'dni' => 'nullable|string|max:20|unique:patients,dni,' . Auth::id(),
            'age' => 'nullable|integer',
            'gender' => 'nullable|string|max:10',
            'phone_number' => 'nullable|string|max:20',
            'medical_conditions' => 'nullable|string',
            'oral_health_level' => 'nullable|integer|min:0|max:100'
        ]);

        $patient = Patient::updateOrCreate(
            ['user_id' => Auth::id()],
            [
                'dni' => $request->dni,
                'age' => $request->age,
                'gender' => $request->gender,
                'phone_number' => $request->phone_number,
                'medical_conditions' => $request->medical_conditions,
                'oral_health_level' => $request->oral_health_level ?? 0,
            ]
        );

        return response()->json(['message' => 'Profile updated successfully', 'patient' => $patient]);
    }

    public function updatePatientAsDoctor(Request $request, $id)
{
    $request->validate([
        'dni' => 'nullable|string|max:20|unique:patients,dni,' . $id,
        'age' => 'nullable|integer',
        'gender' => 'nullable|string|max:10',
        'phone_number' => 'nullable|string|max:20',
        'medical_conditions' => 'nullable|string',
        'oral_health_level' => 'nullable|integer|min:0|max:100'
    ]);

    $patient = Patient::findOrFail($id);
    $patient->update($request->all());

    return response()->json(['message' => 'Patient updated successfully', 'patient' => $patient]);
}

// En PatientController.php
public function getProfile()
{
    try {
        $patient = Patient::with('user')->where('user_id', Auth::id())->first();
        if (!$patient) {
            return response()->json(['error' => 'Patient not found'], 404);
        }
        return response()->json(['patient' => $patient], 200);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Failed to fetch profile', 'message' => $e->getMessage()], 500);
    }
}

public function getPatients()
{
    $patients = Patient::with('user')->get();  // Incluye la relación con el usuario si es necesario

    return response()->json(['patients' => $patients]);
}

public function getPatientsForAdmin()
{
    try {
        $patients = Patient::with('user')->get();
        return response()->json(['patients' => $patients], 200);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Failed to fetch patients', 'message' => $e->getMessage()], 500);
    }
}




}
