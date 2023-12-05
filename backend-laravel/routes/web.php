<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PreguntesController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('landingAdmin');
})->name('landing-admin');

//PREGUNTES
Route::get('/preguntes', [PreguntesController::class, 'index'])->name('preguntesIndex');
Route::get('/preguntes/search', [PreguntesController::class, 'searchCrud'])->name('preguntesIndexSearch');
Route::get('/preguntes/{id}', [PreguntesController::class, 'show'])->name('preguntesShow');
Route::get('/crearPregunta', [PreguntesController::class, 'store'])->name('preguntesStore');
Route::post('/crearPregunta', [PreguntesController::class, 'store'])->name('preguntesStore');
Route::put('/preguntes/{id}', [PreguntesController::class, 'update'])->name('preguntesUpdate');
Route::delete('/preguntes/{id}', [PreguntesController::class, 'destroy'])->name('preguntesDestroy');