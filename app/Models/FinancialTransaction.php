<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class FinancialTransaction extends Model
{
    use HasFactory, SoftDeletes;

    public $timestamps = true;

    protected $fillable = [
        'total', 'type', 'note', 'created_by'
    ];

    protected $with = ['author'];

    public function author()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
