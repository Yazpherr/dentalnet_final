<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Prescription extends Model
{
    use HasFactory;

    protected $fillable = [
        'doctor_id',
        'patient_id',
        'id_prescription',
        'prescription_date',
        'name_patient',
        'name_medic',
        'creation_date',
        'expiration_date',
        'name_drug',
        'instructions_use',
        'dni' // Añadir este campo
    ];

    public function doctor()
    {
        return $this->belongsTo(Dentist::class, 'doctor_id');
    }

    public function patient()
    {
        return $this->belongsTo(Patient::class, 'patient_id');
    }
}
