import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    FaBox, FaLayerGroup, FaDollarSign, FaChartLine,
    FaPlus, FaArrowRight, FaTrophy, FaStar,
} from "react-icons/fa";

const AVATAR_COLORS = [
    "bg-blue-100 text-blue-700",
    "bg-purple-100 text-purple-700",
    "bg-amber-100 text-amber-700",
    "bg-green-100 text-green-700",
    "bg-red-100 text-red-700",
];

function getInitials(title = "") {
    return title.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

function Dashboard() {
    const { products } = useSelector((state) => state.products);

    const stats = useMemo(() => {
        const safe = products || [];
        const totalProducts = safe.length;
        const totalCategories = new Set(safe.map((p) => p.category?.name).filter(Boolean)).size;
        const totalValue = safe.reduce((sum, p) => sum + Number(p.price || 0), 0);
        const averagePrice = totalProducts > 0 ? totalValue / totalProducts : 0;
        const mostExpensiveProduct = safe.reduce(
            (max, p) => (Number(p.price || 0) > Number(max?.price || 0) ? p : max), null
        );
        const recentProducts = [...safe].slice(-5).reverse();
        return { totalProducts, totalCategories, totalValue, averagePrice, mostExpensiveProduct, recentProducts };
    }, [products]);

    const statCards = [
        { label: "Total products", value: stats.totalProducts, sub: "Products in store", icon: <FaBox />, color: "bg-blue-100 text-blue-600" },
        { label: "Categories", value: stats.totalCategories, sub: "Active categories", icon: <FaLayerGroup />, color: "bg-purple-100 text-purple-600" },
        { label: "Average price", value: `$${stats.averagePrice.toFixed(2)}`, sub: "Per product", icon: <FaDollarSign />, color: "bg-amber-100 text-amber-600" },
        { label: "Total value", value: `$${stats.totalValue.toFixed(2)}`, sub: "Catalog value", icon: <FaChartLine />, color: "bg-green-100 text-green-600" },
    ];

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Top bar */}
            <div className="bg-white border-b border-gray-200 px-6 py-5">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-medium text-gray-900 mt-1">Dashboard</h1>
                        <p className="text-sm text-gray-400 mt-1">Manage your catalog and monitor store performance.</p>
                    </div>
                    <Link
                        to="/admin/products/create"
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors"
                    >
                        <FaPlus size={12} /> Add product
                    </Link>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-6">

                {/* Stat cards */}
                <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 mb-5">
                    {statCards.map((card, i) => (
                        <div key={i} className="bg-white rounded-xl p-5 border border-gray-100">
                            <div className="flex items-start justify-between">
                                <p className="text-[11px] tracking-widest text-gray-400 uppercase">{card.label}</p>
                                <div className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm ${card.color}`}>
                                    {card.icon}
                                </div>
                            </div>
                            <p className="text-3xl font-medium text-gray-900 mt-3 leading-none">{card.value}</p>
                            <p className="text-xs text-gray-400 mt-2">{card.sub}</p>
                        </div>
                    ))}
                </div>

                {/* Bottom panels */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

                    {/* Top product */}
                    <div className="bg-white border border-gray-100 rounded-xl p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium text-gray-900">Top product</h3>
                            <FaTrophy className="text-gray-300" size={14} />
                        </div>
                        {stats.mostExpensiveProduct ? (
                            <>
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-green-50 text-green-700 mb-3">
                                    <FaStar size={9} /> Highest price
                                </span>
                                <p className="text-sm font-medium text-gray-900">{stats.mostExpensiveProduct.title}</p>
                                <p className="text-xs text-gray-400 mt-1">{stats.mostExpensiveProduct.category?.name || "Uncategorized"}</p>
                                <p className="text-3xl font-medium text-gray-900 mt-4">
                                    ${Number(stats.mostExpensiveProduct.price || 0).toFixed(2)}
                                </p>
                            </>
                        ) : (
                            <p className="text-sm text-gray-400">No products yet.</p>
                        )}
                    </div>

                    {/* Recent products */}
                    <div className="bg-white border border-gray-100 rounded-xl p-5 lg:col-span-2">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium text-gray-900">Recent products</h3>
                            <Link to="/admin/products/create" className="text-xs text-blue-600 flex items-center gap-1 hover:gap-1.5 transition-all">
                                Add new <FaArrowRight size={10} />
                            </Link>
                        </div>
                        {stats.recentProducts.length > 0 ? (
                            <div className="divide-y divide-gray-50">
                                {stats.recentProducts.map((product, i) => (
                                    <div key={product.id} className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium flex-shrink-0 ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}>
                                            {getInitials(product.title)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">{product.title}</p>
                                            <p className="text-xs text-gray-400 mt-0.5">{product.category?.name || "Uncategorized"}</p>
                                        </div>
                                        <p className="text-sm font-medium text-gray-900 flex-shrink-0">
                                            ${Number(product.price || 0).toFixed(2)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-400">No recent products found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
