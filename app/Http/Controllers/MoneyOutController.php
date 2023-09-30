<?php

namespace App\Http\Controllers;

use App\Http\Requests\MoneyIn\AddMoneyInRequest;
use App\Models\FinancialTransaction;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class MoneyOutController extends Controller
{
    public function index()
    {
        $members = User::all();
        $data = FinancialTransaction::where("type", 2)->orderBy('created_at', 'DESC')->paginate(15);
        return Inertia::render('MoneyOut', [
            'transactions' => $data,
            'members' => $members
        ]);
    }

    public function store(AddMoneyInRequest $request)
    {
        FinancialTransaction::insert([
            'total' => $request->get('total'),
            'note' => $request->get('note'),
            'type' => 2,
            'created_by' => $request->get('member_id'),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        return redirect()->route('dashboard.money-out');
    }
}
