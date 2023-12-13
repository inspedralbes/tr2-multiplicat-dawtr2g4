@extends('app')

@section('content')
<div class="container w-30 border p-4 mt-5">
    <div class="row mx-auto">
        <form method="POST" action="{{ route('categoriesStore') }}">
            @method('POST')
            @csrf

            <div class="mb-3 col">
                <!--NOM-->
                <label for="text_categoria" class="form-label">Nom</label>
                <input type="text" class="form-control" id="text_categoria" name="nom" placeholder="introduexi l'enunciat"><br>

                <!--BUTTONS-->
                <input type="submit" value="Crear categoria" class="btn btn-primary my-2" />
                <div style="display: inline-block; margin-top: 10px; float: right;">
                    <a href="{{ route('categoriesIndex') }}" class="btn btn-secondary">
                        Cancelar
                    </a>
                </div>

            </div>
        </form>


    </div>
</div>
@endsection