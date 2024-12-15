<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Lab extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'starter_code',
        'description',
        'due_date',
        'creator_id',
        'course_id',
        'language',
        'execution_time',
        'memory_limit',
    ];

    protected $casts = [
        'due_date' => 'datetime:Y-m-d',
    ];

    public function teacher(): HasOne
    {
        return $this->hasOne(Teacher::class);
    }

    public function testCases(): HasMany
    {
        return $this->hasMany(TestCase::class);
    }

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    public function tips(): HasMany
    {
        return $this->hasMany(LabTip::class);
    }

    public function submissions(): HasMany
    {
        return $this->hasMany(Submission::class);
    }
}
