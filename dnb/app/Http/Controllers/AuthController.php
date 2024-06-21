<?php
namespace App\Http\Controllers;

use App\Models\Dentist;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Patient;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // Valida la solicitud
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:10|confirmed'
        ]);

        // Si la validación falla, devuelve una respuesta con los errores
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        // Iniciar una transacción
        DB::beginTransaction();

        try {
            // Crear el usuario
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => 'patient',
            ]);

            // Crear el paciente con solo el user_id
            $patient = Patient::create([
                'user_id' => $user->id,
                'dni' => null, // Valores iniciales nulos
                'age' => null,
                'gender' => null,
                'phone_number' => null,
                'medical_conditions' => null,
                'oral_health_level' => 0,
            ]);

            // Confirmar la transacción
            DB::commit();

            // Generar el token
            $token = JWTAuth::fromUser($user);

            // Devolver la respuesta con el usuario y el token
            return response()->json([
                'success' => true,
                'user' => $user,
                'token' => $token
            ], 201);
        } catch (\Exception $e) {
            // Revertir la transacción en caso de error
            DB::rollback();
            return response()->json([
                'success' => false,
                'message' => 'Failed to register user',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function registerDentist(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8|confirmed',
                'dni' => 'required|string|max:20|unique:dentists',
                'dedication' => 'required|string|max:255',
            ]);

            // Crear el usuario en la tabla 'users'
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => 'doctor',
            ]);

            // Crear el dentista en la tabla 'dentists'
            $dentist = Dentist::create([
                'user_id' => $user->id,
                'dni' => $request->dni,
                'name' => $request->name,
                'email' => $request->email,
                'password' => $user->password, // Usamos la misma contraseña hasheada
                'dedication' => $request->dedication,
            ]);

            return response()->json(['message' => 'Dentist registered successfully', 'dentist' => $dentist], 201);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to register dentist', 'message' => $e->getMessage()], 500);
        }
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

            $user = Auth::user(); // Obtener el usuario autenticado
        } catch (JWTException $e) {
            // Maneja errores de JWT
            return response()->json(['error' => 'Could not create token'], 500);
        }

        // Devuelve la respuesta con el token y el usuario
        return response()->json(compact('token', 'user'));
    }

    public function logout(Request $request)
    {
        try {
            Auth::guard('api')->logout();
            return response()->json(['message' => 'Successfully logged out']);
        } catch (JWTException $exception) {
            return response()->json(['error' => 'Failed to log out, please try again.'], 500);
        }
    }

    public function me()
    {
        return response()->json(Auth::user());
    }
}
