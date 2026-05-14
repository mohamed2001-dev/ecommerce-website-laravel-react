import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
} from '../../store/slices/cartSlice';
import { imageUrl } from '../../helpers/imageUrl';
import OrderForm from '../components/OrderForm';
import { FaTrashAlt, FaArrowLeft, FaShoppingBag, FaCreditCard, FaShieldAlt, FaTruck } from 'react-icons/fa';

export default function Cart() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items } = useSelector((state) => state.cart);

    const [showOrderForm, setShowOrderForm] = useState(false);

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
                <div className="text-center max-w-md">
                    <div className="mb-8">
                        <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
                            <FaShoppingBag size="48" className="text-gray-300" />
                        </div>
                    </div>
                    <h2 className="text-3xl font-light text-black mb-3">Your Cart is Empty</h2>
                    <div className="w-12 h-px bg-black/20 mx-auto my-4"></div>
                    <p className="text-gray-500 text-sm leading-relaxed mb-8">
                        Discover our luxury collection and find your perfect fragrance.
                    </p>
                    <Link
                        to="/"
                        className="inline-block px-10 py-3.5 bg-black text-white text-sm tracking-wide hover:bg-white hover:text-black border-2 border-black transition-all duration-300"
                    >
                        EXPLORE COLLECTION
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen pt-28 pb-20">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="mb-12">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <span className="text-[10px] tracking-[0.2em] text-gray-400 uppercase">Cart</span>
                            <h1 className="text-3xl md:text-4xl font-light text-black mt-1">
                                Shopping <span className="font-bold">Cart</span>
                            </h1>
                            <div className="w-12 h-px bg-black mt-3"></div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-500">{totalItems} items</p>
                            <p className="text-2xl font-bold text-black">${total.toFixed(2)}</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-3">
                        {/* Header Row */}
                        <div className="hidden lg:grid grid-cols-12 gap-4 px-4 py-3 text-[10px] tracking-[0.2em] text-gray-400 uppercase border-b border-gray-200">
                            <div className="col-span-5">Product</div>
                            <div className="col-span-3 text-center">Quantity</div>
                            <div className="col-span-2 text-right">Subtotal</div>
                            <div className="col-span-2 text-right"></div>
                        </div>

                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white border border-gray-100 hover:border-black/30 transition-all duration-300"
                            >
                                <div className="p-4 md:p-5">
                                    <div className="flex flex-wrap md:flex-nowrap gap-4 items-center">
                                        {/* Image */}
                                        <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-50 flex-shrink-0 overflow-hidden">
                                            <img
                                                src={imageUrl(item.image)}
                                                alt={item.title}
                                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                            />
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-medium text-black text-base md:text-lg mb-1 line-clamp-1">
                                                {item.title}
                                            </h3>
                                            <p className="text-gray-400 text-[10px] tracking-wide mb-2">
                                                EAU DE PARFUM
                                            </p>
                                            <p className="text-black font-bold text-lg md:text-xl">
                                                ${item.price}
                                            </p>
                                        </div>

                                        {/* Quantity */}
                                        <div className="flex items-center gap-2 md:gap-3">
                                            <button
                                                onClick={() => dispatch(decreaseQuantity(item.id))}
                                                className="w-7 h-7 md:w-8 md:h-8 border border-gray-300 hover:border-black hover:bg-black hover:text-white transition-all duration-300 flex items-center justify-center text-lg"
                                            >
                                                -
                                            </button>
                                            <span className="w-8 text-center font-medium text-black">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => dispatch(increaseQuantity(item.id))}
                                                className="w-7 h-7 md:w-8 md:h-8 border border-gray-300 hover:border-black hover:bg-black hover:text-white transition-all duration-300 flex items-center justify-center text-lg"
                                            >
                                                +
                                            </button>
                                        </div>

                                        {/* Subtotal */}
                                        <div className="min-w-[70px] md:min-w-[90px] text-right">
                                            <p className="font-bold text-black text-lg md:text-xl">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>

                                        {/* Remove */}
                                        <button
                                            onClick={() => dispatch(removeFromCart(item.id))}
                                            className="text-gray-300 hover:text-red-500 transition-colors"
                                        >
                                            <FaTrashAlt size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Continue Shopping */}
                        <div className="pt-4">
                            <Link
                                to="/"
                                className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-black transition-colors group"
                            >
                                <FaArrowLeft size={10} className="group-hover:-translate-x-1 transition-transform" />
                                CONTINUE SHOPPING
                            </Link>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white border border-gray-200 p-5 md:p-6 sticky top-28">
                            <h2 className="text-base font-semibold text-black mb-5 tracking-wide border-b border-gray-100 pb-3">
                                Order Summary
                            </h2>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Subtotal ({totalItems} items)</span>
                                    <span className="text-black">${total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Shipping</span>
                                    <span className="text-black">Free</span>
                                </div>
                                <div className="border-t border-gray-100 pt-3 mt-3">
                                    <div className="flex justify-between">
                                        <span className="text-black font-semibold">Total</span>
                                        <span className="text-2xl md:text-3xl font-bold text-black">${total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => setShowOrderForm(true)}
                                className="w-full py-3.5 bg-green-600 text-white text-sm tracking-wide hover:bg-white hover:text-green-800 border-2 border-green-600 transition-all duration-300"
                            >
                                CHECKOUT
                            </button>

                            {/* Features */}
                            <div className="mt-6 space-y-3 pt-4 border-t border-gray-100">
                                <div className="flex items-center gap-3">
                                    <FaTruck size={14} className="text-gray-400" />
                                    <p className="text-[10px] tracking-wide text-gray-400">FREE SHIPPING ON ALL ORDERS</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FaShieldAlt size={14} className="text-gray-400" />
                                    <p className="text-[10px] tracking-wide text-gray-400">SECURE PAYMENT GUARANTEED</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FaCreditCard size={14} className="text-gray-400" />
                                    <p className="text-[10px] tracking-wide text-gray-400">100% SAFE CHECKOUT</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Order Form Modal */}
            {showOrderForm && (
                <OrderForm onClose={() => {
                    setShowOrderForm(false);
                    navigate('/');
                }} />
            )}
        </div>
    );
}
