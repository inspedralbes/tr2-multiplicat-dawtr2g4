@extends('app')

@section('content')

<div class="container w-30 border p-4 mt-5">
    <div class="row mx-auto">
    <form  method="POST" action="{{ route('preguntesUpdate', ['id' => $pregunta->id]) }}">
        @method('PUT')
        @csrf

        <div class="mb-3 col">

            <label for="text_pregunta" class="form-label">Enunciat</label>
            <input type="text" class="form-control mb-2" name="text_pregunta" id="text_preg" value="{{ $pregunta->text_pregunta }}">

            <label for="dificultat" class="form-label">Dificultat</label>
            <select name="dificultat" id="dificultat_preg">
                @for($i = 1; $i <= 3; $i++)
                @if ($pregunta->dificultat == $i)
                    <option value="{{$i}}" selected>{{$i}}</option>
                @else
                    <option value="{{$i}}">{{$i}}</option>
                @endif
                @endfor
                
            </select><br>

            <label for="categoria_id" class="form-label">Categoria de la pregunta</label>
            <select name="categoria_id" class="form-select">
                @foreach ($categories as $category)
                    @if ($category->id == $pregunta->categoria_id)
                        <option value="{{$category->id}}" selected>{{$category->nom}}</option>
                    @else
                        <option value="{{$category->id}}">{{$category->nom}}</option>
                    @endif
                @endforeach
            </select>

            @foreach ($respostes as $resposta)
                <input type="hidden" name="idResposta{{ $loop->index + 1 }}" value="{{ $resposta->id }}">
                <label for="textResposta{{ $loop->index + 1 }}" class="form-label">Resposta {{ $loop->index + 1 }}</label>
                <input type="text" class="form-control mb-2" name="textResposta{{ $loop->index + 1 }}" id="resposta" value="{{ $resposta->text_resposta }}">
            @endforeach

            <input type="submit" value="Actualitzar pregunta" class="btn btn-primary my-2" />
        </div>
    </form>

    
    </div>
</div>

@endsection