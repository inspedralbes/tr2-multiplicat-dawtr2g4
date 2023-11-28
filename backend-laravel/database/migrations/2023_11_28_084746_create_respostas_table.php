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
        Schema::create('respostas', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->boolean('correcta');
            $table->text('text_resposta');
            $table->foreignId('pregunta_id')->constrained('preguntas')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('respostas');
    }
};
