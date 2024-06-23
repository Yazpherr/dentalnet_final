<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Dentist; // Importa la clase Dentist

class Schedule extends Model
{
    use HasFactory;

    protected $fillable = ['doctor_id', 'day', 'start_time', 'end_time', 'status'];


    public function doctor()
    {
        return $this->belongsTo(Dentist::class);
    }
}
