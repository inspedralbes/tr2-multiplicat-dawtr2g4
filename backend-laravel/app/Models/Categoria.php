<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Pregunta;

class Categoria extends Model
{
    use HasFactory;

    public function preguntes() {
        return $this->hasMany(Pregunta::class, 'categoria_id');
    }
}
