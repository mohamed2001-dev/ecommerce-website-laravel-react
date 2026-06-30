import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchOrders,
    updateOrderStatus,
    deleteOrder,
    clearOrderMessages,
} from "../../store/slices/orderSlice";
import {
    FaClipboardList,
    FaTrash,
    FaBoxOpen,
    FaSpinner,
    FaChevronDown,
    FaCheck,
} from "react-icons/fa";

const STATUS_CONFIG = {
    pending:    { label: "Pending",    desc: "Awaiting confirmation", color: "bg-amber-400" },
    processing: { label: "Processing", desc: "Being prepared",        color: "bg-blue-400" },
    shipped:    { label: "Shipped",    desc: "On the way",            color: "bg-purple-400" },
    delivered:  { label: "Delivered",  desc: "Order completed",       color: "bg-green-500" },
    cancelled:  { label: "Cancelled",  desc: "Order cancelled",       color: "bg-red-400" },
};

const STATUS_OPTIONS = ["pending", "processing", "shipped", "delivered", "cancelled"];

function StatusDropdown({ orderId, current, onChange }) {
    const [open, setOpen] = useState(false);
    const config = STATUS_CONFIG[current] || STATUS_CONFIG.pending;

    return (
        <div className="relative">
            {/* Trigger */}
            <button
                onClick={() => setOpen((o) => !o)}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors text-sm font-medium text-gray-700"
            >
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${config.color}`} />
                {config.label}
                <FaChevronDown
                    size={9}
                    className={`text-gray-400 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
                />
            </button>

            {/* Dropdown */}
            {open && (
                <div className="absolute top-full right-0 mt-1.5 z-50 bg-white border border-gray-200 rounded-xl overflow-hidden min-w-[200px]"
                    style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)" }}
                >
                    <div className="px-3 py-2 border-b border-gray-100">
                        <p className="text-[10px] tracking-widest text-gray-400 uppercase font-medium">
                            Set order status
                        </p>
                    </div>

                    {STATUS_OPTIONS.map((s) => {
                        const c = STATUS_CONFIG[s];
                        const isActive = s === current;
                        return (
                            <button
                                key={s}
                                onClick={() => { onChange(orderId, s); setOpen(false); }}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-gray-50 ${isActive ? "bg-gray-50" : ""}`}
                            >
                                <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${c.color}`} />
                                <div className="flex-1 min-w-0">
                                    <p className={`text-sm ${isActive ? "font-medium text-gray-900" : "text-gray-600"}`}>
                                        {c.label}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-0.5">{c.desc}</p>
                                </div>
                                {isActive && <FaCheck size={10} className="text-blue-500 flex-shrink-0" />}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

function Orders() {
    const dispatch = useDispatch();
    const { orders, loading, error, successMessage } = useSelector((state) => state.orders);
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [ , setOpenDropdown] = useState(null);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    useEffect(() => {
        if (successMessage || error) {
            const timer = setTimeout(() => dispatch(clearOrderMessages()), 3000);
            return () => clearTimeout(timer);
        }
    }, [successMessage, error, dispatch]);

    // close dropdown on outside click
    useEffect(() => {
        const handler = () => setOpenDropdown(null);
        document.addEventListener("click", handler);
        return () => document.removeEventListener("click", handler);
    }, []);

    function handleStatusChange(orderId, newStatus) {
        dispatch(updateOrderStatus({ id: orderId, status: newStatus }));
    }

    function handleDelete(id) {
        dispatch(deleteOrder(id));
        setDeleteConfirm(null);
    }

    const stats = {
        total:     orders.length,
        pending:   orders.filter((o) => o.status === "pending").length,
        delivered: orders.filter((o) => o.status === "delivered").length,
        revenue:   orders
            .filter((o) => o.status !== "cancelled")
            .reduce((sum, o) => sum + Number(o.total_price || 0), 0),
    };

    const statCards = [
        { label: "Total orders", value: stats.total },
        { label: "Pending",      value: stats.pending },
        { label: "Delivered",    value: stats.delivered },
        { label: "Revenue",      value: `$${stats.revenue.toFixed(2)}` },
    ];

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Toast */}
            {(successMessage || error) && (
                <div className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-lg text-sm font-medium shadow-lg ${
                    successMessage
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-red-50 text-red-700 border border-red-200"
                }`}>
                    {successMessage || error}
                </div>
            )}

            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-5">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                        <p className="text-[11px] tracking-widest text-gray-400 uppercase">Admin panel</p>
                        <h1 className="text-2xl font-medium text-gray-900 mt-1">Orders</h1>
                        <p className="text-sm text-gray-400 mt-1">View and manage all customer orders.</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                        <FaClipboardList size={14} />
                        <span>{orders.length} total orders</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-6">

                {/* Stat cards */}
                <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 mb-6">
                    {statCards.map((card, i) => (
                        <div key={i} className="bg-white rounded-xl p-5 border border-gray-100">
                            <p className="text-[11px] tracking-widest text-gray-400 uppercase">{card.label}</p>
                            <p className="text-3xl font-medium text-gray-900 mt-3 leading-none">{card.value}</p>
                        </div>
                    ))}
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl border border-gray-100 overflow-visible">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-24 text-gray-300">
                            <FaSpinner className="animate-spin mb-3" size={28} />
                            <p className="text-sm">Loading orders…</p>
                        </div>
                    ) : orders.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-24 text-gray-300">
                            <FaBoxOpen size={40} className="mb-3" />
                            <p className="text-sm font-medium text-gray-400">No orders found</p>
                            <p className="text-xs text-gray-300 mt-1">Orders will appear here once customers start buying.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-gray-100 bg-gray-50">
                                        <th className="text-left px-5 py-3.5 text-[11px] tracking-widest text-gray-400 uppercase font-medium">Order</th>
                                        <th className="text-left px-5 py-3.5 text-[11px] tracking-widest text-gray-400 uppercase font-medium">Customer</th>
                                        <th className="text-left px-5 py-3.5 text-[11px] tracking-widest text-gray-400 uppercase font-medium">Email</th>
                                        <th className="text-left px-5 py-3.5 text-[11px] tracking-widest text-gray-400 uppercase font-medium">Phone</th>
                                        <th className="text-left px-5 py-3.5 text-[11px] tracking-widest text-gray-400 uppercase font-medium">City</th>
                                        <th className="text-left px-5 py-3.5 text-[11px] tracking-widest text-gray-400 uppercase font-medium">Date</th>
                                        <th className="text-left px-5 py-3.5 text-[11px] tracking-widest text-gray-400 uppercase font-medium">Total</th>
                                        <th className="text-left px-5 py-3.5 text-[11px] tracking-widest text-gray-400 uppercase font-medium">Status</th>
                                        <th className="px-5 py-3.5" />
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50 relative">
                                    {orders.map((order) => (
                                        <tr key={order.id} className="hover:bg-gray-50 transition-colors">

                                            {/* Order ID */}
                                            <td className="px-5 py-4">
                                                <span className="font-medium text-gray-900">#{order.id}</span>
                                            </td>

                                            {/* Customer — name  */}
                                            <td className="px-5 py-4">
                                                <p className="font-medium text-gray-900">
                                                    {order.customer_name || "—"}
                                                </p>
                                            </td>
                                            {/* Customer - email */}
                                            <td className="px-5 py-4">
                                                <p className="text-xs text-gray-400 mt-0.5">
                                                    {order.customer_email || ""}
                                                </p>
                                            </td>

                                            {/* Phone — own column */}
                                            <td className="px-5 py-4 text-gray-500 text-sm">
                                                {order.customer_phone || "—"}
                                            </td>

                                            {/* City */}
                                            <td className="px-5 py-4 text-gray-500 text-sm">
                                                {order.city || "—"}
                                            </td>

                                            {/* Date */}
                                            <td className="px-5 py-4 text-gray-500 text-sm">
                                                {order.created_at
                                                    ? new Date(order.created_at).toLocaleDateString("en-US", {
                                                        month: "short",
                                                        day: "numeric",
                                                        year: "numeric",
                                                    })
                                                    : "—"}
                                            </td>

                                            {/* Total */}
                                            <td className="px-5 py-4 font-medium text-gray-900">
                                                ${Number(order.total_price || 0).toFixed(2)}
                                            </td>

                                            {/* Status */}
                                            <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                                                <StatusDropdown
                                                    orderId={order.id}
                                                    current={order.status}
                                                    onChange={handleStatusChange}
                                                />
                                            </td>

                                            {/* Delete */}
                                            <td className="px-5 py-4 text-right">
                                                {deleteConfirm === order.id ? (
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button
                                                            onClick={() => handleDelete(order.id)}
                                                            className="px-2.5 py-1 text-[11px] font-medium bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
                                                        >
                                                            Confirm
                                                        </button>
                                                        <button
                                                            onClick={() => setDeleteConfirm(null)}
                                                            className="px-2.5 py-1 text-[11px] font-medium bg-gray-50 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={() => setDeleteConfirm(order.id)}
                                                        className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                        aria-label="Delete order"
                                                    >
                                                        <FaTrash size={13} />
                                                    </button>
                                                )}
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Orders;
