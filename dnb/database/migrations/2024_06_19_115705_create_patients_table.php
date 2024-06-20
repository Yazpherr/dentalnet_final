<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('patients', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users');
            $table->string('dni')->unique();
            $table->integer('age')->nullable(); // Edad
            $table->string('gender')->nullable(); // Género
            $table->string('phone_number')->nullable(); // Número telefónico
            $table->text('medical_conditions')->nullable(); // Condiciones médicas relevantes
            $table->integer('oral_health_level')->default(0); // Nivel de salud bucal
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('patients');
    }
};

