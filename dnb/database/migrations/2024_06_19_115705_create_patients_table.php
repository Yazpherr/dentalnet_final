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
            $table->string('dni')->nullable(); // Nullable
            $table->integer('age')->nullable(); // Nullable
            $table->string('gender')->nullable(); // Nullable
            $table->string('phone_number')->nullable(); // Nullable
            $table->text('medical_conditions')->nullable(); // Nullable
            $table->integer('oral_health_level')->default(0);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('patients');
    }
};
