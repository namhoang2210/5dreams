<?php

namespace App\Http\Controllers;

use App\Models\FinancialTransaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $moneyIn = FinancialTransaction::where("type", 1)->sum("total");
        $moneyOut = FinancialTransaction::where("type", 2)->sum("total");
        $transactions = FinancialTransaction::orderBy('created_at', 'DESC')->take(8)->get();

        $data = [
            "money_in" => $moneyIn,
            "money_out" => $moneyOut,
            "transactions" => $transactions
        ];

        return Inertia::render('Dashboard', [
            "data" => $data
        ]);
    }
}
