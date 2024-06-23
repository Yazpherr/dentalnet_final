<?php

namespace App\Http\Controllers;

use App\Models\Schedule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ScheduleController extends Controller
{
    public function index()
    {
        try {
            $schedules = Schedule::all();
            return response()->json($schedules, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error fetching schedules'], 500);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'doctor_id' => 'required|exists:dentists,id',
            'day' => 'required|string',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'status' => 'required|string|in:available,unavailable',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        try {
            $schedule = Schedule::create($request->all());
            return response()->json($schedule, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error creating schedule'], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'day' => 'sometimes|required|string',
            'start_time' => 'sometimes|required|date_format:H:i',
            'end_time' => 'sometimes|required|date_format:H:i|after:start_time',
            'status' => 'sometimes|required|string|in:available,unavailable',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        try {
            $schedule = Schedule::findOrFail($id);
            $schedule->update($request->all());
            return response()->json($schedule, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error updating schedule'], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $schedule = Schedule::findOrFail($id);
            $schedule->delete();
            return response()->json(null, 204);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error deleting schedule'], 500);
        }
    }

    public function getAvailableSchedules()
{
    try {
        $schedules = Schedule::where('status', 'available')->get();
        return response()->json($schedules, 200);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Error fetching available schedules'], 500);
    }
}

}
