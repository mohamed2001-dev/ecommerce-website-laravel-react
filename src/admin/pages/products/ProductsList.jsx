import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct } from '../../../store/slices/productSlice';
import { Link } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaSpinner } from 'react-icons/fa';

export default function ProductList() {
    const dispatch = useDispatch();
    const { products, loading } = useSelector((state) => state.products);

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [deleteLoading, setDeleteLoading] = useState(null);

    // Custom toast states
    const [confirmToast, setConfirmToast] = useState(null);
    const [notification, setNotification] = useState(null);
    const notificationTimer = useRef(null);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        return () => {
            if (notificationTimer.current) {
                clearTimeout(notificationTimer.current);
            }
        };
    }, []);

    const showNotification = (message, type = 'success') => {
        setNotification({ message, type });

        if (notificationTimer.current) {
            clearTimeout(notificationTimer.current);
        }

        notificationTimer.current = setTimeout(() => {
            setNotification(null);
        }, 3000);
    };

    const handleDelete = (id) => {
        setConfirmToast(id);
    };

    const confirmDeleteProduct = async (id) => {
        try {
            setConfirmToast(null);
            setDeleteLoading(id);

            await dispatch(deleteProduct(id));

            showNotification('Product deleted successfully', 'success');
        } catch (error) {
            showNotification('Failed to delete product', error);
        } finally {
            setDeleteLoading(null);
        }
    };

    const cancelDelete = () => {
        setConfirmToast(null);
    };

    // Filter products by search
    const filteredProducts = products?.filter(product =>
        product?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product?.category?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    if (loading) {
        return (
            <div className="bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <FaSpinner className="w-8 h-8 text-black animate-spin mx-auto mb-4" />
                    <p className="text-gray-500">Loading products...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">

           {/* Custom Confirmation Toast */}
{confirmToast && (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
        <div className="w-full max-w-sm bg-white border border-gray-200 shadow-xl p-5">
            <h3 className="text-sm font-semibold text-black mb-2">
                Delete product?
            </h3>

            <p className="text-xs text-gray-500 mb-4">
                Are you sure you want to delete this product? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-2">
                <button
                    onClick={cancelDelete}
                    className="px-4 py-2 text-xs border border-gray-300 text-gray-600 hover:border-black hover:text-black transition"
                >
                    Cancel
                </button>

                <button
                    onClick={() => confirmDeleteProduct(confirmToast)}
                    className="px-4 py-2 text-xs bg-red-500 text-white hover:bg-red-600 transition"
                >
                    Delete
                </button>
            </div>
        </div>
    </div>
)}
            {/* Custom Notification Toast */}
{notification && (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 pointer-events-none">
        <div
            className={`w-full max-w-sm p-4 shadow-xl border bg-white ${
                notification.type === 'success'
                    ? 'border-green-500'
                    : 'border-red-500'
            }`}
        >
            <p
                className={`text-sm font-medium text-center ${
                    notification.type === 'success'
                        ? 'text-green-600'
                        : 'text-red-600'
                }`}
            >
                {notification.message}
            </p>
        </div>
    </div>
)}

            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-light text-black">Products</h1>
                            <div className="w-12 h-px bg-black mt-2"></div>
                            <p className="text-sm text-gray-400 mt-2">
                                Total: <span className="text-black font-medium">{products?.length || 0}</span> products
                            </p>
                        </div>

                        <Link
                            to="/admin/products/create"
                            className="inline-flex items-center gap-2 px-6 py-2.5 bg-black text-white text-sm tracking-wide hover:bg-white hover:text-black border-2 border-black transition-all duration-300"
                        >
                            <FaPlus size={14} />
                            ADD PRODUCT
                        </Link>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="mb-6">
                    <div className="relative max-w-md">
                        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300" size={16} />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 border border-gray-200 focus:border-black outline-none transition-colors text-sm"
                        />
                    </div>
                </div>

                {/* Products Table */}
                <div className="bg-white border border-gray-200 overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-[10px] tracking-[0.2em] text-gray-400 uppercase font-medium">ID</th>
                                <th className="px-6 py-4 text-[10px] tracking-[0.2em] text-gray-400 uppercase font-medium">Product Name</th>
                                <th className="px-6 py-4 text-[10px] tracking-[0.2em] text-gray-400 uppercase font-medium">Category</th>
                                <th className="px-6 py-4 text-[10px] tracking-[0.2em] text-gray-400 uppercase font-medium">Price</th>
                                <th className="px-6 py-4 text-[10px] tracking-[0.2em] text-gray-400 uppercase font-medium">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">
                            {currentProducts.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-12">
                                        <p className="text-gray-400 text-sm">No products found</p>
                                    </td>
                                </tr>
                            ) : (
                                currentProducts.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-sm text-gray-500">#{product.id}</td>

                                        <td className="px-6 py-4">
                                            <span className="text-sm font-medium text-black">{product.title}</span>
                                        </td>

                                        <td className="px-6 py-4">
                                            <span className="text-xs text-gray-500">
                                                {product.category?.name || 'Uncategorized'}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4">
                                            <span className="text-sm font-semibold text-black">
                                                ${product.price}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <Link
                                                    to={`/admin/products/edit/${product.id}`}
                                                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-black text-white text-xs tracking-wide hover:bg-white hover:text-black border border-black transition-all duration-300"
                                                >
                                                    <FaEdit size={12} />
                                                    Edit
                                                </Link>

                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    disabled={deleteLoading === product.id}
                                                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-transparent text-red-500 text-xs tracking-wide border border-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 disabled:opacity-50"
                                                >
                                                    {deleteLoading === product.id ? (
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

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center gap-2 mt-8">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 text-sm border border-gray-200 hover:border-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>

                        <span className="px-4 py-2 text-sm text-gray-500">
                            Page {currentPage} of {totalPages}
                        </span>

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 text-sm border border-gray-200 hover:border-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
