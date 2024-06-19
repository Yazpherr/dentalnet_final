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
        Schema::create('prescriptions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('doctor_id')->constrained('dentists');
            $table->foreignId('patient_id')->constrained('patients');
            $table->string('id_prescription');
            $table->timestamp('prescription_date')->nullable();
            $table->string('name_patient');
            $table->string('name_medic');
            $table->timestamp('creation_date')->nullable();
            $table->timestamp('expiration_date')->nullable();
            $table->string('name_drug');
            $table->text('instructions_use');
            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prescriptions');
    }
};
