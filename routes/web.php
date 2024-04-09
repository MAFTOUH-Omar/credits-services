<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\ServiceController;
use App\Http\Controllers\Admin\HomeController;
use App\Http\Controllers\Admin\NewPanelController as AdminNewPanelController;
use App\Http\Controllers\Admin\PaymentController;
use App\Http\Controllers\Admin\RequestCreditController as AdminRequestCreditController;
use App\Http\Controllers\Admin\TicketController as AdminTicketController;
use App\Http\Controllers\Client\ActionController;
use App\Http\Controllers\Client\NewPanelController;
use App\Http\Controllers\Client\PaymentController as ClientPaymentController;
use App\Http\Controllers\Client\RequestCreditController;
use App\Http\Controllers\Client\TicketController;
use App\Models\Service;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    $service = Service::all();
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'service'        => $service,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::group(['prefix' => '/admin'], function () {

        //======================= home routers =====================================
        Route::get('/dashboard', [HomeController::class, 'indexAdmin'])->name('admin.dashboard');
        Route::post('/client-list', [HomeController::class, 'getClient'])->name('getClient');
        Route::get('/client-list', [HomeController::class, 'client'])->name('admin.client-list');
        Route::post('/update-balance', [HomeController::class, 'updateBalance'])->name('admin.update-balance');
        Route::get('/totalSide', [HomeController::class, 'backupTotalData']);

        //======================= AdminNewPanel routers =====================================
        Route::get('/create-panel',[AdminNewPanelController::class, 'index'])->name('admin.panel');
        Route::post('/paid-panel/{id}', [AdminNewPanelController::class, 'paidPanel']);
        Route::post('/response-panel', [AdminNewPanelController::class, 'response'])->name('response-panel');
        Route::post('/change-price', [AdminNewPanelController::class, 'changePrice']);
        Route::post('/create-panel', [AdminNewPanelController::class, 'getPanel'])->name('admin.getPanel');

        //======================= Admin Service routers =====================================
        Route::get('/set-service-prices/{id}',[ServiceController::class,'setServicePrice'])->name('set-service-prices');
        Route::post('/update-Price', [ServiceController::class, 'updatePrice'])->name('update-Price');
        Route::get('/services-list',[ServiceController::class, 'indexAdmin'])->name('admin.services');
        Route::get('/services/add-service',[ServiceController::class, 'indexAdd'])->name('admin.add-services');
        Route::post('/new-service', [ServiceController::class, 'addService'])->name('new-service');
        Route::post('/update-service', [ServiceController::class, 'update'])->name('update-service');
        Route::post('/delet-service/{id}', [ServiceController::class, 'destory'])->name('delet-service');
        Route::post('/services-list', [ServiceController::class, 'getServiceAdmin'])->name('admin.getService');
        
        

       
        Route::post('/response-payment', [PaymentController::class, 'response'])->name('response-payment');
        Route::get('/payment-list',[PaymentController::class,'index'])->name('admin.payment');
        Route::post('/payment-list', [PaymentController::class, 'getPayment'])->name('admin.getPayment');

        
        
        //======================= Admin Request Credit routers =====================================
        Route::get('/request-credits', [AdminRequestCreditController::class, 'index'])->name('admin.request-credits');
        Route::post('/request-credits', [AdminRequestCreditController::class, 'getCredit'])->name('admin.getCredit');
        Route::post('/paid-credit/{id}', [AdminRequestCreditController::class, 'paidCredit']);
        Route::post('/response-credit', [AdminRequestCreditController::class, 'response'])->name('response-credit');
        Route::post('/change-price', [AdminRequestCreditController::class, 'changePrice']);

        
        Route::get('/other-service', [ActionController::class, 'RequestOtherService'])->name('admin.other-service');
        Route::post('/response-other-service', [ActionController::class, 'responseOtherService']);

        Route::get('/list-ticket', [AdminTicketController::class, 'index'])->name('admin-ticket');
        Route::post('/list-ticket', [AdminTicketController::class, 'getTicket'])->name('admin.getTicket');
        Route::post('/response-ticket', [AdminTicketController::class, 'response'])->name('response-ticket');

      

    
      
    });
    Route::group(['prefix' => '/client'], function () {
        //home routers =====================================
        Route::get('/dashboard', [HomeController::class, 'indexClient'])->name('client.dashboard');

        Route::get('/other-service', [ActionController::class, 'otherService'])->name('client.other-service');
        Route::post('/add-other-service', [ActionController::class, 'addOtherService']);
        Route::post('/delet-other-service/{id}', [ActionController::class, 'destory'])->name('delet-other-service');

        //======================= Client NewPanel routers =====================================
        Route::get('/create-panel',[NewPanelController::class, 'index'])->name('client.panel');
        Route::post('/new-panel', [NewPanelController::class, 'store'])->name('new-panel');
        Route::post('/create-panel', [NewPanelController::class, 'getPanel'])->name('client.getPanel');
        Route::post('/update-panel', [NewPanelController::class, 'update'])->name('update-panel');
        Route::post('/delet-panel/{id}', [NewPanelController::class, 'destory'])->name('delet-panel');

        //======================= Client Request Credit routers =====================================
        Route::get('/request-credits', [RequestCreditController::class, 'index'])->name('client.request-credits');
        Route::post('/request-credits', [RequestCreditController::class, 'getCredit'])->name('client.getCredit');
        Route::post('/new-credit', [RequestCreditController::class, 'store'])->name('new-credit');
        Route::post('/update-credits', [RequestCreditController::class, 'update'])->name('update-credits');
        Route::post('/delet-credit/{id}', [RequestCreditController::class, 'destory'])->name('delet-credit');


        Route::get('/payment-list', [ClientPaymentController::class, 'index'])->name('client.payment');
        Route::get('/add-payment', [ClientPaymentController::class, 'indexAdd'])->name('client.add-payment');
        Route::post('/new-paymet', [ClientPaymentController::class, 'store'] );
        Route::post('/delet-payment/{id}', [ClientPaymentController::class, 'destory'])->name('delet-payment');
        Route::post('/payment-list', [ClientPaymentController::class, 'getPayment'])->name('client.getPayment');
        Route::post('/update-payment', [ClientPaymentController::class, 'update'])->name('update-payment');
        Route::get('/exchange-rate', [ClientPaymentController::class, 'fetchExchangeRate']);


        Route::post('/new-ticket', [TicketController::class, 'store']);
        Route::get('/list-ticket', [TicketController::class, 'index'])->name('client-ticket');
        Route::post('/list-ticket', [TicketController::class, 'getTicket'])->name('client.getTicket');



        Route::post('/services-list', [ServiceController::class, 'getServiceClient'])->name('client.getService');
        Route::get('/services-list',[ServiceController::class, 'indexClient'])->name('client.services');
        

    
      
    });
});


require __DIR__.'/auth.php';
