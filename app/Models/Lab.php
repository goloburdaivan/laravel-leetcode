<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Lab extends Model
{
    use HasFactory;

    protected $fillable = [
        'starter_code',
        'description',
        'creator_id',
    ];

    public function teacher(): HasOne
    {
        return $this->hasOne(Teacher::class);
    }

    public function testCases(): HasMany
    {
        return $this->hasMany(TestCase::class);
    }
}
