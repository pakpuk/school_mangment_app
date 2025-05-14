<?php

namespace App\Http\Controllers;

use App\Models\Exam;
use App\Models\ExamRecord;
use App\Models\Student;
use Illuminate\Http\Request;
use App\Http\Requests\ExamRequest;

class ExamController extends Controller
{
    public function index()
    {
        $exams = Exam::with(['classRoom', 'subject'])->get();
        return response()->json($exams);
    }

    public function store(ExamRequest $request)
    {
        $exam = Exam::create($request->validated());
        
        // Create exam records for all students in the class
        $students = Student::whereHas('classes', function($query) use ($request) {
            $query->where('class_room_id', $request->class_room_id);
        })->get();

        foreach ($students as $student) {
            ExamRecord::create([
                'exam_id' => $exam->id,
                'student_id' => $student->id,
                'status' => 'pending'
            ]);
        }

        return response()->json($exam->load(['classRoom', 'subject']), 201);
    }

    public function show(Exam $exam)
    {
        return response()->json($exam->load(['classRoom', 'subject']));
    }

    public function update(ExamRequest $request, Exam $exam)
    {
        $exam->update($request->validated());
        return response()->json($exam->load(['classRoom', 'subject']));
    }

    public function destroy(Exam $exam)
    {
        $exam->examRecords()->delete();
        $exam->delete();
        return response()->json(null, 204);
    }

    public function getRecords(Exam $exam)
    {
        $records = ExamRecord::with('student')
            ->where('exam_id', $exam->id)
            ->get();
        return response()->json($records);
    }

    public function updateRecord(Request $request, ExamRecord $record)
    {
        $validated = $request->validate([
            'status' => 'required|in:absent,present,pending,graded',
            'marks_obtained' => 'nullable|numeric|min:0',
            'remarks' => 'nullable|string'
        ]);

        $record->update($validated);
        return response()->json($record);
    }
} 