import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct } from '../../../store/slices/productSlice';
import { Link } from 'react-router-dom';

export default function ProductList() {
    const dispatch = useDispatch();
    const { products, loading } = useSelector((state) => state.products);
    console.log('products:', products);
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            dispatch(deleteProduct(id));
        }
    };

    if (loading) return <p className="p-6">Loading...</p>;

    return (
        <div className="p-6">

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-700">Products</h1>
                <Link
                    to="/admin/products/create"
                    className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
                >
                    + Add Product
                </Link>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-100 text-gray-600 text-sm">
                        <tr>
                            <th className="px-6 py-3">ID</th>
                            <th className="px-6 py-3">Product Name</th>
                            <th className="px-6 py-3">Category</th>
                            <th className="px-6 py-3">Price</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {!products||products.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center py-6 text-gray-400">
                                    No products found
                                </td>
                            </tr>
                        ) : (
                            products
                            .filter(Boolean)
                            .map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">{product.id}</td>
                                    <td className="px-6 py-4">{product.title}</td>
                                    <td className="px-6 py-4">{product.category?.name}</td>
                                    <td className="px-6 py-4">${product.price}</td>
                                    <td className="px-6 py-4 flex gap-2">
                                        <Link
                                            to={`/admin/products/edit/${product.id}`}
                                            className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(product.id)}
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
