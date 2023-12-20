@extends('app')

@section('content')

@error('password')
<div class="alert alert-danger position-absolute top-1" style="width: fit-content; left: 50%; transform: translate(-50%)" role="alert">
    Error en la contrasenya
</div>
@enderror

<div class="container w-30 border p-4 mt-5">
    <div class="row mx-auto">
        <form method="POST" action="{{ route('usersUpdatePassword', ['id' => $user->id]) }}">
            @method('PUT')
            @csrf

            <div class="mb-3 col">

                <label for="text_name" class="form-label">Contrasenya</label>
                <input type="password" class="form-control mb-2" name="password" id="text_name">

                <label for="text_email" class="form-label">Confirmar contrasenya</label>
                <input type="password" class="form-control mb-2" name="password_confirmation" id="text_email">

                <input type="submit" value="Actualitzar contrasenya" class="btn btn-primary my-2" />
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