<?php

namespace App\Http\Controllers;
use App\Models\Dentist;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function index()
    {
        return response()->json(['message' => 'Welcome to the admin panel']);
    }

    public function getDentists()
{
    try {
        $dentists = Dentist::with('user')->get();
        return response()->json(['dentists' => $dentists], 200);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Failed to fetch dentists', 'message' => $e->getMessage()], 500);
    }
}
}
