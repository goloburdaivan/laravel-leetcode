<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InvitationLog extends Model
{
    use HasFactory;

    protected $table = 'invitation_log';

    protected $fillable = [
        'user_id',
        'course_id',
        'expires_at',
        'token',
        'confirmed',
    ];
}
