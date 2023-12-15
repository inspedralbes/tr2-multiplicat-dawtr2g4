<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Categoria;
use App\Models\Pregunta;

class CategoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Categoria::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Categoria::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Categoria::find($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        Categoria::find($id)->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Categoria::destroy($id);
    }

    //CRUD
    public function indexWeb()
    {
        $categories = Categoria::all();
        return view('categories.index', ['categories' => $categories]);
    }

    public function searchCrudWeb(Request $request)
    {
        $search = $request->search;
        $categories = Categoria::when(!empty($search), function ($query) use ($search) {
                                    $query->where('nom', 'LIKE', "%{$search}%");
                                })->get();
        return view('categories.index', ['categories' => $categories]);
    }

    public function showWeb(string $id)
    {
        $categoria = Categoria::find($id);
        return view('categories.show', ['categoria' => $categoria]);
    }
    public function storeShowWeb()
    {
        return view('categories.create');
    }
    public function storeWeb(Request $request)
    {
        $request->validate([
            'nom' => 'required',
        ]);
        $categoria = new Categoria();
        $categoria->nom = $request->nom;
        $categoria->save();

        return redirect()->route('categoriesIndex')->with('success', 'Categoria creada correctament');
    }
    public function updateWeb(Request $request, string $id)
    {
        $request->validate([
            'nom' => 'required',
        ]);
        $categoria = Categoria::find($id);
        $categoria->nom = $request->nom;
        $categoria->save();

        return redirect()->route('categoriesIndex')->with('success', 'Categoria actualitzada correctament');
    }
    public function destroyWeb(Request $request, string $id)
    {
        if($request->eliminar_preg){
            Pregunta::where('categoria_id', $id)->delete();
        }
        Categoria::findOrFail($id)->delete();
        
        return redirect()->route('categoriesIndex')->with('success', 'Categoria eliminada correctament');
    }
}
