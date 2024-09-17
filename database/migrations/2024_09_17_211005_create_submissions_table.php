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
        Schema::create('submissions', function (Blueprint $table) {
            $table->id();
            $table->text('source_code');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('lab_id');
            $table->string('status');
            $table->text('output')->nullable();
            $table->unsignedBigInteger('tests_passed')->default(0);
            $table->boolean('passed')->default(false);
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('lab_id')->references('id')->on('labs');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('submissions');
    }
};
