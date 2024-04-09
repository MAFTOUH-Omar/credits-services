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
        Schema::create('payment', function (Blueprint $table) {
            $table->id();
            $table->decimal('amount', 8, 2); 
            $table->text('type');
            $table->string('currency');
            $table->unsignedBigInteger('user_id');
            $table->string('equivalence');
            $table->string('preuve'); 
            $table->string('status')->default('in progress');
            $table->text('reject_reason');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payment');
    }
};
