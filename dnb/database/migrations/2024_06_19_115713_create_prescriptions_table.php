<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePrescriptionsTable extends Migration
{
    public function up()
    {
        Schema::create('prescriptions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('doctor_id')->constrained('dentists')->onDelete('cascade');
            $table->foreignId('patient_id')->constrained()->onDelete('cascade');
            $table->string('dni');
            $table->string('id_prescription');
            $table->date('prescription_date')->nullable();
            $table->string('name_patient');
            $table->string('name_medic');
            $table->date('creation_date');
            $table->date('expiration_date')->nullable();
            $table->string('name_drug');
            $table->text('instructions_use');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('prescriptions');
    }
}
