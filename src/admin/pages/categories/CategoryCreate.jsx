import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createCategory, clearErrors } from '../../../store/slices/categorySlice';
import { useState } from 'react';

export default function CategoryCreate() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, errors } = useSelector((state) => state.categories);

    const [name, setName] = useState('');

    useEffect(() => {
        return () => dispatch(clearErrors());
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(createCategory({ name }));
        if (!result.error) navigate('/admin/categories');
    };

    return (
        <div className="p-6">

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-700">Create Category</h1>
                <button
                    onClick={() => navigate('/admin/categories')}
                    className="text-gray-500 hover:text-gray-700"
                >
                    ← Back to Categories
                </button>
            </div>

            {/* Form */}
            <div className="bg-white rounded-xl shadow p-6 max-w-md">
                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Name */}
                    <div>
                        <label className="block text-gray-600 font-medium mb-1">
                            Category Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Electronics"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors?.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name[0]}</p>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition disabled:opacity-50"
                        >
                            {loading ? 'Creating...' : 'Create Category'}
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/admin/categories')}
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
