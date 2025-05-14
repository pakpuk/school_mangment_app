<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClassRoom extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'section',
        'capacity',
        'academic_year',
        'description',
    ];

    public function students()
    {
        return $this->belongsToMany(Student::class, 'student_classes');
    }

    public function teachers()
    {
        return $this->belongsToMany(Teacher::class, 'teacher_classes');
    }

    public function subjects()
    {
        return $this->belongsToMany(Subject::class, 'class_subjects');
    }
} 