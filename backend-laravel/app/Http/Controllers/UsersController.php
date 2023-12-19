<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function indexWeb()
    {
        $users = User::all();
        return view("users.index", ["users"=> $users]);
    }

    public function searchCrudWeb(Request $request)
    {

        $esAdmin = $request->get('esAdmin');
        $search = $request->get('search');

        $users = User::where('esAdmin', 'LIKE', $esAdmin)
                        ->where(function ($query) use ($search) {
                            $query->where('name', 'like', '%' . $search . '%')
                                  ->orWhere('email', 'like', '%' . $search . '%');
                        })
                        ->get();

        return view("users.index", ["users"=> $users]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function storeShowWeb()
    {
        return view("users.create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function storeWeb(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|unique:users,email',
            'password' => 'required|string|confirmed',
            'esAdmin' => 'required',
        ]);

        $user = new User;
        $user->name = $fields['name'];
        $user->email = $fields['email'];
        $user->password = bcrypt($fields['password']);
        $user->esAdmin = $fields['esAdmin'];
        $user->save();
        
        return redirect()->route('usersIndex')->with('success', 'Usuari creat correctament correctament');
    }

    /**
     * Display the specified resource.
     */
    public function showWeb(string $id)
    {
        $user = User::find($id);
        return view('users.show', ['user'=> $user]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateWeb(Request $request, string $id)
    {
        $fields = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|unique:users,email,'.$id,
            'esAdmin' => 'required',

        ]);
        $user = User::find($id);
        $user->name = $fields['name'];
        $user->email = $fields['email'];
        $user->esAdmin = $fields['esAdmin'];
        $user->save();

        return redirect()->route('usersIndex')->with('success', 'Usuari actualitzat correctament');
    }

    public function updatePasswordShowWeb(string $id)
    {
        $user = User::find($id);
        return view('users.updatePassword', ['user'=> $user]);
    }

    public function updatePasswordWeb(Request $request, string $id)
    {
        $fields = $request->validate([
            'password' => 'required|string|confirmed',
        ]);
        $user = User::find($id);
        $user->password = bcrypt($fields['password']);
        $user->save();

        return redirect()->route('usersIndex')->with('success', 'Contrasenya actualitzada correctament');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroyWeb(string $id)
    {
        $user = User::find($id);
        $user->delete();
        return redirect()->route('usersIndex')->with('success', 'Usuari eliminat correctament');
    }


    //API
    public function update(Request $request){

        $fields = $request->validate([
            'id' => 'required',
            'name' => 'required|string',
        ]);

        $user = User::find($fields['id']);
        $user->name = $fields['name'];
        $user->save();

        return $user;
    }

    public function updatePassword(Request $request){

        $fields = $request->validate([
            'id' => 'required',
            'password' => 'required|string|confirmed',
        ]);

        $user = User::find($fields['id']);
        $user->password = bcrypt($fields['password']);
        $user->save();

        return true;
    }
}
