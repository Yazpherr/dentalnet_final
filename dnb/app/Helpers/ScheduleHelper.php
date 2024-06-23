<?php

namespace App\Helpers;

use DateTime;
use App\Models\Schedule;

class ScheduleHelper
{
    public static function createWeeklyScheduleForDoctor($doctorId, $startHour = '08:00', $endHour = '17:00', $interval = '30 minutes', $break = '10 minutes')
    {
        $daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        $schedules = [];
        $currentDate = new DateTime('next Monday');

        foreach ($daysOfWeek as $day) {
            $startTime = new DateTime($currentDate->format('Y-m-d') . ' ' . $startHour);
            $endTime = new DateTime($currentDate->format('Y-m-d') . ' ' . $endHour);

            while ($startTime < $endTime) {
                $schedule = [
                    'doctor_id' => $doctorId,
                    'day' => $day,
                    'start_time' => $startTime->format('H:i:s'),
                    'end_time' => $startTime->modify("+$interval")->format('H:i:s'),
                    'status' => 'available',
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
                $schedules[] = $schedule;

                // Agregar tiempo de descanso
                $startTime->modify("+$break");
            }
            $currentDate->modify('+1 day');
        }

        return $schedules;
    }

    public static function storeWeeklySchedules($doctorId)
    {
        $schedules = self::createWeeklyScheduleForDoctor($doctorId);
        Schedule::insert($schedules);
    }
}
