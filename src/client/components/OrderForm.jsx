import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../../store/slices/cartSlice';
import { createOrder } from '../../store/slices/orderSlice';

export default function OrderForm({ product , onClose }) {
    const dispatch = useDispatch();
    const { items } = useSelector((state) => state.cart);
    // Determine order items (either single product or cart items)
    const orderItems = product ? [product] : items;
    const total = orderItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
    const { error } = useSelector((state) => state.orders);

    const [form, setForm] = useState({
        full_name: '',
        email : '' ,
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

    const orderData = {
    customer_name: form.full_name,
    customer_email: form.email,
    customer_phone: form.phone,
    customer_address: form.address,
    city: form.city,
    notes: form.notes,
    total_price: total,
    items: orderItems.map((item) => ({
        product_id: item.id,
        quantity: item.quantity || 1,
        price: item.price,
    })),
};

    const result = await dispatch(createOrder(orderData));

    if (createOrder.fulfilled.match(result)) {
        dispatch(clearCart());
        setSubmitted(true);
    }

    setLoading(false);
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
                <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-lg font-light text-black">Complete Order</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-black text-xl">✕</button>
                </div>
                    <div className="border-t border-gray-200 pt-3 mt-3 flex justify-around">
                        <span className="text-black font-semibold">Total</span>
                        <span className="text-xl font-bold text-black">${total.toFixed(2)}</span>
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
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="Email Address"
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
                {error && (
                    <p className="text-red-500 text-xs text-center">{error}</p>
                )}
            </div>
        </div>
    );
}
