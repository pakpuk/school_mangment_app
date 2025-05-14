<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StudentRequest extends FormRequest
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
            'class' => 'required|string|max:50',
            'date_of_birth' => 'required|date',
            'gender' => 'required|in:male,female,other',
        ];

        if ($this->isMethod('post')) {
            $rules['email'] .= '|unique:students';
        } else {
            $rules['email'] .= '|unique:students,email,' . $this->student->id;
        }

        return $rules;
    }
} 