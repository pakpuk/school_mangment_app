<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exam extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'exam_date',
        'duration',
        'total_marks',
        'class_room_id',
        'subject_id',
        'status' // scheduled, ongoing, completed
    ];

    protected $casts = [
        'exam_date' => 'datetime',
        'duration' => 'integer',
        'total_marks' => 'integer'
    ];

    public function classRoom()
    {
        return $this->belongsTo(ClassRoom::class);
    }

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }

    public function examRecords()
    {
        return $this->hasMany(ExamRecord::class);
    }
}
