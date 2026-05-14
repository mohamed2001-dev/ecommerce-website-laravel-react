import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../../../store/slices/productSlice';
import { fetchCategories } from '../../../store/slices/categorySlice';

export default function ProductCreate() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, errors }  = useSelector((state) => state.products);
    const { categories }       = useSelector((state) => state.categories);

    const [form, setForm] = useState({
        title:       '',
        description: '',
        price:       '',
        image:       null,
        category_id: '',
    });

    useEffect(() => {
        if (categories.length === 0) dispatch(fetchCategories());
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title',       form.title);
        formData.append('description', form.description);
        formData.append('price',       form.price);
        formData.append('category_id', form.category_id);
        if (form.image) {
            formData.append('image', form.image);
        }

        const result = await dispatch(createProduct(formData));
        if (!result.error) navigate('/admin');
    };

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-700">Create Product</h1>
                <button
                    onClick={() => navigate('/admin')}
                    className="text-gray-500 hover:text-gray-700"
                >
                    ← Back to Products
                </button>
            </div>

            <div className="bg-white rounded-xl shadow p-6 max-w-2xl">
                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Title */}
                    <div>
                        <label className="block text-gray-600 font-medium mb-1">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="Product title"
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
                            placeholder="Product description"
                            rows={4}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-gray-600 font-medium mb-1">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            placeholder="0.00"
                            step="0.01"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors?.price && (
                            <p className="text-red-500 text-sm mt-1">{errors.price[0]}</p>
                        )}
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-gray-600 font-medium mb-1">Upload Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            name="image"
                            onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                        {/* Preview */}
                        {form.image && (
                            <img
                                src={URL.createObjectURL(form.image)}
                                alt="preview"
                                className="mt-2 h-32 w-32 object-cover rounded-lg border"
                            />
                        )}
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
                                <option key={cat.id} value={cat.id}>
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
                            {loading ? 'Creating...' : 'Create Product'}
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/admin')}
                            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
                        >
                            Cancel
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
