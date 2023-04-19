<?php
use App\Models\chatUser;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
class chatRoom extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'creater_id'
    ];


    public function chatUser():BelongsTo
    {
        return $this->belongsTo(chatUser::class);
    }

    public function messages():HasMany
    {
        return $this->hasMany(message::class);
    }
}
?>