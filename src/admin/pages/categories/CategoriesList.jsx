import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, deleteCategory, updateCategory, createCategory } from '../../../store/slices/categorySlice';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaSave, FaSpinner } from 'react-icons/fa';

export default function CategoryList() {
    const dispatch = useDispatch();
    const { categories, loading, errors } = useSelector((state) => state.categories);

    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [name, setName] = useState('');
    const [deleteLoading, setDeleteLoading] = useState(null);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingId) {
            const result = await dispatch(updateCategory({ id: editingId, data: { name } }));
            if (!result.error) resetForm();
        } else {
            const result = await dispatch(createCategory({ name }));
            if (!result.error) resetForm();
        }
    };

    const handleEdit = (category) => {
        setEditingId(category.id);
        setName(category.name);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            setDeleteLoading(id);
            await dispatch(deleteCategory(id));
            setDeleteLoading(null);
        }
    };

    const resetForm = () => {
        setShowForm(false);
        setEditingId(null);
        setName('');
    };

    return (
        <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-light text-black">Categories</h1>
                            <div className="w-12 h-px bg-black mt-2"></div>
                            <p className="text-sm text-gray-400 mt-2">
                                Total: <span className="text-black font-medium">{categories.length}</span> categories
                            </p>
                        </div>
                        <button
                            onClick={() => { resetForm(); setShowForm(true); }}
                            className="inline-flex items-center gap-2 px-6 py-2.5 bg-black text-white text-sm tracking-wide hover:bg-white hover:text-black border-2 border-black transition-all duration-300"
                        >
                            <FaPlus size={14} />
                            ADD CATEGORY
                        </button>
                    </div>
                </div>

                {/* Create / Edit Form Modal */}
                {showForm && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
                        <div className="bg-white max-w-md w-full animate-fadeInUp">
                            <div className="flex items-center justify-between p-6 border-b border-gray-100">
                                <h2 className="text-lg font-light text-black">
                                    {editingId ? 'Edit Category' : 'New Category'}
                                </h2>
                                <button
                                    onClick={resetForm}
                                    className="text-gray-400 hover:text-black transition-colors"
                                >
                                    <FaTimes size={18} />
                                </button>
                            </div>
                            <form onSubmit={handleSubmit} className="p-6 space-y-5">
                                <div>
                                    <label className="block text-[10px] tracking-[0.2em] text-gray-400 uppercase mb-2">
                                        Category Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter category name"
                                        className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none transition-colors text-sm"
                                        autoFocus
                                        required
                                    />
                                    {errors?.name && (
                                        <p className="text-red-500 text-xs mt-1">{errors.name[0]}</p>
                                    )}
                                </div>
                                <div className="flex gap-3 pt-2">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-black text-white text-sm tracking-wide hover:bg-white hover:text-black border-2 border-black transition-all duration-300 disabled:opacity-50"
                                    >
                                        <FaSave size={14} />
                                        {loading ? 'SAVING...' : (editingId ? 'UPDATE' : 'CREATE')}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="px-6 py-2.5 bg-transparent text-black text-sm tracking-wide border border-gray-300 hover:border-black transition-all duration-300"
                                    >
                                        CANCEL
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Categories Table */}
                <div className="bg-white border border-gray-200 overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-[10px] tracking-[0.2em] text-gray-400 uppercase font-medium w-20">
                                    ID
                                </th>
                                <th className="px-6 py-4 text-[10px] tracking-[0.2em] text-gray-400 uppercase font-medium">
                                    Category Name
                                </th>
                                <th className="px-6 py-4 text-[10px] tracking-[0.2em] text-gray-400 uppercase font-medium w-32">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading && categories.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className="px-6 py-12">
                                        <div className="flex justify-center">
                                            <FaSpinner className="w-6 h-6 text-gray-300 animate-spin" />
                                        </div>
                                    </td>
                                </tr>
                            ) : categories.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <svg className="w-12 h-12 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l5 5a2 2 0 01.586 1.414V19a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z" />
                                            </svg>
                                            <p className="text-gray-400 text-sm">No categories found</p>
                                            <button
                                                onClick={() => { resetForm(); setShowForm(true); }}
                                                className="text-xs text-black border-b border-black hover:text-gray-600 transition-colors"
                                            >
                                                Create your first category
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                categories.map((category) => (
                                    <tr key={category.id} className="hover:bg-gray-50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-gray-400">#{category.id}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-medium text-black">{category.name}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleEdit(category)}
                                                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-black text-white text-xs tracking-wide hover:bg-white hover:text-black border border-black transition-all duration-300"
                                                >
                                                    <FaEdit size={12} />
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(category.id)}
                                                    disabled={deleteLoading === category.id}
                                                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-transparent text-red-500 text-xs tracking-wide border border-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 disabled:opacity-50"
                                                >
                                                    {deleteLoading === category.id ? (
                                                        <FaSpinner size={12} className="animate-spin" />
                                                    ) : (
                                                        <FaTrash size={12} />
                                                    )}
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer Info */}
                {categories.length > 0 && (
                    <div className="mt-4 text-center">
                        <p className="text-[10px] text-gray-400">
                            Showing {categories.length} {categories.length === 1 ? 'category' : 'categories'}
                        </p>
                    </div>
                )}
            </div>

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fadeInUp {
                    animation: fadeInUp 0.3s ease-out;
                }
            `}</style>
        </div>
    );
}
