<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pregunta;
use App\Models\Resposta;
use App\Models\Categoria;

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

    public function searchCrud(Request $request){
        //$search = $request->search;
        $search = "Quina";
        $dificultat = 1;
        $categoria = 1;

        $categories = Categoria::all();
        $preguntes = Pregunta::where('text_pregunta', 'LIKE', "%{$search}%")
                                ->where('dificultat', 'LIKE', $dificultat)
                                ->where('categoria_id', 'LIKE', $categoria);
        dd($preguntes);

        return view('preguntes.index', ['preguntes' => $preguntes, 'categories' => $categories]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $preguntes = Pregunta::all();
        $categories = Categoria::all();

        return view('preguntes.index', ['preguntes' => $preguntes, 'categories' => $categories]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $request->validate([
            'text_pregunta' => 'required',
            'dificultat' => 'required|integer|between:1,3',
            'categoria_id' => 'required|integer',
            'textResposta1' => 'required',
            'textResposta2' => 'required',
            'textResposta3' => 'required',
            'textResposta4' => 'required',
            'correcta' => 'required|integer|between:1,4'
        ]);

        $pregunta = new Pregunta;

        $pregunta->text_pregunta = $request->text_pregunta;
        $pregunta->dificultat = $request->dificultat;
        $pregunta->categoria_id = $request->categoria_id;
        $pregunta->save();


        //Buscar les respostes i actualitzar-les
        for ($i = 1; $i <= 4; $i++) {
            $resposta = new Resposta;
            $resposta->text_resposta = $request->{"textResposta{$i}"};
            if ($request->correcta == $i) {
                $resposta->correcta = true;
            } else {
                $resposta->correcta = false;
            }
            $resposta->save();
        }

        return redirect()->route('preguntesIndex');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $pregunta = Pregunta::findOrFail($id);
        $categories = Categoria::all();
        $respostes = Resposta::where('pregunta_id', $id)->get();

        return view('preguntes.show', ['pregunta' => $pregunta, 'categories' => $categories, 'respostes' => $respostes]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //Buscar la pregunta i actualitzar-la
        $pregunta = Pregunta::findOrFail($id);

        $pregunta->text_pregunta = $request->text_pregunta;
        $pregunta->dificultat = $request->dificultat;
        $pregunta->categoria_id = $request->categoria_id;
        $pregunta->save();


        //Buscar les respostes i actualitzar-les
        for ($i = 1; $i <= 4; $i++) {
            $resposta = Resposta::findOrFail($request->{"idResposta{$i}"});
            $resposta->text_resposta = $request->{"textResposta{$i}"};
            $resposta->save();
        }

        return redirect()->route('preguntesIndex');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Pregunta::findOrFail($id)->delete();
        Resposta::where('pregunta_id', $id)->delete();

        return redirect()->route('preguntesIndex');
    }
}
