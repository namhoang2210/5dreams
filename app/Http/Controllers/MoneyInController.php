<?php

namespace App\Http\Controllers;

use App\Http\Requests\MoneyIn\AddMoneyInRequest;
use App\Models\FinancialTransaction;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class MoneyInController extends Controller
{
    public function index()
    {
        $data = FinancialTransaction::where("type", 1)->orderBy('created_at', 'DESC')->paginate(10);
        return Inertia::render('MoneyIn', [
            'transactions' => $data,
        ]);
    }

    public function store(AddMoneyInRequest $request)
    {
        FinancialTransaction::insert([
            'total' => $request->get('total'),
            'note' => $request->get('note'),
            'type' => 1,
            'created_by' => Auth::user()->id,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        return redirect()->route('dashboard.money-in');
    }
}
