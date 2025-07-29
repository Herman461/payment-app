<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePaymentRequest;
use App\Models\User;
use App\Services\PaymentService;
use Illuminate\Routing\Controller;

class PaymentController extends Controller
{

    public function __construct(
        private readonly PaymentService $paymentService
    ) {}

    public function store(StorePaymentRequest $request)
    {
        $data = $request->validated();

        // Хардкодим пользователя
        $user = User::query()->find(1);

        $savedCard = $this->paymentService->handle($data, $user);

        return response()->json(['message' => 'Платёж успешно выполнен.', 'card' => $savedCard]);
    }

    public function getSavedCards()
    {

        $cards = $this->paymentService->getSavedCards();

        return response()->json(['cards' => $cards]);
    }
}
