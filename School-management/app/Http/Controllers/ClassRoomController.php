<?php

namespace App\Http\Controllers;

use App\Models\ClassRoom;
use Illuminate\Http\Request;
use App\Http\Requests\ClassRoomRequest;

class ClassRoomController extends Controller
{
    public function index()
    {
        $classes = ClassRoom::with(['students', 'teachers', 'subjects'])->get();
        return response()->json($classes);
    }

    public function store(ClassRoomRequest $request)
    {
        $class = ClassRoom::create($request->validated());
        
        if ($request->has('teacher_ids')) {
            $class->teachers()->sync($request->teacher_ids);
        }
        
        if ($request->has('subject_ids')) {
            $class->subjects()->sync($request->subject_ids);
        }

        return response()->json($class->load(['teachers', 'subjects']), 201);
    }

    public function show(ClassRoom $class)
    {
        return response()->json($class->load(['students', 'teachers', 'subjects']));
    }

    public function update(ClassRoomRequest $request, ClassRoom $class)
    {
        $class->update($request->validated());
        
        if ($request->has('teacher_ids')) {
            $class->teachers()->sync($request->teacher_ids);
        }
        
        if ($request->has('subject_ids')) {
            $class->subjects()->sync($request->subject_ids);
        }

        return response()->json($class->load(['teachers', 'subjects']));
    }

    public function destroy(ClassRoom $class)
    {
        $class->teachers()->detach();
        $class->subjects()->detach();
        $class->students()->detach();
        $class->delete();
        
        return response()->json(null, 204);
    }
} 