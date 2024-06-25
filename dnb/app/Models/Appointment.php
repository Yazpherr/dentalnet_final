<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory;

    protected $fillable = ['doctor_id', 'patient_id', 'schedule_id', 'date', 'reason'];

    public function doctor() {
        return $this->belongsTo(Dentist::class);
    }

    public function patient() {
        return $this->belongsTo(Patient::class);
    }

    public function schedule() {
        return $this->belongsTo(Schedule::class);
    }


}
