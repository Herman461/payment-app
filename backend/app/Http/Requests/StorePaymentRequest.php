<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePaymentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'fromAmount' => 'required|numeric',
            'toAmount'   => 'required|numeric',
            'saveCard'   => 'required|boolean',

            'card.id'    => 'nullable|exists:cards,id',
            'card.number' => 'nullable|string|regex:/^\d{4} \d{4} \d{4} \d{4}$/',
            'card.cvv'   => 'nullable|digits:3',
            'card.month' => 'nullable|digits:2',
            'card.year'  => 'nullable|digits:2',
        ];
    }
}
