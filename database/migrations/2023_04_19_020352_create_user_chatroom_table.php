<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserChatroomTable extends Migration
{
    public function up()
    {
        Schema::create('user_chatroom', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('chatroom_id');
            $table->timestamps();

            $table->primary(['user_id', 'chatroom_id']);
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('chatroom_id')->references('id')->on('chatrooms')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('user_chatroom');
    }
}
