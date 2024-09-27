<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Submission extends Model
{
    use HasFactory;

    protected $fillable = [
        'source_code',
        'status',
        'user_id',
        'lab_id',
        'output',
        'tests_passed',
        'passed',
    ];

    protected $casts = [
        'passed' => 'bool',
        'created_at' => 'datetime:Y-m-d H-i-s',
    ];

    public function lab(): BelongsTo
    {
        return $this->belongsTo(Lab::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function testCases(): HasManyThrough
    {
        return $this->hasManyThrough(TestCase::class, Lab::class, 'id', 'lab_id', 'lab_id', 'id');
    }
}
