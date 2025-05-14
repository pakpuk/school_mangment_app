<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('exam_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('exam_id')->constrained()->onDelete('cascade');
            $table->foreignId('student_id')->constrained()->onDelete('cascade');
            $table->float('marks_obtained')->nullable();
            $table->text('remarks')->nullable();
            $table->enum('status', ['absent', 'present', 'pending', 'graded'])->default('pending');
            $table->timestamp('submitted_at')->nullable();
            $table->timestamps();

            // Ensure a student can't have multiple records for the same exam
            $table->unique(['exam_id', 'student_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('exam_records');
    }
}; 