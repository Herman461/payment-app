<?php

namespace App\Services;

use App\Models\Card;
use App\Models\Payment;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;


class PaymentService
{
    public function handle(array $data, User $user): ?Card
    {
        $cvv = $data['card']['cvv'];
        $savedCard = $this->resolveCard($data['card'], $user, $data['saveCard'] ?? false);

        DB::transaction(function () use ($user, $savedCard, $data, $cvv) {
            Payment::create([
                'user_id'     => $user->id,
                'card_id'     => $savedCard->id,
                'from_amount' => $data['fromAmount'],
                'to_amount'   => $data['toAmount'],
            ]);
        });

        return $savedCard?->exists ? $savedCard : null;
    }

    public function getSavedCards(): Collection
    {
        return Card::query()
            ->where('user_id', 1)
            ->get(['id', 'number', 'month', 'year']);
    }

    private function resolveCard(array $cardData, User $user, bool $saveCard): Card
    {

        if (!empty($cardData['id'])) {
            return $user->cards()->where('id', $cardData['id'])->firstOrFail();
        }

        if ($saveCard) {
            return $user->cards()->create([
                'number' => substr(str_replace(' ', '', $cardData['number']), -4),
                'month'  => $cardData['month'],
                'year'   => $cardData['year'],
            ]);
        }

        return new Card([
            'number' => $cardData['number'],
            'month'  => $cardData['month'],
            'year'   => $cardData['year'],
        ]);
    }
}
