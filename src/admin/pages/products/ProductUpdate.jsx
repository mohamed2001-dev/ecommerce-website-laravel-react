import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProduct, updateProduct } from '../../../store/slices/productSlice';
import { fetchCategories } from '../../../store/slices/categorySlice';
import { imageUrl } from '../../../helpers/imageUrl';

export default function ProductUpdate() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { product, loading, errors } = useSelector((state) => state.products);
    const { categories } = useSelector((state) => state.categories);

    const [form, setForm] = useState({
        title: '',
        description: '',
        price: '',
        image: null,
        category_id: '',
    });

    const [imagePreview, setImagePreview] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);

    // Fetch product and categories on page load
    useEffect(() => {
        const loadData = async () => {
            await dispatch(fetchProduct(id));
            if (categories.length === 0) {
                await dispatch(fetchCategories());
            }
        };
        loadData();
    }, [id, dispatch]);

    // Fill form when product data is available
    useEffect(() => {
        if (product && product.id === Number(id) && !dataLoaded) {
            console.log('Loading product data:', product); // Debug

            setForm({
                title: product.title || '',
                description: product.description || '',
                price: product.price || '',
                image: null,
                category_id: String(product.category_id) || '',
            });

            setImagePreview(imageUrl(product.image));
            setDataLoaded(true);
        }
    }, [product, id, dataLoaded]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setForm({ ...form, image: file });
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData();
        formData.append('title', form.title);
        formData.append('description', form.description);
        formData.append('price', form.price);
        formData.append('category_id', form.category_id);
        formData.append('_method', 'PUT');

        if (form.image) {
            formData.append('image', form.image);
        }

        const result = await dispatch(updateProduct({ id, data: formData }));
        if (!result.error) {
            navigate('/admin/products');
        }
        setIsSubmitting(false);
    };

    // Show loading state while fetching
    if (loading && !dataLoaded) {
        return (
            <div className="bg-gray-50 min-h-screen py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white border border-gray-200 p-8">
                        <div className="space-y-6">
                            <div className="h-10 bg-gray-100 animate-pulse"></div>
                            <div className="h-24 bg-gray-100 animate-pulse"></div>
                            <div className="h-10 bg-gray-100 animate-pulse"></div>
                            <div className="h-32 bg-gray-100 animate-pulse"></div>
                            <div className="h-10 bg-gray-100 animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate('/admin/products')}
                        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors mb-4 group"
                    >
                        ← BACK TO PRODUCTS
                    </button>
                    <div>
                        <h1 className="text-3xl font-light text-black">Update Product</h1>
                        <div className="w-12 h-px bg-black mt-2"></div>
                        <p className="text-sm text-gray-400 mt-2">Product ID: #{id}</p>
                    </div>
                </div>

                {/* Form Card */}
                <div className="bg-white border border-gray-200">
                    <form onSubmit={handleSubmit} className="p-8 space-y-6">

                        {/* Title - Should show current value */}
                        <div>
                            <label className="block text-[10px] tracking-[0.2em] text-gray-400 uppercase mb-2">
                                Product Title *
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                placeholder="Enter product title"
                                className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none transition-colors text-sm"
                                required
                            />
                            {errors?.title && (
                                <p className="text-red-500 text-xs mt-1">{errors.title[0]}</p>
                            )}
                        </div>

                        {/* Description - Should show current value */}
                        <div>
                            <label className="block text-[10px] tracking-[0.2em] text-gray-400 uppercase mb-2">
                                Description *
                            </label>
                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                rows={5}
                                placeholder="Enter product description"
                                className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none transition-colors text-sm resize-none"
                                required
                            />
                            {errors?.description && (
                                <p className="text-red-500 text-xs mt-1">{errors.description[0]}</p>
                            )}
                        </div>

                        {/* Price - Should show current value */}
                        <div>
                            <label className="block text-[10px] tracking-[0.2em] text-gray-400 uppercase mb-2">
                                Price (USD) *
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">$</span>
                                <input
                                    type="number"
                                    name="price"
                                    value={form.price}
                                    onChange={handleChange}
                                    step="0.01"
                                    placeholder="0.00"
                                    className="w-full pl-8 pr-4 py-3 border border-gray-200 focus:border-black outline-none transition-colors text-sm"
                                    required
                                />
                            </div>
                            {errors?.price && (
                                <p className="text-red-500 text-xs mt-1">{errors.price[0]}</p>
                            )}
                        </div>

                        {/* Image Upload - Should show current image */}
                        <div>
                            <label className="block text-[10px] tracking-[0.2em] text-gray-400 uppercase mb-2">
                                Product Image
                            </label>

                            {/* Current Image Preview */}
                            {imagePreview && (
                                <div className="mb-4 p-4 bg-gray-50 border border-gray-200">
                                    <p className="text-[10px] tracking-[0.2em] text-gray-400 uppercase mb-2">
                                        CURRENT IMAGE
                                    </p>
                                    <img
                                        src={imagePreview}
                                        alt="Current product"
                                        className="w-24 h-24 object-cover border border-gray-200"
                                    />
                                </div>
                            )}

                            {/* Upload New Image */}
                            <div className="border-2 border-dashed border-gray-200 hover:border-black transition-all duration-300 mt-4">
                                <label className="block cursor-pointer p-6 text-center">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                    <div className="flex flex-col items-center gap-2">
                                        <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span className="text-sm text-gray-500">
                                            {form.image ? 'Change image' : 'Upload new image (optional)'}
                                        </span>
                                        <span className="text-[10px] text-gray-400">
                                            Leave empty to keep current image
                                        </span>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Category - Should show current category selected */}
                        <div>
                            <label className="block text-[10px] tracking-[0.2em] text-gray-400 uppercase mb-2">
                                Category *
                            </label>
                            <select
                                name="category_id"
                                value={form.category_id}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none transition-colors text-sm bg-white"
                                required
                            >
                                <option value="">Select a category</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={String(cat.id)}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                            {errors?.category_id && (
                                <p className="text-red-500 text-xs mt-1">{errors.category_id[0]}</p>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-4 pt-4 border-t border-gray-100">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-8 py-3 bg-black text-white text-sm tracking-wide hover:bg-white hover:text-black border-2 border-black transition-all duration-300 disabled:opacity-50"
                            >
                                {isSubmitting ? 'UPDATING...' : 'UPDATE PRODUCT'}
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate('/admin/products')}
                                className="px-8 py-3 bg-transparent text-black text-sm tracking-wide border border-gray-300 hover:border-black transition-all duration-300"
                            >
                                CANCEL
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
