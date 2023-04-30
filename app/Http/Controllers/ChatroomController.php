<?php

namespace App\Http\Controllers;

use App\Models\Chatroom;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ChatroomController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        // Get chatrooms created by the user and chatrooms the user has joined
        $chatrooms = $user->chatrooms->merge($user->createdChatrooms);

        return Inertia::render('Dashboard', [
            'auth'      => [
                'user' => $user,
            ],
            'chatrooms' => $chatrooms,
        ]);
    }

    public function create()
    {
        return Inertia::render('Chatroom/Create', [
            'auth' => [
                'user' => auth()->user(),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'        => 'required|string|max:255|unique:chatrooms',
            'description' => 'nullable|string',
            'is_private'  => 'required|boolean',
            'password'    => 'nullable|required_if:is_private,true|string',
        ]);

        $data['creator_id'] = auth()->id();

        // Hash the password if provided
        if (isset($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        }

        $chatroom = Chatroom::create($data);

        return redirect()->route('dashboard');
    }

    public function update(Request $request, Chatroom $chatroom)
    {
        $data = $request->validate([
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'password'    => 'nullable|string',
        ]);

        $chatroom->update($data);

        return redirect()->route('dashboard');
    }

    public function destroy(Chatroom $chatroom)
    {
        $this->authorize('delete', $chatroom);

        $chatroom->delete();

        return redirect()->route('dashboard');
    }

    public function showJoinForm()
    {
        return Inertia::render('Chatroom/Join');
    }

    public function join(Request $request, Chatroom $chatroom)
    {
        if ($chatroom->is_private) {
            $request->validate([
                'password' => 'required|string',
            ]);

            if (!Hash::check($request->password, $chatroom->password)) {
                return back()->withErrors(['password' => 'Incorrect password']);
            }
        }

        $chatroom->users()->attach(auth()->id());

        return redirect()->route('chatrooms.show', $chatroom);
    }

    public function leave(Chatroom $chatroom)
    {
        $chatroom->users()->detach(auth()->id());

        return redirect()->route('dashboard');
    }

    public function show(Chatroom $chatroom)
    {
        $this->authorize('view', $chatroom);

        $messages = $chatroom->messages()->with('sender')->get();

        return Inertia::render('Chatroom/Show', [
            'auth'     => [
                'user' => auth()->user(),
            ],
            'chatroom' => $chatroom,
            'messages' => $messages,
        ]);
    }

    public function storeMessage(Request $request, Chatroom $chatroom)
    {
        $this->authorize('view', $chatroom);

        $data = $request->validate([
            'content' => 'required|string|max:1000',
            'image'   => 'nullable|image|max:2000',
        ]);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            Storage::disk('s3')->put($file->getClientOriginalName(), file_get_contents($file));
            $data['image_path'] = 'https://'.config('filesystems.disks.s3.bucket').'.s3.'.config(
                    'filesystems.disks.s3.region'
                ).'.amazonaws.com/'.$file->getClientOriginalName();
        }

        $data['sender_id'] = auth()->id();
        $data['chatroom_id'] = $chatroom->id;
        $message = Message::create($data);

        return back();
    }

    public function destroyMessage(Chatroom $chatroom, Message $message)
    {
        $this->authorize('delete', $message);

        $message->delete();

        return back();
    }
}
