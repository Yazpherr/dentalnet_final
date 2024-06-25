<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Patient;
use App\Models\Schedule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Mail\AppointmentConfirmation;
use Illuminate\Support\Facades\Mail;

class AppointmentController extends Controller
{
    // Función para obtener todas las citas asociadas al doctor autenticado
    public function getAppointmentsByDoctor()
    {
        try {
            $doctorId = auth()->user()->id; // Obtiene el ID del doctor autenticado

            // Obtener citas del doctor
            $appointments = Appointment::where('doctor_id', $doctorId)->get();

            return response()->json($appointments, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error fetching doctor appointments', 'message' => $e->getMessage()], 500);
        }
    }
    public function index()
    {
        try {
            $appointments = Appointment::all();
            return response()->json($appointments, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error fetching appointments'], 500);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'doctor_id' => 'required|exists:dentists,id',
            'patient_id' => 'required|exists:patients,id',
            'schedule_id' => 'required|exists:schedules,id',
            'date' => 'required|date',
            'reason' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        try {
            $appointment = Appointment::create($request->all());
            return response()->json($appointment, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error creating appointment'], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'date' => 'sometimes|required|date',
            'reason' => 'sometimes|required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        try {
            $appointment = Appointment::findOrFail($id);
            $appointment->update($request->all());
            return response()->json($appointment, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error updating appointment'], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $appointment = Appointment::findOrFail($id);
            $appointment->delete();
            return response()->json(null, 204);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error deleting appointment'], 500);
        }
    }

    // Método para obtener los slots disponibles
    public function getAvailableSchedules()
    {
        try {
            $schedules = Schedule::where('status', 'available')->get();
            return response()->json($schedules, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error fetching available schedules'], 500);
        }
    }

    // // Método para reservar una cita
    // public function bookAppointment(Request $request)
    // {
    //     $validator = Validator::make($request->all(), [
    //         'schedule_id' => 'required|exists:schedules,id',
    //         'reason' => 'required|string|max:255',
    //         'patient_id' => 'required|exists:patients,id',
    //     ]);

    //     if ($validator->fails()) {
    //         return response()->json(['error' => $validator->errors()], 400);
    //     }

    //     try {
    //         $schedule = Schedule::findOrFail($request->schedule_id);

    //         if ($schedule->status !== 'available') {
    //             return response()->json(['error' => 'Schedule is not available'], 400);
    //         }

    //         // Aquí convertimos 'day' a una fecha válida
    //         $date = $this->convertDayToDate($schedule->day);

    //         // Actualizamos el estado del schedule a unavailable
    //         $schedule->status = 'unavailable';
    //         $schedule->save();

    //         // Creamos la cita
    //         $appointment = Appointment::create([
    //             'doctor_id' => $schedule->doctor_id,
    //             'patient_id' => $request->patient_id,
    //             'schedule_id' => $request->schedule_id,
    //             'date' => $date, // Usamos la fecha convertida
    //             'reason' => $request->reason,
    //         ]);

    //         return response()->json($appointment, 201);
    //     } catch (\Illuminate\Database\QueryException $e) {
    //         return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
    //     } catch (\Exception $e) {
    //         return response()->json(['error' => 'General error: ' . $e->getMessage()], 500);
    //     }
    // }

    // Dentro de la función bookAppointment
    public function bookAppointment(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'schedule_id' => 'required|exists:schedules,id',
            'reason' => 'required|string|max:255',
            'patient_id' => 'required|exists:patients,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        try {
            $schedule = Schedule::findOrFail($request->schedule_id);

            if ($schedule->status !== 'available') {
                return response()->json(['error' => 'Schedule is not available'], 400);
            }

            $date = $this->convertDayToDate($schedule->day);
            $schedule->status = 'unavailable';
            $schedule->save();

            $appointment = Appointment::create([
                'doctor_id' => $schedule->doctor_id,
                'patient_id' => $request->patient_id,
                'schedule_id' => $request->schedule_id,
                'date' => $date,
                'reason' => $request->reason,
            ]);

            // Información del correo
            $appointmentDetails = [
                'patient_name' => $appointment->patient->name,
                'date' => $appointment->date,
                'doctor_name' => $appointment->doctor->name,
                'reason' => $appointment->reason,
            ];

            // Enviar correo
            Mail::to($appointment->patient->user->email)->send(new AppointmentConfirmation($appointmentDetails));

            return response()->json($appointment, 201);
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        } catch (\Exception $e) {
            return response()->json(['error' => 'General error: ' . $e->getMessage()], 500);
        }
    }

    // Función para convertir el nombre del día a una fecha válida
    private function convertDayToDate($dayOfWeek)
    {
        $daysOfWeek = [
            'Monday' => 1,
            'Tuesday' => 2,
            'Wednesday' => 3,
            'Thursday' => 4,
            'Friday' => 5,
        ];

        if (!isset($daysOfWeek[$dayOfWeek])) {
            throw new \Exception("Invalid day of week: $dayOfWeek");
        }

        $dayOfWeekNumber = $daysOfWeek[$dayOfWeek];
        $currentDayOfWeekNumber = date('N'); // 1 (for Monday) through 7 (for Sunday)
        $daysUntilNext = ($dayOfWeekNumber - $currentDayOfWeekNumber + 7) % 7;
        $daysUntilNext = $daysUntilNext === 0 ? 7 : $daysUntilNext;

        return date('Y-m-d', strtotime("+$daysUntilNext days"));
    }

    // Método para obtener las citas del paciente autenticado
    public function getPatientAppointments()
    {
        try {
            $userId = auth()->user()->id; // Obtiene el ID del usuario autenticado
            $patient = Patient::where('user_id', $userId)->first(); // Obtiene el paciente asociado al usuario

            if (!$patient) {
                return response()->json(['error' => 'Patient not found'], 404);
            }

            $appointments = Appointment::where('patient_id', $patient->id)->get(); // Obtiene las citas del paciente
            return response()->json($appointments, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error fetching patient appointments'], 500);
        }
    }
}
