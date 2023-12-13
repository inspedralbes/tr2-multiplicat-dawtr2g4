@extends('app')

@section('content')
<nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <a href="{{ route('categoriesStore') }}" class="btn btn-primary">Crear Categoria</a>
            </ul>
            <form method="GET" action="{{ route('categoriesIndexSearch') }}" class="d-flex">
                @method('GET')
                @csrf

                <input class="form-control me-2" type="text" name="search" placeholder="Buscar categoria">
                <button class="btn btn-outline-success" type="submit">Buscar</button>
            </form>
        </div>
    </div>
</nav>
@foreach ($categories as $categoria)
    <!-- Modal -->
    <div class="modal fade" id="exampleModal{{$categoria->id}}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Segur que vols eliminar la categoria {{ $categoria->id }}</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form action="{{ route('categoriesDestroy', ['id' => $categoria->id]) }}" method="POST">
            @method('DELETE')
            @csrf
            <div class="modal-body">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="true" name="eliminar_preg" id="flexCheckDefault">
                    <label class="form-check-label" for="flexCheckDefault">
                        Eliminar totes les preguntes d'aquesta categoria
                    </label>
                </div>
            </div>
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
            <h5 class="card-title">ID: {{ $categoria->id }}</h5>
            <p class="card-text">Nom: {{ $categoria->nom }}</p>
            <a href="{{ route('categoriesShow', ['id' => $categoria->id]) }}" class="btn btn-primary">Edita</a>
            <button type="button" class="btn btn-primary btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal{{$categoria->id}}">
                Eliminar
            </button>
        </div>
    </div>
@endforeach

@endsection