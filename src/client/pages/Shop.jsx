// pages/Shop.jsx
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ProductsGrid from '../../client/components/ProductsGrid';

export default function Shop() {
    const { products } = useSelector((state) => state.products);
    const { categories } = useSelector((state) => state.categories);

    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('default');

    // Filter products
    const filteredProducts = products.filter(product => {
        if (selectedCategory === 'all') return true;
        return product.category_id === parseInt(selectedCategory);
    });

    // Sort products
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        return 0;
    });

    return (
        <div className="bg-white min-h-screen pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-light text-black">Shop</h1>
                    <div className="w-12 h-px bg-black mx-auto mt-3"></div>
                    <p className="text-gray-500 mt-4 text-sm">
                        Discover our complete collection of luxury fragrances
                    </p>
                </div>

                {/* Filters Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 pb-4 border-b border-gray-100">
                    <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
                        <button
                            onClick={() => setSelectedCategory('all')}
                            className={`px-4 py-1.5 text-xs tracking-wide transition-all duration-300 ${
                                selectedCategory === 'all'
                                    ? 'bg-black text-white'
                                    : 'bg-transparent text-black border border-gray-200 hover:border-black'
                            }`}
                        >
                            ALL
                        </button>
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`px-4 py-1.5 text-xs tracking-wide transition-all duration-300 ${
                                    selectedCategory === cat.id
                                        ? 'bg-black text-white'
                                        : 'bg-transparent text-black border border-gray-200 hover:border-black'
                                }`}
                            >
                                {cat.name.toUpperCase()}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="text-[10px] tracking-[0.2em] text-gray-400">SORT BY</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-3 py-1.5 border border-gray-200 focus:border-black outline-none text-sm bg-white"
                        >
                            <option value="default">Default</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                        </select>
                    </div>
                </div>

                {/* Products Grid */}
                <ProductsGrid
                    products={sortedProducts}
                    columns={3}
                />

                {/* Results Count */}
                <div className="text-center mt-8">
                    <p className="text-xs text-gray-400">
                        Showing {sortedProducts.length} of {filteredProducts.length} products
                    </p>
                </div>
            </div>
        </div>
    );
}
