import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    FaBoxOpen,
    FaLayerGroup,
    FaDollarSign,
    FaChartLine,
    FaPlus,
    FaArrowRight,
} from "react-icons/fa";

function Dashboard() {
    const { products } = useSelector((state) => state.products);

    const stats = useMemo(() => {
        const safeProducts = products || [];

        const totalProducts = safeProducts.length;

        const totalCategories = new Set(
            safeProducts
                .map((product) => product.category?.name)
                .filter(Boolean)
        ).size;

        const totalValue = safeProducts.reduce((total, product) => {
            return total + Number(product.price || 0);
        }, 0);

        const averagePrice =
            totalProducts > 0 ? totalValue / totalProducts : 0;

        const mostExpensiveProduct = safeProducts.reduce((max, product) => {
            return Number(product.price || 0) > Number(max?.price || 0)
                ? product
                : max;
        }, null);

        const recentProducts = [...safeProducts].slice(-5).reverse();

        return {
            totalProducts,
            totalCategories,
            totalValue,
            averagePrice,
            mostExpensiveProduct,
            recentProducts,
        };
    }, [products]);

    const statCards = [
        {
            title: "Total Products",
            value: stats.totalProducts,
            icon: <FaBoxOpen />,
            description: "Products available in your store",
        },
        {
            title: "Categories",
            value: stats.totalCategories,
            icon: <FaLayerGroup />,
            description: "Product categories created",
        },
        {
            title: "Average Price",
            value: `$${stats.averagePrice.toFixed(2)}`,
            icon: <FaDollarSign />,
            description: "Average product price",
        },
        {
            title: "Products Value",
            value: `$${stats.totalValue.toFixed(2)}`,
            icon: <FaChartLine />,
            description: "Total value of all products",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Top Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <p className="text-xs tracking-[0.25em] text-gray-400 uppercase">
                                Admin Panel
                            </p>

                            <h1 className="text-3xl font-light text-black mt-2">
                                Dashboard
                            </h1>

                            <p className="text-sm text-gray-400 mt-2">
                                Manage your products, monitor your store, and update your catalog.
                            </p>
                        </div>

                        <Link
                            to="/admin/products/create"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-black text-white text-sm tracking-wide border-2 border-black hover:bg-white hover:text-black transition-all duration-300"
                        >
                            <FaPlus size={13} />
                            Add Product
                        </Link>
                    </div>
                </div>
            </div>

            {/* Dashboard Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
                    {statCards.map((card, index) => (
                        <div
                            key={index}
                            className="bg-white border border-gray-200 p-6 hover:shadow-md transition-all duration-300"
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-xs tracking-[0.2em] text-gray-400 uppercase">
                                        {card.title}
                                    </p>

                                    <h2 className="text-3xl font-light text-black mt-3">
                                        {card.value}
                                    </h2>
                                </div>

                                <div className="w-11 h-11 flex items-center justify-center bg-black text-white text-lg">
                                    {card.icon}
                                </div>
                            </div>

                            <p className="text-xs text-gray-400 mt-4">
                                {card.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Small Overview Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

                    {/* Most Expensive Product */}
                    <div className="bg-white border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="text-lg font-light text-black">
                                Top Product
                            </h3>
                            <FaDollarSign className="text-gray-300" />
                        </div>

                        {stats.mostExpensiveProduct ? (
                            <div>
                                <p className="text-sm font-medium text-black">
                                    {stats.mostExpensiveProduct.title}
                                </p>

                                <p className="text-xs text-gray-400 mt-1">
                                    {stats.mostExpensiveProduct.category?.name || "Uncategorized"}
                                </p>

                                <p className="text-2xl font-light text-black mt-4">
                                    ${Number(stats.mostExpensiveProduct.price || 0).toFixed(2)}
                                </p>
                            </div>
                        ) : (
                            <p className="text-sm text-gray-400">
                                No products available yet.
                            </p>
                        )}
                    </div>

                    {/* Recent Products */}
                    <div className="bg-white border border-gray-200 p-6 lg:col-span-2">
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="text-lg font-light text-black">
                                Recent Products
                            </h3>

                            <Link
                                to="/admin/products/create"
                                className="text-xs text-black flex items-center gap-2 hover:gap-3 transition-all"
                            >
                                Add new
                                <FaArrowRight size={11} />
                            </Link>
                        </div>

                        {stats.recentProducts.length > 0 ? (
                            <div className="space-y-3">
                                {stats.recentProducts.map((product) => (
                                    <div
                                        key={product.id}
                                        className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0 last:pb-0"
                                    >
                                        <div>
                                            <p className="text-sm font-medium text-black">
                                                {product.title}
                                            </p>

                                            <p className="text-xs text-gray-400 mt-1">
                                                {product.category?.name || "Uncategorized"}
                                            </p>
                                        </div>

                                        <p className="text-sm font-semibold text-black">
                                            ${Number(product.price || 0).toFixed(2)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-400">
                                No recent products found.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
