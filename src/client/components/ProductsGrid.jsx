// components/ProductsGrid.jsx
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../../store/slices/cartSlice';
import { imageUrl } from '../../helpers/imageUrl';
import { FaShoppingBag, FaEye } from 'react-icons/fa';

export default function ProductsGrid({ products, title, subtitle, columns = 3 }) {
    const dispatch = useDispatch();
    const [hoveredProduct, setHoveredProduct] = useState(null);

    const getGridCols = () => {
        switch (columns) {
            case 2: return 'grid-cols-1 md:grid-cols-2';
            case 3: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
            case 4: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
            default: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
        }
    };

    if (!products || products.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-400">No products found</p>
            </div>
        );
    }

    return (
        <div>
            {/* Section Header */}
            {(title || subtitle) && (
                <div className="text-center mb-12">
                    {subtitle && (
                        <span className="text-xs tracking-[0.2em] text-gray-400 uppercase">
                            {subtitle}
                        </span>
                    )}
                    {title && (
                        <>
                            <h2 className="text-3xl md:text-4xl font-light text-black mt-2">
                                {title}
                            </h2>
                            <div className="w-12 h-px bg-black mx-auto mt-4"></div>
                        </>
                    )}
                </div>
            )}

            {/* Products Grid */}
            <div className={`grid ${getGridCols()} gap-8`}>
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="group relative bg-white border border-gray-100 hover:border-black transition-all duration-500 hover:shadow-2xl"
                        onMouseEnter={() => setHoveredProduct(product.id)}
                        onMouseLeave={() => setHoveredProduct(null)}
                    >
                        {/* Product Badge */}
                        {product.isNew && (
                            <div className="absolute top-4 left-4 z-10">
                                <span className="text-[10px] tracking-[0.15em] uppercase bg-black text-white px-3 py-1">
                                    New
                                </span>
                            </div>
                        )}

                        {/* Image Container */}
                        <Link to={`/product/${product.id}`}>
                            <div className="relative overflow-hidden bg-gray-50">
                                <img
                                    src={imageUrl(product.image)}
                                    alt={product.title}
                                    className="w-full h-[380px] object-cover transition-all duration-700 group-hover:scale-105"
                                    loading="lazy"
                                />

                                {/* Quick View Overlay */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"></div>

                                {/* Quick Actions */}
                                {hoveredProduct === product.id && (
                                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 animate-fadeInUp">
                                        <button
                                            onClick={() => dispatch(addToCart({ ...product, quantity: 1 }))}
                                            className="w-10 h-10 bg-black text-white flex items-center justify-center hover:bg-white hover:text-black border border-black transition-all duration-300"
                                        >
                                            <FaShoppingBag size={14} />
                                        </button>
                                        <Link
                                            to={`/product/${product.id}`}
                                            className="w-10 h-10 bg-white text-black flex items-center justify-center hover:bg-black hover:text-white border border-black transition-all duration-300"
                                        >
                                            <FaEye size={14} />
                                        </Link>
                                    </div>
                                )}
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
                            <p className="text-gray-500 text-sm leading-relaxed mb-3 line-clamp-2">
                                {product.description}
                            </p>
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="text-xl font-bold text-black">
                                        ${product.price}
                                    </span>
                                </div>
                                <button
                                    onClick={() => dispatch(addToCart({ ...product, quantity: 1 }))}
                                    className="px-4 py-2 bg-black text-white text-xs tracking-wide hover:bg-white hover:text-black border border-black transition-all duration-300"
                                >
                                    ADD TO CART
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
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
