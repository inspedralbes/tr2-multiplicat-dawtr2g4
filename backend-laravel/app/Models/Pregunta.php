<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Categoria;
use App\Models\Resposta;

class Pregunta extends Model
{
    use HasFactory;

    public function categoria() {
        return $this->belongsTo(Categoria::class, 'categoria_id');
    }

    public function respostes() {
        return $this->hasMany(Resposta::class, 'pregunta_id')->inRandomOrder();
    }
}
