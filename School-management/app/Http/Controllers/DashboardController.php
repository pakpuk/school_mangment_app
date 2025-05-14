<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\Teacher;
use App\Models\ClassRoom;
use App\Models\Subject;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    public function stats(): JsonResponse
    {
        $stats = [
            'students' => Student::count(),
            'teachers' => Teacher::count(),
            'classes' => ClassRoom::count(),
            'subjects' => Subject::count(),
        ];

        return response()->json($stats);
    }
} 