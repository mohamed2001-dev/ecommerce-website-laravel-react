import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/slices/productSlice";
import { addToCart } from "../../store/slices/cartSlice";
import { imageUrl } from "../../helpers/imageUrl";
import { Link } from "react-router-dom";
import OrderForm from "../components/OrderForm";

function Shop() {
    const { products, loading } = useSelector((state) => state.products);
    const dispatch = useDispatch();
    const [showOrderForm, setShowOrderForm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleOrderNow = (product) => {
        setSelectedProduct(product);
        setShowOrderForm(true);
    };

    if (loading) {
        return (
            <div className="bg-white min-h-screen pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="bg-gray-100 animate-pulse h-[500px]"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (!products || products.length === 0) {
        return (
            <div className="bg-white min-h-screen pt-32 pb-20 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-400 text-lg">No products found</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-light text-black">Shop</h1>
                    <div className="w-12 h-px bg-black mx-auto mt-3"></div>
                    <p className="text-gray-500 mt-4 text-sm">
                        Discover our complete collection of luxury fragrances
                    </p>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="group relative bg-white border border-gray-100 hover:border-black transition-all duration-500 hover:shadow-2xl"
                        >
                            {/* Product Badge */}
                            <div className="absolute top-4 left-4 z-10">
                                <span className="text-[10px] tracking-[0.15em] uppercase bg-black text-white px-3 py-1">
                                    New
                                </span>
                            </div>

                            {/* Image Container */}
                            <Link to={`/product/${product.id}`}>
                                <div className="relative overflow-hidden bg-gray-50">
                                    <img
                                        src={imageUrl(product.image)}
                                        alt={product.title}
                                        className="w-full h-[380px] object-cover transition-all duration-700 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"></div>
                                </div>
                            </Link>

                            {/* Content */}
                            <div className="p-5">
                                <Link to={`/product/${product.id}`}>
                                    <h3 className="text-lg font-semibold text-black mb-1 tracking-tight line-clamp-1 hover:opacity-70 transition">
                                        {product.title}
                                    </h3>
                                </Link>
                                <p className="text-xs text-gray-400 uppercase mb-2">
                                    {product.category?.name || 'Eau de Parfum'}
                                </p>
                                <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                                    {product.description}
                                </p>

                                {/* Price */}
                                <div className="mb-4">
                                    <span className="text-2xl font-bold text-black">
                                        ${product.price}
                                    </span>
                                    <span className="text-xs text-gray-400 ml-1">USD</span>
                                </div>

                                {/* Buttons */}
                                <div className="flex gap-3">
                                    {/* Add to Cart Button */}
                                    <button
                                        onClick={() => dispatch(addToCart({ ...product, quantity: 1 }))}
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-black text-white text-xs tracking-wide hover:bg-white hover:text-black border-2 border-black transition-all duration-300 font-medium"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6M17 13l1.5 6M9 21h6M12 18v3" />
                                        </svg>
                                        ADD TO CART
                                    </button>

                                    {/* Order Now Button */}
                                    <button
                                        onClick={() => handleOrderNow(product)}
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white text-xs tracking-wide hover:bg-white hover:text-green-600 border-2 border-green-700 transition-all duration-300 font-medium"
                                    >
                                        ORDER NOW
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Products Count */}
                <div className="text-center mt-12 pt-8 border-t border-gray-100">
                    <p className="text-xs text-gray-400">
                        Showing {products.length} products
                    </p>
                </div>
            </div>

            {/* Order Form Modal */}
            {showOrderForm && selectedProduct && (
                <OrderForm
                    product={selectedProduct}
                    onClose={() => {
                        setShowOrderForm(false);
                        setSelectedProduct(null);
                    }}
                />
            )}
        </div>
    );
}

export default Shop;
