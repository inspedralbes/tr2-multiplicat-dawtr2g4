@extends('app')

@section('content')

@error('name')
<div class="alert alert-danger position-absolute top-1" style="width: fit-content; left: 50%; transform: translate(-50%)" role="alert">
    El nom no pot estar buit
</div>
@enderror

@error('email')
<div class="alert alert-danger position-absolute top-1" style="width: fit-content; left: 50%; transform: translate(-50%)" role="alert">
    El email no pot estar buit
</div>
@enderror

@error('esAdmin')
<div class="alert alert-danger position-absolute top-1" style="width: fit-content; left: 50%; transform: translate(-50%)" role="alert">
    Has d'indicar si l'usuari es admin o no
</div>
@enderror

<div class="container w-30 border p-4 mt-5">
    <div class="row mx-auto">
        <form method="POST" action="{{ route('usersUpdate', ['id' => $user->id]) }}">
            @method('PUT')
            @csrf

            <div class="mb-3 col">

                <label for="text_name" class="form-label">Nom</label>
                <input type="text" class="form-control mb-2" name="name" id="text_name" value="{{ $user->name }}">

                <label for="text_email" class="form-label">Email</label>
                <input type="email" class="form-control mb-2" name="email" id="text_email" value="{{ $user->email }}">

                @if ($user->esAdmin)
                <input type="radio" id="admin_si" name="esAdmin" value="1" checked>
                <label for="admin_si">Amin</label><br>
                <input type="radio" id="admin_no" name="esAdmin" value="0">
                <label for="admin_no">No admin</label><br>
                @else
                <input type="radio" id="admin_si" name="esAdmin" value="1">
                <label for="admin_si">Amin</label><br>
                <input type="radio" id="admin_no" name="esAdmin" value="0" checked>
                <label for="admin_no">No admin</label><br>
                @endif


                <input type="submit" value="Actualitzar usuari" class="btn btn-primary my-2" />
                <div style="display: inline-block; margin-top: 10px; float: right;">
                    <a href="{{ route('usersIndex') }}" class="btn btn-secondary">
                        Cancelar
                    </a>
                </div>

            </div>
        </form>


    </div>
</div>

@endsection