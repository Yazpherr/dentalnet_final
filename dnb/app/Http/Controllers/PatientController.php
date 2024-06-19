<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PatientController extends Controller
{
    public function index()
    {
        return response()->json(['message' => 'Welcome to the patient panel']);
    }
}
