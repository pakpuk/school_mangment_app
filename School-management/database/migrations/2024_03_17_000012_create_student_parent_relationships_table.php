<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('student_parent_relationships', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained()->onDelete('cascade');
            $table->foreignId('student_parent_id')->constrained()->onDelete('cascade');
            $table->enum('relationship_type', ['father', 'mother', 'guardian'])->default('guardian');
            $table->boolean('is_primary_contact')->default(false);
            $table->timestamps();

            // Ensure a student can't be linked to the same parent multiple times
            $table->unique(['student_id', 'student_parent_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('student_parent_relationships');
    }
}; 