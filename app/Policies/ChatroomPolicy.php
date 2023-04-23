<?php

namespace App\Policies;

use App\Models\Chatroom;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ChatroomPolicy
{
    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Chatroom $chatroom): bool
    {
        // Allow the user to view the chatroom if they are the creator or a member
        return $user->id === $chatroom->creator_id || $chatroom->users->contains($user->id);
    }

    public function delete(User $user, Chatroom $chatroom)
    {
        // Allow the user to delete the chatroom if they are the creator
        return $user->id === $chatroom->creator_id;
    }
}
