<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ClassRoomRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required|string|max:100',
            'section' => 'required|string|max:50',
            'capacity' => 'required|integer|min:1|max:100',
            'academic_year' => 'required|string|max:20',
            'description' => 'nullable|string|max:500',
            'teacher_ids' => 'sometimes|array',
            'teacher_ids.*' => 'exists:teachers,id',
            'subject_ids' => 'sometimes|array',
            'subject_ids.*' => 'exists:subjects,id',
        ];
    }
} 