import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, deleteCategory, updateCategory, createCategory } from '../../../store/slices/categorySlice';

export default function CategoryList() {
    const dispatch = useDispatch();
    const { categories, loading, errors } = useSelector((state) => state.categories);

    const [showForm, setShowForm]     = useState(false);
    const [editingId, setEditingId]   = useState(null);
    const [name, setName]             = useState('');

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

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            dispatch(deleteCategory(id));
        }
    };

    const resetForm = () => {
        setShowForm(false);
        setEditingId(null);
        setName('');
    };

    return (
        <div className="p-6">

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-700">Categories</h1>
                <button
                    onClick={() => { resetForm(); setShowForm(true); }}
                    className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
                >
                    + Add Category
                </button>
            </div>

            {/* Create / Edit Form */}
            {showForm && (
                <div className="bg-white rounded-xl shadow p-6 mb-6 max-w-md">
                    <h2 className="text-lg font-semibold mb-4">
                        {editingId ? 'Edit Category' : 'New Category'}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Category name"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors?.name && (
                                <p className="text-red-500 text-sm mt-1">{errors.name[0]}</p>
                            )}
                        </div>
                        <div className="flex gap-3">
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-blue-700 text-white px-5 py-2 rounded-lg hover:bg-blue-800 disabled:opacity-50"
                            >
                                {loading ? 'Saving...' : editingId ? 'Update' : 'Create'}
                            </button>
                            <button
                                type="button"
                                onClick={resetForm}
                                className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Table */}
            <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-100 text-gray-600 text-sm">
                        <tr>
                            <th className="px-6 py-3">ID</th>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {categories.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="text-center py-6 text-gray-400">
                                    No categories found
                                </td>
                            </tr>
                        ) : (
                            categories.map((category) => (
                                <tr key={category.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">{category.id}</td>
                                    <td className="px-6 py-4">{category.name}</td>
                                    <td className="px-6 py-4 flex gap-2">
                                        <button
                                            onClick={() => handleEdit(category)}
                                            className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(category.id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

        </div>
    );
}
