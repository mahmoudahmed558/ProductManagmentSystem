import { Head, Link, useForm } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { CustomTextarea } from '@/components/ui/customtextarea';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Upload, X, Image as ImageIcon } from 'lucide-react';
import React, { useState, useRef } from 'react';
import InputError from '@/components/input-error';

interface Product {
    id?: number;
    name: string;
    description: string;
    price: number | string;
    category?: string;
    stock?: number | string;
    sku?: string;
    featured_image?: string;
}

interface Props {
    product?: Product;
}

export default function ProductForm({ product }: Props) {
    const isEditing = !!product?.id;
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: isEditing ? 'Edit Product' : 'Create Product',
            href: isEditing ? `/products/${product.id}/edit` : '/products/create',
        },
    ];

    const { data, setData, post, processing, errors } = useForm({
        name: product?.name || '',
        description: product?.description || '',
        price: product?.price || '',
        category: product?.category || '',
        stock: product?.stock || '',
        sku: product?.sku || '',
        image: null as File | null,
    });

    const [imagePreview, setImagePreview] = useState<string | null>(
        product?.featured_image || null
    );
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (isEditing) {
            post(`/products/${product.id}`, {
                forceFormData: true,
                _method: 'PUT',
                preserveScroll: true,
            });
        } else {
            post('/products', {
                onSuccess: () => {
                    console.log('Product created successfully');
                },
            });
        }
    };

    const handleFileSelect = (file: File) => {
        if (file && file.type.startsWith('image/')) {
            setData('image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        
        const file = e.dataTransfer.files[0];
        if (file) {
            handleFileSelect(file);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFileSelect(e.target.files[0]);
        }
    };

    const removeImage = () => {
        setData('image', null);
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEditing ? 'Edit Product' : 'Create Product'} />
            
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-black mb-2">
                            {isEditing ? 'Edit' : 'Create'}
                            <span className="text-gradient-primary"> Product</span>
                        </h1>
                        <p className="text-muted-foreground">
                            {isEditing ? 'Update product details' : 'Add a new product to your inventory'}
                        </p>
                    </div>
                    
                    <Link
                        href="/products"
                        className="px-6 py-3 rounded-2xl glass font-semibold hover:scale-105 transition-all inline-flex items-center gap-2"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back
                    </Link>
                </div>

                {/* Form */}
                <form onSubmit={submit} className="max-w-5xl">
                    <div className="grid lg:grid-cols-2 gap-6">
                        {/* Left Column - Basic Info */}
                        <div className="space-y-6">
                            <Card className="glass-card border-0 shadow-2xl">
                                <CardHeader>
                                    <CardTitle className="text-2xl font-bold">Basic Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {/* Product Name */}
                                    <div className="space-y-2">
                                        <Label className="text-base font-semibold">Product Name *</Label>
                                        <Input
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="Enter product name"
                                            className="h-12 rounded-xl border-2 focus:border-cyan-500"
                                        />
                                        <InputError message={errors.name} />
                                    </div>

                                    {/* Description */}
                                    <div className="space-y-2">
                                        <Label className="text-base font-semibold">Description *</Label>
                                        <CustomTextarea
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            placeholder="Describe your product"
                                            rows={5}
                                            className="rounded-xl border-2 focus:border-cyan-500"
                                        />
                                        <InputError message={errors.description} />
                                    </div>

                                    {/* Category */}
                                    <div className="space-y-2">
                                        <Label className="text-base font-semibold">Category</Label>
                                        <Input
                                            value={data.category}
                                            onChange={(e) => setData('category', e.target.value)}
                                            placeholder="e.g., Electronics, Clothing, Food"
                                            className="h-12 rounded-xl border-2 focus:border-cyan-500"
                                        />
                                        <InputError message={errors.category} />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Pricing & Inventory */}
                            <Card className="glass-card border-0 shadow-2xl">
                                <CardHeader>
                                    <CardTitle className="text-2xl font-bold">Pricing & Inventory</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {/* Price */}
                                    <div className="space-y-2">
                                        <Label className="text-base font-semibold">Price *</Label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-muted-foreground">
                                                $
                                            </span>
                                            <Input
                                                value={data.price}
                                                onChange={(e) => setData('price', e.target.value)}
                                                type="number"
                                                step="0.01"
                                                placeholder="0.00"
                                                className="h-12 pl-10 rounded-xl border-2 focus:border-cyan-500 text-lg font-semibold"
                                            />
                                        </div>
                                        <InputError message={errors.price} />
                                    </div>

                                    {/* Stock & SKU */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label className="text-base font-semibold">Stock Quantity</Label>
                                            <Input
                                                value={data.stock}
                                                onChange={(e) => setData('stock', e.target.value)}
                                                type="number"
                                                placeholder="0"
                                                className="h-12 rounded-xl border-2 focus:border-cyan-500"
                                            />
                                            <InputError message={errors.stock} />
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-base font-semibold">SKU</Label>
                                            <Input
                                                value={data.sku}
                                                onChange={(e) => setData('sku', e.target.value)}
                                                placeholder="ABC-123"
                                                className="h-12 rounded-xl border-2 focus:border-cyan-500"
                                            />
                                            <InputError message={errors.sku} />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right Column - Image Upload */}
                        <div className="space-y-6">
                            <Card className="glass-card border-0 shadow-2xl">
                                <CardHeader>
                                    <CardTitle className="text-2xl font-bold">Product Image</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {/* Image Preview */}
                                    {imagePreview ? (
                                        <div className="relative rounded-2xl overflow-hidden group">
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="w-full aspect-square object-cover"
                                            />
                                            <button
                                                type="button"
                                                onClick={removeImage}
                                                className="absolute top-4 right-4 p-2 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <button
                                                    type="button"
                                                    onClick={() => fileInputRef.current?.click()}
                                                    className="px-6 py-3 rounded-xl bg-white text-black font-semibold hover:scale-105 transition-all"
                                                >
                                                    Change Image
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        /* Drag & Drop Area */
                                        <div
                                            onDragOver={(e) => {
                                                e.preventDefault();
                                                setIsDragging(true);
                                            }}
                                            onDragLeave={() => setIsDragging(false)}
                                            onDrop={handleFileDrop}
                                            onClick={() => fileInputRef.current?.click()}
                                            className={`
                                                relative aspect-square rounded-2xl border-4 border-dashed cursor-pointer
                                                transition-all duration-300 flex flex-col items-center justify-center gap-4
                                                ${
                                                    isDragging
                                                        ? 'border-cyan-500 bg-cyan-500/10 scale-105'
                                                        : 'border-border hover:border-cyan-500/50 hover:bg-cyan-500/5'
                                                }
                                            `}
                                        >
                                            <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center">
                                                {isDragging ? (
                                                    <Upload className="w-10 h-10 text-white animate-bounce" />
                                                ) : (
                                                    <ImageIcon className="w-10 h-10 text-white" />
                                                )}
                                            </div>
                                            <div className="text-center px-6">
                                                <p className="text-lg font-semibold mb-1">
                                                    {isDragging ? 'Drop your image here' : 'Upload Product Image'}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    Drag & drop or click to browse
                                                </p>
                                                <p className="text-xs text-muted-foreground mt-2">
                                                    Supported: JPG, PNG, WebP, GIF (Max 10MB)
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                    <InputError message={errors.image} />

                                    {/* Tips */}
                                    <div className="mt-4 p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20">
                                        <p className="text-sm text-muted-foreground">
                                            💡 <span className="font-semibold">Pro tip:</span> Use high-quality images with good lighting for better presentation
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-8 flex gap-4">
                        <Button
                            type="submit"
                            disabled={processing}
                            className="px-10 py-6 rounded-2xl bg-gradient-primary text-white text-lg font-bold hover-glow transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? 'Saving...' : isEditing ? 'Update Product' : 'Create Product'}
                        </Button>
                        
                        <Link
                            href="/products"
                            className="px-10 py-6 rounded-2xl glass text-lg font-semibold hover:scale-105 transition-all inline-flex items-center"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
