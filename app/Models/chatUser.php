<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;


class chatUser extends Model
{
    use HasFactory;

    protected $fillable = [
        'userName',
        'email',
        'password'
    ];


    public function chatrooms():HasMany
    {
        return $this->hasMany(chatRoom::class);
    }

    public function messages():HasMany
    {
        return $this->hasMany(message::class);
    }
}
?>