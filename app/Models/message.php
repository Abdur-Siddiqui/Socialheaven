<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class message extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'chatroom_id',
        'content'
    ];

    public function chatUser():BelongsTo
    {
        return $this->belongsTo(chatUser::class);
    }


    
    public function chatRoom():BelongsTo
    {
        return $this->belongsTo(chatRoom::class);
    }

}

?>
