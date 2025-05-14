<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TeacherRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        $rules = [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:500',
            'subject_specialization' => 'required|string|max:100',
            'joining_date' => 'required|date',
            'qualification' => 'required|string|max:255',
            'gender' => 'required|in:male,female,other',
        ];

        if ($this->isMethod('post')) {
            $rules['email'] .= '|unique:teachers';
        } else {
            $rules['email'] .= '|unique:teachers,email,' . $this->teacher->id;
        }

        return $rules;
    }
} 