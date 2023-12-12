@extends('app')
@section('content')
<div class="container w-30 border p-4 mt-5">
    <div class="row mx-auto">
        <form method="POST" action="{{ route('preguntesStore') }}">
            @method('POST')
            @csrf

            <div class="mb-3 col">
                <!--ENUNCIAT-->
                <label for="enunciat" class="form-label">Enunciat</label>
                <input type="text" class="form-control" id="enunciat" name="text_pregunta" placeholder="introduexi l'enunciat"><br>

                <!--DIFICULTAT-->
                <label for="dificultat" class="form-label">Dificultat</label>
                <select name="dificultat" class="form-select">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                </select>

                <!--CATEGORIES-->
                <label for="categoria_id" class="form-label">Categoria de la pregunta</label>
                <select name="categoria_id" class="form-select">
                    @foreach ($categories as $category)
                    <option value="{{$category->id}}">{{$category->nom}}</option>
                    @endforeach
                </select><br>

                <!--RESPOSTES-->
                <!--RESP1-->
                <label for="resposta1" class="form-label">Resposta1</label>
                <label for="resp1">| Resposta correcta?</label>
                <input type="radio" id="resp1" name="correcta" value="1">
                <input type="text" class="form-control" id="resposta1" name="textResposta1"  placeholder="introduexi resposta 1">

                <!--RESP2-->
                <label for="resposta2" class="form-label">Resposta2</label>
                <label for="resp2">| Resposta correcta?</label>
                <input type="radio" id="resp2" name="correcta" value="2">
                <input type="text" class="form-control" id="resposta2" name="textResposta2" placeholder="introduexi resposta 2">

                <!--RESP3-->
                <label for="resposta3" class="form-label">Resposta3</label>
                <label for="resp3">| Resposta correcta?</label>
                <input type="radio" id="resp3" name="correcta" value="3">
                <input type="text" class="form-control" id="resposta3" name="textResposta3" placeholder="introduexi resposta 3">

                <!--RESP4-->
                <label for="resposta4" class="form-label">Resposta4</label>
                <label for="resp4">| Resposta correcta?</label>
                <input type="radio" id="resp4" name="correcta" value="4">
                <input type="text" class="form-control" id="resposta4" name="textResposta4" placeholder="introduexi resposta 4">

                <!--BUTTONS-->
                <input type="submit" value="Crear pregunta" class="btn btn-primary my-2" />
                <div style="display: inline-block; margin-top: 10px; float: right;">
                    <a href="{{ route('preguntesIndex') }}" class="btn btn-secondary">
                        Cancelar
                    </a>
                </div>

            </div>
        </form>


    </div>
</div>
@endsection