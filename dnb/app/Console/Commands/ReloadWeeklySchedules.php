<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Schedule;
use Carbon\Carbon;

class ReloadWeeklySchedules extends Command
{
    protected $signature = 'schedules:reload';
    protected $description = 'Recarga los horarios semanales de los doctores cada viernes por la noche';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $this->info('Recargando horarios semanales...');

        // Definir el intervalo de tiempo
        $daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        $startTime = '08:00:00';
        $endTime = '17:00:00';
        $breakTime = 10; // minutos de descanso
        $appointmentDuration = 30; // minutos por cita

        // Calcular los horarios
        foreach ($daysOfWeek as $day) {
            $currentStartTime = Carbon::parse($startTime);
            $currentEndTime = Carbon::parse($endTime);

            while ($currentStartTime->diffInMinutes($currentEndTime, false) > 0) {
                // Crear un nuevo horario
                Schedule::create([
                    'doctor_id' => 1, // Asegúrate de ajustar esto según sea necesario
                    'day' => $day,
                    'start_time' => $currentStartTime->toTimeString(),
                    'end_time' => $currentStartTime->addMinutes($appointmentDuration)->toTimeString(),
                    'status' => 'available',
                ]);

                // Añadir el tiempo de descanso
                $currentStartTime->addMinutes($breakTime);
            }
        }

        $this->info('Horarios recargados correctamente.');
    }
}
