import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../../../store/slices/productSlice';
import { fetchCategories } from '../../../store/slices/categorySlice';

export default function ProductCreate() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, errors } = useSelector((state) => state.products);
    const { categories } = useSelector((state) => state.categories);

    const [form, setForm] = useState({
        title: '',
        description: '',
        price: '',
        image: null,
        category_id: '',
    });

    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        if (categories.length === 0) {
            dispatch(fetchCategories());
        }
    }, [dispatch, categories.length]);

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
        const formData = new FormData();
        formData.append('title', form.title);
        formData.append('description', form.description);
        formData.append('price', form.price);
        formData.append('category_id', form.category_id);
        if (form.image) {
            formData.append('image', form.image);
        }
        const result = await dispatch(createProduct(formData));
        if (!result.error) {
            navigate('/admin/products');
        }
    };

    return (
        <div className="bg-white min-h-screen py-12 px-4">
            <div className="max-w-2xl mx-auto">

                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-light text-black">Create Product</h1>
                    <div className="w-12 h-px bg-black mx-auto mt-3"></div>
                </div>

                <div className="border border-gray-200 p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div>
                            <label className="block text-[10px] tracking-[0.2em] text-gray-400 uppercase mb-2">
                                Title *
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none text-sm"
                                required
                            />
                            {errors?.title && <p className="text-red-500 text-xs mt-1">{errors.title[0]}</p>}
                        </div>

                        <div>
                            <label className="block text-[10px] tracking-[0.2em] text-gray-400 uppercase mb-2">
                                Description *
                            </label>
                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                rows={4}
                                className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none text-sm resize-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] tracking-[0.2em] text-gray-400 uppercase mb-2">
                                Price *
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={form.price}
                                onChange={handleChange}
                                step="0.01"
                                className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none text-sm"
                                required
                            />
                            {errors?.price && <p className="text-red-500 text-xs mt-1">{errors.price[0]}</p>}
                        </div>

                        <div>
                            <label className="block text-[10px] tracking-[0.2em] text-gray-400 uppercase mb-2">
                                Image *
                            </label>
                            {imagePreview && (
                                <div className="mb-3">
                                    <img src={imagePreview} alt="Preview" className="w-20 h-20 object-cover border border-gray-200" />
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none text-sm file:mr-4 file:py-1 file:px-3 file:border-0 file:text-xs file:bg-black file:text-white file:hover:bg-gray-800"
                                required={!imagePreview}
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] tracking-[0.2em] text-gray-400 uppercase mb-2">
                                Category *
                            </label>
                            <select
                                name="category_id"
                                value={form.category_id}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none text-sm bg-white"
                                required
                            >
                                <option value="">Select category</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                            {errors?.category_id && <p className="text-red-500 text-xs mt-1">{errors.category_id[0]}</p>}
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 py-3 bg-black text-white text-sm tracking-wide hover:bg-white hover:text-black border-2 border-black transition-all duration-300 disabled:opacity-50"
                            >
                                {loading ? 'CREATING...' : 'CREATE PRODUCT'}
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
