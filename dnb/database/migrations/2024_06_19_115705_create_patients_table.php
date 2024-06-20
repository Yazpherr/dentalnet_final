<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('patients', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users');
            $table->string('dni')->unique();
            $table->string('name');
            $table->string('email');
            $table->string('phone_number')->nullable();
            $table->string('gender')->nullable();
            $table->integer('age')->nullable();
            $table->text('medical_conditions')->nullable();
            $table->integer('oral_health_level')->default(0);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('patients');
    }
};
