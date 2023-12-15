<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PreguntesController;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\UsersController;

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
Route::get('/crearPregunta', [PreguntesController::class,'storeShow'])->name('preguntesStore');
Route::post('/crearPregunta', [PreguntesController::class, 'store'])->name('preguntesStore');
Route::put('/preguntes/{id}', [PreguntesController::class, 'update'])->name('preguntesUpdate');
Route::delete('/preguntes/delete/{id}', [PreguntesController::class, 'destroy'])->name('preguntesDestroy');

//CATEGORIES
Route::get('/categories', [CategoriesController::class, 'indexWeb'])->name('categoriesIndex');
Route::get('/categories/search', [CategoriesController::class, 'searchCrudWeb'])->name('categoriesIndexSearch');
Route::get('/categories/{id}', [CategoriesController::class, 'showWeb'])->name('categoriesShow');
Route::get('/crearCategoria', [CategoriesController::class,'storeShowWeb'])->name('categoriesStore');
Route::post('/crearCategoria', [CategoriesController::class, 'storeWeb'])->name('categoriesStore');
Route::put('/categories/{id}', [CategoriesController::class, 'updateWeb'])->name('categoriesUpdate');
Route::delete('/categories/delete/{id}', [CategoriesController::class, 'destroyWeb'])->name('categoriesDestroy');

//USERS
Route::get('/users', [UsersController::class, 'indexWeb'])->name('usersIndex');
Route::get('/users/search', [UsersController::class, 'searchCrudWeb'])->name('usersIndexSearch');
Route::get('/users/{id}', [UsersController::class, 'showWeb'])->name('usersShow');
Route::get('/crearUser', [UsersController::class,'storeShowWeb'])->name('usersStore');
Route::post('/crearUser', [UsersController::class, 'storeWeb'])->name('usersStore');
Route::put('/users/{id}', [UsersController::class, 'updateWeb'])->name('usersUpdate');
Route::delete('/users/delete/{id}', [UsersController::class, 'destroyWeb'])->name('usersDestroy');