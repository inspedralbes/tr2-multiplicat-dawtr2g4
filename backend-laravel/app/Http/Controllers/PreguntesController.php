<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pregunta;

class PreguntesController extends Controller
{

    /**
     * Busca una pregunta aleatoria per categoria i dificultat
     */
    public function search(Request $request)
    {
        $dadesValidades = $request->validate([
            'dificultat' => 'required|integer|between:1,3',
            'categoria' => 'required|integer|between:1,6',
            'preguntesAnteriors' => 'sometimes|array',
            'preguntesAnteriors.*' => 'integer'
        ]);

        // Query de la pregunta filtrant per 'categoria' i 'dificultat' excloent ids de 'preguntesAnteriors'
        $pregunta = Pregunta::where('dificultat', $dadesValidades['dificultat'])
            ->where('categoria_id', $dadesValidades['categoria'])
            ->whereNotIn('id', $dadesValidades['preguntesAnteriors'])
            ->with('respostes')
            ->inRandomOrder()
            ->first();

        if ($pregunta) {
            return response()->json($pregunta);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'No s\'ha trobat la pregunta'
            ], 404);
        }
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
