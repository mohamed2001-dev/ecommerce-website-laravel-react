import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/slices/cartSlice";
import { imageUrl } from "../../helpers/imageUrl";
import { Link } from "react-router-dom";

function Men() {
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.products);
    const { categories } = useSelector((state) => state.categories);

    // Find men's category
    const menCategory = categories.find(
        (cat) => cat.name?.toLowerCase() === "men's perfume" ||
                 cat.name?.toLowerCase() === "men's" ||
                 cat.name?.toLowerCase() === "men perfumes"
    );

    // Filter products for men's category
    const menProducts = products.filter(
        (product) => product.category_id === menCategory?.id
    );

    return (
        <div className="bg-white min-h-screen pt-28 pb-20">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header Section */}
                <div className="text-center mb-12">
                    <span className="text-xs tracking-[0.2em] text-gray-400 uppercase">For Him</span>
                    <h1 className="text-4xl md:text-5xl font-light text-black mt-2 mb-4">
                        Men's <span className="font-bold">Collection</span>
                    </h1>
                    <div className="w-12 h-px bg-black mx-auto"></div>
                    <p className="text-gray-500 max-w-2xl mx-auto mt-6 text-sm leading-relaxed">
                        Discover our exclusive range of masculine fragrances crafted for the modern gentleman.
                    </p>
                </div>

                {/* Products Count */}
                <div className="mb-8 pb-4 border-b border-gray-100">
                    <p className="text-sm text-gray-500">
                        Showing <span className="text-black font-medium">{menProducts.length}</span> products
                    </p>
                </div>

                {/* Products Grid */}
                {menProducts.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">🕒</div>
                        <h3 className="text-xl font-light text-black mb-2">No Products Found</h3>
                        <p className="text-gray-500 text-sm">Check back later for new arrivals</p>
                        <Link
                            to="/"
                            className="inline-block mt-6 px-8 py-3 bg-black text-white text-sm tracking-wide hover:bg-white hover:text-black border-2 border-black transition-all duration-300"
                        >
                            BACK TO HOME
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {menProducts.map((product) => (
                            <div
                                key={product.id}
                                className="group relative bg-white border border-gray-100 hover:border-black transition-all duration-500 hover:shadow-2xl"
                            >
                                {/* Image Container */}
                                <div className="relative overflow-hidden bg-gray-50">
                                    <img
                                        src={imageUrl(product.image)}
                                        alt={product.title}
                                        className="w-full h-[400px] object-cover transition-all duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"></div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    {/* Category Label */}
                                    <p className="text-[10px] tracking-[0.2em] text-gray-400 uppercase mb-2">
                                        Eau de Parfum
                                    </p>

                                    {/* Title */}
                                    <h3 className="text-xl font-semibold text-black mb-2 tracking-tight line-clamp-1">
                                        {product.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                                        {product.description}
                                    </p>

                                    {/* Price and Action */}
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                        <div>
                                            <span className="text-2xl font-bold text-black">
                                                ${product.price}
                                            </span>
                                            <span className="text-xs text-gray-400 ml-1">USD</span>
                                        </div>

                                        <button
                                            onClick={() => dispatch(addToCart(product))}
                                            className="px-6 py-2.5 bg-black text-white text-sm tracking-wide transition-all duration-300 hover:bg-white hover:text-black border border-black"
                                        >
                                            ADD TO CART
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Back to Home Link */}
                <div className="text-center mt-12 pt-8 border-t border-gray-100">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-black transition-colors group"
                    >
                        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        BACK TO HOME
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Men;
