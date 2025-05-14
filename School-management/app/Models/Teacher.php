<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'address',
        'subject_specialization',
        'joining_date',
        'qualification',
        'gender',
    ];

    protected $casts = [
        'joining_date' => 'date',
    ];

    public function subjects()
    {
        return $this->hasMany(Subject::class);
    }

    public function classes()
    {
        return $this->belongsToMany(ClassRoom::class, 'teacher_classes');
    }
}
