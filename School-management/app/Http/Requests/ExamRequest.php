<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ExamRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'exam_date' => 'required|date',
            'duration' => 'required|integer|min:1',
            'total_marks' => 'required|integer|min:1',
            'class_room_id' => 'required|exists:class_rooms,id',
            'subject_id' => 'required|exists:subjects,id',
            'status' => 'required|in:scheduled,ongoing,completed'
        ];
    }
} 