<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            'price' => 'required|numeric|min:0|max:999999.99',
            'image' => 'nullable|image|max:10240|mimes:jpg,jpeg,png,webp,gif',
            'category' => 'nullable|string|max:100',
            'stock' => 'nullable|integer|min:0',
            'sku' => 'nullable|string|max:50|unique:products,sku',
        ];
    }

    /**
     * Get custom validation messages
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Product name is required',
            'description.required' => 'Product description is required',  
            'price.required' => 'Product price is required',
            'price.numeric' => 'Price must be a valid number',
            'price.min' => 'Price cannot be negative',
            'image.image' => 'File must be an image',
            'image.max' => 'Image size cannot exceed 10MB',
            'stock.integer' => 'Stock must be a whole number',
            'stock.min' => 'Stock cannot be negative',
            'sku.unique' => 'This SKU is already in use',
        ];
    }
}
