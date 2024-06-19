<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'felipe-admin',
            'email' => 'f.admin@example.com',
            'password' => Hash::make('1234123412'),
            'role' => 'admin'
        ]);
        
        User::create([
            'name' => 'eduardo-admin',
            'email' => 'e.admin@example.com',
            'password' => Hash::make('1234123412'),
            'role' => 'admin'
        ]);
    }
}
