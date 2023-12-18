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

@error('password')
<div class="alert alert-danger position-absolute top-1" style="width: fit-content; left: 50%; transform: translate(-50%)" role="alert">
    Error en la contrasenya
</div>
@enderror

@error('esAdmin')
<div class="alert alert-danger position-absolute top-1" style="width: fit-content; left: 50%; transform: translate(-50%)" role="alert">
    Has d'indicar si l'usuari serà admin o no
</div>
@enderror

<div class="container w-30 border p-4 mt-5">
    <div class="row mx-auto">
        <form method="POST" action="{{ route('usersStore') }}">
            @method('POST')
            @csrf

            <div class="mb-3 col">

                <label for="text_name" class="form-label">Nom</label>
                <input type="text" class="form-control mb-2" name="name" id="text_name">

                <label for="text_email" class="form-label">Email</label>
                <input type="email" class="form-control mb-2" name="email" id="text_email">

                <label for="text_name" class="form-label">Contrasenya</label>
                <input type="password" class="form-control mb-2" name="password" id="text_name">

                <label for="text_email" class="form-label">Confirmar contrasenya</label>
                <input type="password" class="form-control mb-2" name="password_confirmation" id="text_email">

                <input type="radio" id="admin_si" name="esAdmin" value="1">
                <label for="admin_si">Amin</label><br>
                <input type="radio" id="admin_no" name="esAdmin" value="0" checked>
                <label for="admin_no">No admin</label><br>
                
                <input type="submit" value="Crear usuari" class="btn btn-primary my-2" />
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