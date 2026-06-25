// pages/Product.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../../store/slices/productSlice';
import { addToCart } from '../../store/slices/cartSlice';
import { imageUrl } from '../../helpers/imageUrl';
import { FaHeart, FaShare, FaTruck, FaShieldAlt, FaUndo } from 'react-icons/fa';
import OrderForm from '../components/OrderForm';

export default function Product() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { product, loading } = useSelector((state) => state.products);
    const [quantity, setQuantity] = useState(1);
    const [selectedTab, setSelectedTab] = useState('description');
    const [showOrderForm, setShowOrderForm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        dispatch(fetchProduct(id));
        window.scrollTo(0, 0);
    }, [dispatch, id]);

    const handleAddToCart = () => {
        dispatch(addToCart({ ...product, quantity }));
        // Optional: Show success message
    };

    const handleOrderNow = () => {
        // Create order item with selected quantity
        const orderItem = {
            ...product,
            quantity: quantity
        };
        setSelectedProduct(orderItem);
        setShowOrderForm(true);
    };

    if (loading) {
        return (
            <div className="bg-white min-h-screen pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="animate-pulse">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="bg-gray-100 h-[500px]"></div>
                            <div className="space-y-4">
                                <div className="h-8 bg-gray-100 w-3/4"></div>
                                <div className="h-4 bg-gray-100 w-1/4"></div>
                                <div className="h-12 bg-gray-100 w-1/3"></div>
                                <div className="h-24 bg-gray-100"></div>
                                <div className="h-12 bg-gray-100 w-1/2"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="bg-white min-h-screen pt-32 pb-20 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-light text-black mb-4">Product Not Found</h2>
                    <button
                        onClick={() => navigate('/')}
                        className="px-8 py-3 bg-black text-white text-sm tracking-wide hover:bg-white hover:text-black border-2 border-black transition-all duration-300"
                    >
                        BACK TO HOME
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-6">

                {/* Breadcrumb */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                        <button onClick={() => navigate('/')} className="hover:text-black transition">Home</button>
                        <span>/</span>
                        <button onClick={() => navigate('/shop')} className="hover:text-black transition">Shop</button>
                        <span>/</span>
                        <span className="text-black">{product.title}</span>
                    </div>
                </div>

                {/* Product Main Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                    {/* Product Images */}
                    <div>
                        <div className="bg-gray-50 overflow-hidden">
                            <img
                                src={imageUrl(product.image)}
                                alt={product.title}
                                className="w-full h-[500px] object-cover"
                            />
                        </div>
                    </div>

                    {/* Product Info */}
                    <div>
                        {/* Category */}
                        <p className="text-[10px] tracking-[0.2em] text-gray-400 uppercase mb-3">
                            {product.category?.name || 'Eau de Parfum'}
                        </p>

                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl font-light text-black mb-3">
                            {product.title}
                        </h1>

                        {/* Price */}
                        <div className="flex items-baseline gap-3 mb-6">
                            <span className="text-3xl font-bold text-black">${product.price}</span>
                            <span className="text-xs text-gray-400">USD</span>
                        </div>

                        {/* Description Short */}
                        <p className="text-gray-500 text-sm leading-relaxed mb-6">
                            {product.description}
                        </p>

                        {/* Quantity Selector */}
                        <div className="mb-6">
                            <label className="block text-[10px] tracking-[0.2em] text-gray-400 uppercase mb-2">
                                Quantity
                            </label>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-10 h-10 border border-gray-200 hover:border-black transition-all duration-300 flex items-center justify-center"
                                >
                                    -
                                </button>
                                <span className="w-12 text-center font-medium text-black">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-10 h-10 border border-gray-200 hover:border-black transition-all duration-300 flex items-center justify-center"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Subtotal display (optional) */}
                        <div className="mb-4 text-right">
                            <span className="text-sm text-gray-500">Subtotal: </span>
                            <span className="text-lg font-bold text-black">
                                ${(product.price * quantity).toFixed(2)}
                            </span>
                        </div>

                        {/* Professional Buttons */}
                        <div className="flex gap-3 mb-6">
                            {/* Add to Cart Button */}
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-black text-white text-xs tracking-wide hover:bg-white hover:text-black border-2 border-black transition-all duration-300 font-medium"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6M17 13l1.5 6M9 21h6M12 18v3" />
                                </svg>
                                ADD TO CART
                            </button>

                            {/* Order Now Button */}
                            <button
                                onClick={handleOrderNow}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white text-xs tracking-wide hover:bg-white hover:text-green-600 border-2 border-green-700 transition-all duration-300 font-medium"
                            >
                                ORDER NOW
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 mb-8">
                            <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors">
                                <FaHeart size={14} />
                                Add to Wishlist
                            </button>
                            <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors">
                                <FaShare size={14} />
                                Share
                            </button>
                        </div>

                        {/* Features */}
                        <div className="border-t border-gray-100 pt-6 space-y-3">
                            <div className="flex items-center gap-3">
                                <FaTruck size={16} className="text-gray-400" />
                                <span className="text-xs text-gray-500">Free shipping on all orders</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <FaShieldAlt size={16} className="text-gray-400" />
                                <span className="text-xs text-gray-500">Secure payment guaranteed</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <FaUndo size={14} className="text-gray-400" />
                                <span className="text-xs text-gray-500">30-day return policy</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Details Tabs */}
                <div className="mt-16 pt-8 border-t border-gray-100">
                    <div className="flex gap-8 border-b border-gray-100">
                        {['description', 'details', 'shipping'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setSelectedTab(tab)}
                                className={`pb-3 text-sm tracking-wide transition-all duration-300 ${
                                    selectedTab === tab
                                        ? 'text-black border-b-2 border-black'
                                        : 'text-gray-400 hover:text-black'
                                }`}
                            >
                                {tab.toUpperCase()}
                            </button>
                        ))}
                    </div>
                    <div className="pt-6">
                        {selectedTab === 'description' && (
                            <p className="text-gray-500 text-sm leading-relaxed">
                                {product.description}
                            </p>
                        )}
                        {selectedTab === 'details' && (
                            <div className="space-y-2 text-sm text-gray-500">
                                <p><span className="text-black">Fragrance Family:</span> Oriental Floral</p>
                                <p><span className="text-black">Top Notes:</span> Bergamot, Mandarin</p>
                                <p><span className="text-black">Heart Notes:</span> Jasmine, Rose</p>
                                <p><span className="text-black">Base Notes:</span> Vanilla, Musk</p>
                                <p><span className="text-black">Size:</span> 100ml / 3.4oz</p>
                            </div>
                        )}
                        {selectedTab === 'shipping' && (
                            <div className="space-y-2 text-sm text-gray-500">
                                <p>Free standard shipping on all orders.</p>
                                <p>Delivery within 3-5 business days.</p>
                                <p>Express shipping available at checkout.</p>
                                <p>30-day easy returns.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Order Form Modal */}
            {showOrderForm && selectedProduct && (
                <OrderForm
                    product={selectedProduct}
                    onClose={() => {
                        setShowOrderForm(false);
                        setSelectedProduct(null);
                        navigate('/')
                    }}
                />
            )}
        </div>
    );
}
