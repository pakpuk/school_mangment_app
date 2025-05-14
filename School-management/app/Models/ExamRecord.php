<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExamRecord extends Model
{
    use HasFactory;

    protected $fillable = [
        'exam_id',
        'student_id',
        'marks_obtained',
        'remarks',
        'status', // absent, present, pending, graded
        'submitted_at'
    ];

    protected $casts = [
        'marks_obtained' => 'float',
        'submitted_at' => 'datetime'
    ];

    public function exam()
    {
        return $this->belongsTo(Exam::class);
    }

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
