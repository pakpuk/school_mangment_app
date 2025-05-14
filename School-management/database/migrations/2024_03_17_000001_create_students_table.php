<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('phone')->nullable();
            $table->text('address')->nullable();
            $table->string('class');
            $table->date('date_of_birth');
            $table->enum('gender', ['male', 'female', 'other']);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('students');
    }
}; 