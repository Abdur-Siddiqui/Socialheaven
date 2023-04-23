<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chatroom extends Model
{
    use HasFactory;

    protected $fillable = [
        'creator_id',
        'name',
        'description',
        'is_private',
        'password',
    ];

    protected $hidden = [
        'password',
    ];

    protected $casts = [
        'is_private' => 'boolean',
    ];

    public function creator()
    {
        return $this->belongsTo(User::class, 'creator_id');
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_chatroom');
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }
}
