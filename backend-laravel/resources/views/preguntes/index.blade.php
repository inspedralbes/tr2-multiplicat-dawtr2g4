@extends('app')

@section('content')
<nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <a href="" class="btn btn-primary">Crear Pregunta</a>
            </ul>
            <form method="GET" action="{{ route('preguntesIndexSearch') }}" class="d-flex">
                @method('GET')
                @csrf
                <div class="pl-2">
                    <label for="categoria_id" class="form-label">Categoria</label>
                    <select name="categoria_id" >
                        <option value="0">Totes</option>
                        @foreach ($categories as $category)
                                <option value="{{$category->id}}">{{$category->nom}}</option>
                        @endforeach
                    </select>
                </div>
                <div class="pl-5">
                    <label for="dificultat" class="form-label">Dificultat</label>
                    <select name="dificultat" >
                            <option value="0">Totes</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                    </select>

                </div>

                <input class="form-control me-2" type="text" name="search" placeholder="Buscar pregunta">
                <button class="btn btn-outline-success" type="submit">Buscar</button>
            </form>
        </div>
    </div>
</nav>
@foreach ($preguntes as $pregunta)
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">ID: {{ $pregunta->id }}</h5>
            <p class="card-text">Enunciat: {{ $pregunta->text_pregunta }}</p>
            <p class="card-text">Dificultat: {{ $pregunta->dificultat }}</p>
            <p class="card-text">Categoria: {{ $pregunta->categoria_id }}</p>
            <a href="{{ route('preguntesShow', ['id' => $pregunta->id]) }}" class="btn btn-primary">Edita</a>
        </div>
    </div>
@endforeach

@endsection