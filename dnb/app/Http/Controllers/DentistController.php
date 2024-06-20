<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DentistController extends Controller
{
    public function index()
    {
        return response()->json(['message' => 'Welcome to the doctor panel']);
    }
}
