<?php

namespace App\Http\Requests;

use App\Enums\Languages;
use Illuminate\Validation\Rules\Enum;

class EditLabRequest extends FormRequest
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
            'title' => ['string', 'required'],
            'language' => [new Enum(Languages::class), 'required'],
            'starter_code' => ['string', 'required'],
            'description' => ['string', 'required'],
            'due_date' => ['date', 'nullable'],
        ];
    }
}
