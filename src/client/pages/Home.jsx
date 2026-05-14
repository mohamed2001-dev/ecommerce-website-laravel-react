import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchProducts } from "../../store/slices/productSlice";
import { fetchCategories } from "../../store/slices/categorySlice";
// couvert image one :
import bannerImageOne from "../../images/desktop-couvert-one.png";
import mobileBannerImageOne from "../../images/mobile-couvert-one.png";
import tabletBannerImageOne from "../../images/tablet-couvert-one.png";
import smallMobileBannerImageOne from "../../images/small-mobile-couvert-one.png";
// couvert image two :
import bannerImageTwo from "../../images/desktop-couvert-two.png";
import mobileBannerImageTwo from "../../images/mobile-couvert-two.png";
import tabletBannerImageTwo from "../../images/tablet-couvert-two.png";
import smallMobileBannerImageTwo from "../../images/small-mobile-couvert-two.png";

import { imageUrl } from "../../helpers/imageUrl";
import { addToCart } from "../../store/slices/cartSlice";
import Features from "../components/Features";

function Home() {
    const dispatch = useDispatch();

    const banners = [bannerImageOne, bannerImageTwo];
    const [currentBanner, setCurrentBanner] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const { products } = useSelector((state) => state.products);
    const { categories } = useSelector((state) => state.categories);

    const productsRef = useRef(null);

    // FETCH DATA
    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchCategories());
    }, [dispatch]);

    // BANNER CAROUSEL
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBanner((prev) =>
                prev === banners.length - 1 ? 0 : prev + 1
            );
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const scrollToProducts = () => {
        productsRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    };

    return (
        <div className="bg-white min-h-screen">

    <div className="relative sm:w-full sm:h-full md:w-full md:h-full w-full h-screen overflow-hidden bg-black">
    {/* Banner Image */}
    <picture>
  <source
    media="(max-width: 480px)"
    srcSet={currentBanner === 0 ? smallMobileBannerImageOne : smallMobileBannerImageTwo}
  />

  <source
    media="(max-width: 768px)"
    srcSet={currentBanner === 0 ? mobileBannerImageOne : mobileBannerImageTwo}
  />

  <source
    media="(max-width: 1024px)"
    srcSet={currentBanner === 0 ? tabletBannerImageOne : tabletBannerImageTwo}
  />

  <img
    src={currentBanner === 0 ? bannerImageOne : bannerImageTwo}
    alt="Luxury Perfume Campaign"
    className="w-full h-full object-cover object-center"
  />
</picture>

    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-black/10"></div>

    {/* Hero Content */}
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-8 sm:pb-12 md:pb-16 lg:pb-24 pointer-events-none">
    <button
        onClick={scrollToProducts}
        className="
            pointer-events-auto
            px-4 sm:px-6 md:px-8 lg:px-10
            py-2 sm:py-3 md:py-4
            text-xs sm:text-sm md:text-base lg:text-lg
            bg-white text-black font-semibold tracking-wider
            border-2 border-white
            hover:bg-transparent hover:text-white
            transition-all duration-300
            w-fit
        "
    >
        EXPLORE COLLECTION
    </button>
</div>

                {/* Carousel Dots */}
                <div className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-1/2 transform -translate-x-1/2
                                flex gap-1.5 sm:gap-2 md:gap-3">
                    {banners.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentBanner(index)}
                            className={`transition-all duration-300 ${
                                currentBanner === index
                                    ? "w-8 h-0.5 bg-white"
                                    : "w-4 h-0.5 bg-white/40 hover:bg-white/60"
                            }`}
                        />
                    ))}
                </div>
            </div>

            {/* ================= CATEGORIES SECTION ================= */}
            <div className="max-w-7xl mx-auto px-6 py-20">
                {/* Section Header */}
                <div ref={productsRef} className="text-center mb-12">
                    <span className="text-xs tracking-[0.2em] text-gray-400 uppercase">Fragrance Families</span>
                    <h2 className="text-3xl md:text-4xl font-light text-black mt-2">
                        Shop by <span className="font-bold">Category</span>
                    </h2>
                    <div className="w-12 h-px bg-black mx-auto mt-4"></div>
                </div>

                {/* Category Buttons */}
                <div className="flex flex-wrap gap-3 justify-center">
                    {/* ALL Button */}
                    <button
                        onClick={() => setSelectedCategory(null)}
                        className={`px-6 py-2.5 text-sm tracking-wide transition-all duration-300 ${
                            selectedCategory === null
                                ? "bg-black text-white"
                                : "bg-transparent text-black border border-black/20 hover:border-black hover:bg-black hover:text-white"
                        }`}
                    >
                        ALL FRAGRANCES
                    </button>

                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`px-6 py-2.5 text-sm tracking-wide transition-all duration-300 ${
                                selectedCategory === category.id
                                    ? "bg-black text-white"
                                    : "bg-transparent text-black border border-black/20 hover:border-black hover:bg-black hover:text-white"
                            }`}
                        >
                            {category.name.toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>

            {/* ================= PRODUCTS SECTION ================= */}
            <div className="max-w-7xl mx-auto px-6 pb-24">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <span className="text-xs tracking-[0.2em] text-gray-400 uppercase">Our Collection</span>
                    <h2 className="text-3xl md:text-4xl font-light text-black mt-2">
                        Featured <span className="font-bold">Fragrances</span>
                    </h2>
                    <div className="w-12 h-px bg-black mx-auto mt-4"></div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products
                        .filter((product) =>
                            selectedCategory
                                ? product.category_id === selectedCategory
                                : true
                        )
                        .map((product) => (
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
                                <div className="relative overflow-hidden bg-gray-50">
                                    <img
                                        src={imageUrl(product.image)}
                                        alt={product.title}
                                        className="w-full h-[400px] object-cover transition-all duration-700 group-hover:scale-105"
                                    />

                                    {/* Quick View Overlay */}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"></div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    {/* Category Label */}
                                    <p className="text-[10px] tracking-[0.2em] text-gray-400 uppercase mb-2">
                                        Extrait de Parfume
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
                                            <span className="text-xs text-gray-400 ml-1">MAD</span>
                                        </div>

                                        <button
                                            onClick={() => dispatch(addToCart(product))}
                                            className="relative group/btn px-6 py-2.5 bg-black text-white text-sm tracking-wide overflow-hidden transition-all duration-300 hover:bg-white hover:text-black border border-black"
                                        >
                                            <span className="relative z-10">ADD TO CART</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>

            {/* Features Component */}
            <Features />
        </div>
    );
}

export default Home;
