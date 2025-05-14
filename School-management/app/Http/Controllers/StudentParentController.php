<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStudentParentRequest;
use App\Http\Requests\UpdateStudentParentRequest;
use App\Http\Resources\StudentParentResource;
use App\Models\StudentParent;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Hash;
use App\Models\Student;
use App\Models\ExamRecord;
use App\Http\Requests\StudentParentRequest;

class StudentParentController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index(Request $request): AnonymousResourceCollection
  {
    $columns = $request->get('columns');
    $parents = !empty($columns) ? StudentParent::all($columns) : StudentParent::all();
    return StudentParentResource::collection($parents);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(StoreStudentParentRequest $request)
  {
    $formFields = $request->validated();
    $formFields['password'] = Hash::make($formFields['password']);
    $formFields['last_login_date'] = new \DateTime();
    $parent = StudentParent::create($formFields);
    $response = new StudentParentResource($parent);
    return response()->json([
      'parent' => $response,
      'message' => __('Parent created successfully')
    ]);
  }

  /**
   * Display the specified resource.
   */
  public function show(StudentParent $studentParent)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(UpdateStudentParentRequest $request, StudentParent $parent)
  {
    $formFields = $request->validated();
    $formFields['password'] = Hash::make($formFields['password']);
    $parent->update($formFields);
    return response()->json([
      'parent' => $parent,
      'message' => __('Parent updated successfully')
    ]);
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(StudentParent $parent)
  {
    $parent->delete();

    return new StudentParentResource($parent);
  }

  public function getChildren(Request $request)
  {
    $children = $request->user()->children()
      ->with(['currentClass', 'examRecords'])
      ->get();
    return response()->json($children);
  }

  public function getChildExamResults(Request $request, Student $student)
  {
    // Verify that the authenticated parent has access to this student
    if (!$request->user()->children()->where('students.id', $student->id)->exists()) {
      return response()->json(['message' => 'Unauthorized'], 403);
    }

    $examResults = ExamRecord::with(['exam.subject', 'exam.classRoom'])
      ->where('student_id', $student->id)
      ->get();

    return response()->json($examResults);
  }

  public function getChildAttendance(Request $request, Student $student)
  {
    // Verify that the authenticated parent has access to this student
    if (!$request->user()->children()->where('students.id', $student->id)->exists()) {