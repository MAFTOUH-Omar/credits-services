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
        Schema::create('request_credits', function (Blueprint $table) {
            $table->id();
            $table->string('username');
            $table->decimal('amount', 10, 2);
            $table->unsignedBigInteger('service_id');
            $table->unsignedBigInteger('user_id');
            $table->decimal('price', 10, 2)->nullable();
            $table->text('reject_reason')->nullable();
            $table->string('payment_status')->default('not paid');
            $table->string('status')->default('in progress');
            $table->timestamps();

            $table->foreign('service_id')->references('id')->on('services')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('request_credits');
    }
};
