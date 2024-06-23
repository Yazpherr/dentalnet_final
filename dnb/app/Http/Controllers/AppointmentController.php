<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Schedule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AppointmentController extends Controller
{
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

    // Método para reservar una cita
    public function bookAppointment(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'schedule_id' => 'required|exists:schedules,id',
            'reason' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        try {
            $schedule = Schedule::findOrFail($request->schedule_id);
            $schedule->status = 'unavailable';
            $schedule->save();

            $appointment = Appointment::create([
                'doctor_id' => $schedule->doctor_id,
                'patient_id' => auth()->user()->id, // Suponiendo que el paciente está autenticado
                'schedule_id' => $request->schedule_id,
                'date' => $schedule->day,
                'reason' => $request->reason,
            ]);

            return response()->json($appointment, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error booking appointment'], 500);
        }
    }
}
