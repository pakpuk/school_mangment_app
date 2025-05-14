<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\StudentParentController;
use App\Http\Controllers\ExamController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Dashboard stats
    Route::get('/dashboard/stats', [DashboardController::class, 'stats']);

    // Student routes
    Route::apiResource('students', StudentController::class);

    // Teacher routes
    Route::apiResource('teachers', TeacherController::class);

    // Exam routes
    Route::apiResource('exams', ExamController::class);
    Route::get('exams/{exam}/records', [ExamController::class, 'getRecords']);
    Route::patch('exam-records/{record}', [ExamController::class, 'updateRecord']);

    // Add other resource routes here (classes, subjects)
});

Route::middleware(['auth:sanctum', 'ability:admin'])->prefix('admin')->group(static function () {
  Route::apiResources([
    'parents' => StudentParentController::class,
  ]);
});

Route::middleware(['auth:sanctum', 'ability:teacher'])->prefix('teacher')->group(static function () {
});

// Parent portal routes
Route::middleware(['auth:sanctum', 'role:parent'])->group(function () {
    Route::get('/parent/children', [StudentParentController::class, 'getChildren']);
    Route::get('/parent/children/{student}/exam-results', [StudentParentController::class, 'getChildExamResults']);
    Route::get('/parent/children/{student}/attendance', [StudentParentController::class, 'getChildAttendance']);
    Route::get('/parent/children/{student}/schedule', [StudentParentController::class, 'getChildSchedule']);
    Route::get('/parent/children/{student}/fees', [StudentParentController::class, 'getChildFees']);
});

require __DIR__ . '/auth.php';
