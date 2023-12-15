@extends('app')

@section('content')
<nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <a href="{{ route('usersStore') }}" class="btn btn-primary">Crear Usuaris</a>
            </ul>
            <form method="GET" action="{{ route('usersIndexSearch') }}" class="d-flex">
                @method('GET')
                @csrf

                <input class="form-control me-2" type="text" name="search" placeholder="Buscar usuari">
                <button class="btn btn-outline-success" type="submit">Buscar</button>
            </form>
        </div>
    </div>
</nav>
@foreach ($users as $user)
<!-- Modal -->
<div class="modal fade" id="exampleModal{{$user->id}}" tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Segur que vols eliminar l'usuari {{ $user->id }}
                </h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form action="{{ route('usersDestroy', ['id' => $user->id]) }}" method="POST">
                @method('DELETE')
                @csrf
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tancar</button>

                    <button class="btn btn-danger btn-sm">Eliminar</button>

                </div>
            </form>
        </div>
    </div>
</div>

<div class="card">
    <div class="card-body">
        <h5 class="card-title">ID: {{ $user->id }}</h5>
        <p class="card-text">Nom: {{ $user->name }}</p>
        <p class="card-text">Email: {{ $user->email }}</p>
        @if ($user->esAdmin == 1)
        <p class="card-text">Es Admin: Si</p>
        @else
        <p class="card-text">Es Admin: No</p>
        @endif

        <a href="{{ route('usersShow', ['id' => $user->id]) }}" class="btn btn-primary">Edita</a>
        <button type="button" class="btn btn-primary btn-danger" data-bs-toggle="modal"
            data-bs-target="#exampleModal{{$user->id}}">
            Eliminar
        </button>
    </div>
</div>
@endforeach

@endsection