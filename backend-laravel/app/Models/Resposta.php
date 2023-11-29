<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Pregunta;

class Resposta extends Model
{
    use HasFactory;

    public function pregunta() {
        return $this->belongsTo(Pregunta::class, 'pregunta_id');
    }
}
