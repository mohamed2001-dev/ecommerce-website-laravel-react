import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../../store/slices/cartSlice';

export default function OrderForm({ onClose }) {
    const dispatch = useDispatch();
    const { items } = useSelector((state) => state.cart);
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const [form, setForm] = useState({
        full_name: '',
        phone: '',
        address: '',
        city: '',
        notes: '',
    });

    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
            dispatch(clearCart());
        }, 1500);
    };

    if (submitted) {
        return (
            <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center px-4">
                <div className="bg-white max-w-md w-full text-center p-8">
                    <div className="text-5xl mb-4">✓</div>
                    <h2 className="text-2xl font-light text-black mb-2">Order Placed!</h2>
                    <div className="w-12 h-px bg-black/20 mx-auto my-4"></div>
                    <p className="text-gray-500 text-sm mb-1">
                        Thank you, <span className="text-black">{form.full_name}</span>
                    </p>
                    <p className="text-gray-400 text-xs mb-6">
                        We'll contact you at {form.phone}
                    </p>
                    <p className="text-3xl font-bold text-black mb-6">${total.toFixed(2)}</p>
                    <button
                        onClick={onClose}
                        className="w-full py-3 bg-black text-white text-sm tracking-wide hover:bg-white hover:text-black border-2 border-black transition-all duration-300"
                    >
                        CONTINUE SHOPPING
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-4 py-8">
            <div className="bg-white max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-lg font-light text-black">Complete Order</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-black text-xl">✕</button>
                </div>

                <div className="p-6 border-b border-gray-100 bg-gray-50/30">
                    <p className="text-xs text-gray-400 mb-3">Order Summary</p>
                    {items.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm mb-2">
                            <span className="text-gray-600">{item.title} x{item.quantity}</span>
                            <span className="text-black">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                    <div className="border-t border-gray-200 pt-3 mt-3 flex justify-between">
                        <span className="text-black font-semibold">Total</span>
                        <span className="text-xl font-bold text-black">${total.toFixed(2)}</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <input
                        type="text"
                        name="full_name"
                        value={form.full_name}
                        onChange={handleChange}
                        required
                        placeholder="Full Name"
                        className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none text-sm"
                    />
                    <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        placeholder="Phone Number"
                        className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none text-sm"
                    />
                    <input
                        type="text"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        required
                        placeholder="Address"
                        className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none text-sm"
                    />
                    <input
                        type="text"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        required
                        placeholder="City"
                        className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none text-sm"
                    />
                    <textarea
                        name="notes"
                        value={form.notes}
                        onChange={handleChange}
                        placeholder="Notes (optional)"
                        rows={2}
                        className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none text-sm resize-none"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-green-600 text-white text-sm tracking-wide hover:bg-white hover:text-green-700 border-2 border-green-700 transition-all duration-300 disabled:opacity-50"
                    >
                        {loading ? 'PROCESSING...' : `Order Now • $${total.toFixed(2)}`}
                    </button>
                </form>
            </div>
        </div>
    );
}
