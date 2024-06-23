<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::table('appointments', function (Blueprint $table) {
            $table->renameColumn('slot_id', 'schedule_id');
        });
    }

    public function down() {
        Schema::table('appointments', function (Blueprint $table) {
            $table->renameColumn('schedule_id', 'slot_id');
        });
    }
};
