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
        $search = $request->get('search');
        $users = User::where('name', 'like', '%'.$search.'%')->orWhere('email', 'like', '%'.$search.'%')->get();
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
        ]);

        $user = User::create([
            'name' => $fields['name'],
            'email' => $fields['email'],
            'password' => bcrypt($fields['password']),
        ]);
        
        return redirect()->route('usersIndex');
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

        return redirect()->route('usersIndex');
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

        return redirect()->route('usersIndex');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroyWeb(string $id)
    {
        $user = User::find($id);
        $user->delete();
        return redirect()->route('usersIndex');
    }
}
