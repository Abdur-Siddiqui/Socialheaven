<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateChatroomsTable extends Migration
{
    public function up()
    {
        Schema::create('chatrooms', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('creator_id');
            $table->string('name');
            $table->text('description')->nullable();
            $table->boolean('is_private')->default(false);
            $table->string('password')->nullable();
            $table->timestamps();

            $table->foreign('creator_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('chatrooms');
    }
}
