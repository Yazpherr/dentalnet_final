<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\Validator;


class AuthController extends Controller
{


    public function register(Request $request)
{
    // Valida la solicitud
    $validator = Validator::make($request->all(), [
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users',
        'password' => 'required|string|min:10|confirmed',
        'role' => 'patient'
    ]);

    // Si la validación falla, devuelve una respuesta con los errores
    if ($validator->fails()) {
        return response()->json([
            'success' => false,
            'message' => 'Validation errors',
            'errors' => $validator->errors()
        ], 422);
    }

    // Crear el usuario
    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
        'role' => $request->role,
    ]);

    // Generar el token
    $token = JWTAuth::fromUser($user);

    // Devolver la respuesta con el usuario y el token
    return response()->json([
        'success' => true,
        'user' => $user,
        'token' => $token
    ], 201);
}

public function registerDoctor(Request $request)
{
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users',
        'password' => 'required|string|min:8|confirmed',
    ]);

    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
        'role' => 'doctor',
    ]);

    return response()->json(['message' => 'Doctor registered successfully'], 201);
}


public function login(Request $request)
{
    // Valida la solicitud
    $validator = Validator::make($request->all(), [
        'email' => 'required|string|email|max:255',
        'password' => 'required|string|min:10',
    ]);

    // Si la validación falla, devuelve una respuesta con los errores
    if ($validator->fails()) {
        return response()->json([
            'success' => false,
            'message' => 'Validation errors',
            'errors' => $validator->errors()
        ], 422);
    }

    // Obtiene solo las credenciales de email y password
    $credentials = $request->only('email', 'password');

    try {
        // Intenta autenticar al usuario y generar un token
        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'Invalid credentials'], 400);
        }
    } catch (JWTException $e) {
        // Maneja errores de JWT
        return response()->json(['error' => 'Could not create token'], 500);
    }

    // Devuelve la respuesta con el token
    return response()->json(compact('token'));
}

    public function me()
    {
        return response()->json(Auth::user());
    }
}

