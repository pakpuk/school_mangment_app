<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'address',
        'class',
        'date_of_birth',
        'gender',
    ];

    protected $casts = [
        'date_of_birth' => 'date',
    ];

    public function classes()
    {
        return $this->belongsToMany(ClassRoom::class, 'student_classes');
    }

    public function subjects()
    {
        return $this->belongsToMany(Subject::class, 'student_subjects');
    }
} 