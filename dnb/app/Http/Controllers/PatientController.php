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

}
