<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('class_rooms', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('section');
            $table->integer('capacity');
            $table->string('academic_year');
            $table->text('description')->nullable();
            $table->timestamps();
        });

        // Create pivot table for students and classes
        Schema::create('student_classes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained()->onDelete('cascade');
            $table->foreignId('class_room_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });

        // Create pivot table for teachers and classes
        Schema::create('teacher_classes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('teacher_id')->constrained()->onDelete('cascade');
            $table->foreignId('class_room_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('teacher_classes');
        Schema::dropIfExists('student_classes');
        Schema::dropIfExists('class_rooms');
    }
}; 