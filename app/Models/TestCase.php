<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class TestCase extends Model
{
    use HasFactory;

    protected $fillable = [
        'input',
        'expected_output',
        'lab_id',
    ];

    public function lab(): HasOne
    {
        return $this->hasOne(Lab::class);
    }
}
