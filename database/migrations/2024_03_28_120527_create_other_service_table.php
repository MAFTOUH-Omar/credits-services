<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('other_service', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('action');
            $table->unsignedBigInteger('user_id');
            $table->string('username')->nullable();
            $table->string('password')->nullable();
            $table->text('reject_reason')->nullable();
            $table->string('credits')->nullable();
            $table->decimal('price', 10, 2)->nullable();
            $table->string('status')->default('in progress');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('other_service');
    }
};
