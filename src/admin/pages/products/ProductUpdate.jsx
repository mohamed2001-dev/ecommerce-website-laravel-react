import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProduct, updateProduct } from '../../../store/slices/productSlice';
import { fetchCategories } from '../../../store/slices/categorySlice';

export default function ProductUpdate() {
    const { id }     = useParams();
    const dispatch   = useDispatch();
    const navigate   = useNavigate();

    const { product, loading, errors } = useSelector((state) => state.products);
    const { categories }               = useSelector((state) => state.categories);

    const [form, setForm] = useState({
        title:       '',
        description: '',
        price:       '',
        image:       null,   // ✅ null for file
        category_id: '',
    });

    // ✅ to preview existing image or new uploaded one
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        dispatch(fetchProduct(id));
        if (categories.length === 0) {
            dispatch(fetchCategories());
        }
    }, [id]);

    // fill form when product loads
    useEffect(() => {
        if (product && product.id === Number(id)) {
            setForm({
                title:       product.title               || '',
                description: product.description         || '',
                price:       product.price               || '',
                image:       null,                              // ✅ keep null, use preview
                category_id: String(product.category_id) || '',
            });
            // ✅ set existing image as preview
            setImagePreview(
                `http://127.0.0.1:8000/storage/${product.image}`
            );
        }
    }, [product, id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // ✅ handle file input separately
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setForm({ ...form, image: file });
            setImagePreview(URL.createObjectURL(file)); // ✅ show new preview
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // ✅ use FormData for file upload
        const formData = new FormData();
        formData.append('title',       form.title);
        formData.append('description', form.description);
        formData.append('price',       form.price);
        formData.append('category_id', form.category_id);
        formData.append('_method',     'PUT'); // ✅ Laravel needs this for PUT with FormData

        if (form.image) {
            formData.append('image', form.image); // ✅ only append if new image selected
        }

        const result = await dispatch(updateProduct({ id, data: formData }));
        if (!result.error) navigate('/admin/products');
    };

    return (
        <div className="p-6">

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-700">Update Product</h1>
                <button
                    onClick={() => navigate('/admin/products')}
                    className="text-gray-500 hover:text-gray-700"
                >
                    ← Back to Products
                </button>
            </div>

            <div className="bg-white rounded-xl shadow p-6 max-w-2xl">
                {loading ? (
                    <div className="space-y-5 animate-pulse">
                        <div className="h-10 bg-gray-200 rounded-lg w-full" />
                        <div className="h-24 bg-gray-200 rounded-lg w-full" />
                        <div className="h-10 bg-gray-200 rounded-lg w-full" />
                        <div className="h-10 bg-gray-200 rounded-lg w-full" />
                        <div className="h-10 bg-gray-200 rounded-lg w-full" />
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Title */}
                        <div>
                            <label className="block text-gray-600 font-medium mb-1">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors?.title && (
                                <p className="text-red-500 text-sm mt-1">{errors.title[0]}</p>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-gray-600 font-medium mb-1">Description</label>
                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                rows={4}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors?.description && (
                                <p className="text-red-500 text-sm mt-1">{errors.description[0]}</p>
                            )}
                        </div>

                        {/* Price */}
                        <div>
                            <label className="block text-gray-600 font-medium mb-1">Price</label>
                            <input
                                type="number"
                                name="price"
                                value={form.price}
                                onChange={handleChange}
                                step="0.01"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors?.price && (
                                <p className="text-red-500 text-sm mt-1">{errors.price[0]}</p>
                            )}
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="block text-gray-600 font-medium mb-1">
                                Image
                            </label>

                            {/* ✅ show current or new preview */}
                            {imagePreview && (
                                <img
                                    src={imagePreview}
                                    alt="preview"
                                    loading="lazy"
                                    className="mb-2 h-32 w-32 object-cover rounded-lg border"
                                />
                            )}

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full px-4 py-2 border rounded-lg"
                            />
                            <p className="text-gray-400 text-xs mt-1">
                                Leave empty to keep current image
                            </p>
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-gray-600 font-medium mb-1">Category</label>
                            <select
                                name="category_id"
                                value={form.category_id}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select a category</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={String(cat.id)}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                            {errors?.category_id && (
                                <p className="text-red-500 text-sm mt-1">{errors.category_id[0]}</p>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3 pt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition disabled:opacity-50"
                            >
                                {loading ? 'Updating...' : 'Update Product'}
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate('/admin/products')}
                                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
                            >
                                Cancel
                            </button>
                        </div>

                    </form>
                )}
            </div>
        </div>
    );
}
