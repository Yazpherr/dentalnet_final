<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class DoctorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'Dr. Philiphe Doe',
            'email' => 'f.doctor@example.com',
            'password' => Hash::make('1234123412'), // Asegúrate de usar una contraseña segura en un entorno real
            'role' => 'doctor',
        ]);
    }
}
