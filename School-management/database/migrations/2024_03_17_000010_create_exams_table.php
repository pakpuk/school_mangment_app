<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('exams', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->dateTime('exam_date');
            $table->integer('duration'); // in minutes
            $table->integer('total_marks');
            $table->foreignId('class_room_id')->constrained()->onDelete('cascade');
            $table->foreignId('subject_id')->constrained()->onDelete('cascade');
            $table->enum('status', ['scheduled', 'ongoing', 'completed'])->default('scheduled');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('exams');
    }
}; 