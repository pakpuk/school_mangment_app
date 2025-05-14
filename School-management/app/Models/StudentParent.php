<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class StudentParent extends Authenticatable
{
  use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

  protected $fillable = [
    'firstname',
    'lastname',
    'date_of_birth',
    'last_login_date',
    'gender',
    'blood_type',
    'address',
    'phone',
    'email',
    'password',
  ];
  protected $hidden = [
    'password',
    'email_verified_at',
    'last_login_date',
    'deleted_at',
    'remember_token',
    'created_at',
  ];
  protected $casts = [
    'date_of_birth' => 'date:Y-m-d',
  ];
  protected $appends = ['role', 'name'];

  public function getRoleAttribute()
  {
    return 'parent';
  }

  public function getNameAttribute()
  {
    return $this->firstname . ' ' . $this->lastname;
  }

  public function children()
  {
    return $this->belongsToMany(Student::class, 'student_parent_relationships')
      ->withTimestamps();
  }
}
