<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use Illuminate\Http\Request;
use App\Http\Requests\TeacherRequest;

class TeacherController extends Controller
{
    public function index()
    {
        $teachers = Teacher::with(['subjects', 'classes'])->get();
        return response()->json($teachers);
    }

    public function store(TeacherRequest $request)
    {
        $teacher = Teacher::create($request->validated());
        return response()->json($teacher, 201);
    }

    public function show(Teacher $teacher)
    {
        return response()->json($teacher->load(['subjects', 'classes']));
    }

    public function update(TeacherRequest $request, Teacher $teacher)
    {
        $teacher->update($request->validated());
        return response()->json($teacher);
    }

    public function destroy(Teacher $teacher)
    {
        $teacher->delete();
        return response()->json(null, 204);
    }
} 