import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import logoImage from "../../images/logo-2.png";
import { imageUrl } from "../../helpers/imageUrl";

function Navbar() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
    const [desktopSearchOpen, setDesktopSearchOpen] = useState(false);
    const menuRef = useRef(null);

    const { items } = useSelector((state) => state.cart);
    const { products } = useSelector((state) => state.products);
    const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

    const [productName, setProductName] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === "Escape") {
                setOpen(false);
                setMobileSearchOpen(false);
                setDesktopSearchOpen(false);
            }
        };
        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open]);

    const menuItems = [
        { path: "/", label: "HOME" },
        { path: "/men", label: "MEN" },
        { path: "/women", label: "WOMEN" },
        { path: "/pack", label: "PACK" },
        { path: "/contact", label: "CONTACT" },
    ];

    const handleChange = (e) => {
        const searchTerm = e.target.value;
        setProductName(searchTerm);

        if (searchTerm.trim() === '') {
            setSearchResults([]);
            return;
        }

        if (products && products.length > 0) {
            const filtered = products.filter((product) => {
                return product.title?.toLowerCase().includes(searchTerm.toLowerCase());
            });
            setSearchResults(filtered);
        }
    };

    const handleSelectProduct = () => {
        setProductName('');
        setSearchResults([]);
        setMobileSearchOpen(false);
        setDesktopSearchOpen(false);
    };

    return (
        <>
            <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
                scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white"
            }`}>
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                    {/* Menu Button */}
                    <button
                        onClick={() => setOpen(true)}
                        className="group relative w-10 h-10 flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-black/5 rounded-full"
                        aria-label="Menu"
                    >
                        <div className="relative">
                            <div className="w-5 h-0.5 bg-black"></div>
                            <div className="w-5 h-0.5 bg-black my-1.5"></div>
                            <div className="w-5 h-0.5 bg-black"></div>
                        </div>
                    </button>

                    {/* Logo */}
                    <div className="absolute left-1/2 transform -translate-x-1/2">
                        <img
                            src={logoImage}
                            alt="Medamk"
                            className="h-35 sm:h-30 md:h-30 w-auto cursor-pointer transition-all duration-300 hover:opacity-80"
                            onClick={() => navigate("/")}
                        />
                    </div>

                    {/* Right Section - Search & Cart */}
                    <div className="flex items-center gap-4">

                        {/* DESKTOP SEARCH ICON */}
                        <div className="relative hidden md:block">
                            <button
                                onClick={() => setDesktopSearchOpen(!desktopSearchOpen)}
                                className="w-10 h-10 flex items-center justify-center hover:bg-black/5 rounded-full transition-all duration-300"
                            >
                                {desktopSearchOpen ? (
                                    <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                )}
                            </button>
                        </div>

                        {/* MOBILE SEARCH ICON */}
                        <button
                            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                            className="md:hidden w-10 h-10 flex items-center justify-center hover:bg-black/5 rounded-full transition-all duration-300"
                        >
                            {mobileSearchOpen ? (
                                <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            )}
                        </button>

                        {/* Cart Icon */}
                        <Link to="/cart" className="relative group">
                            <div className="w-10 h-10 flex items-center justify-center hover:bg-black/5 rounded-full transition-all duration-300">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-5 h-5 text-black group-hover:scale-105 transition-transform"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                    />
                                </svg>
                            </div>
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </nav>

            {/* DESKTOP SEARCH BAR - Full Width */}
            {desktopSearchOpen && (
                <div className="fixed top-[72px] left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-40 p-4 animate-slideDown hidden md:block">
                    <div className="max-w-7xl mx-auto">
                        <div className="relative">
                            <input
                                value={productName}
                                onChange={handleChange}
                                type="text"
                                placeholder="Search products..."
                                className="w-full px-4 py-3 pl-10 pr-12 border border-gray-200 focus:border-black outline-none text-sm"
                                autoFocus
                            />
                            <svg
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <button
                                onClick={() => {
                                    setDesktopSearchOpen(false);
                                    setProductName('');
                                    setSearchResults([]);
                                }}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Desktop Search Results - Grid */}
                        {searchResults.length > 0 && (
                            <div className="mt-4 max-h-96 overflow-y-auto">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {searchResults.map((product) => (
                                        <Link
                                            key={product.id}
                                            to={`/product/${product.id}`}
                                            onClick={handleSelectProduct}
                                            className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors border border-gray-100"
                                        >
                                            <img src={imageUrl(product.image)} alt={product.title} className="w-12 h-12 object-cover" />
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-black line-clamp-1">{product.title}</p>
                                                <p className="text-xs text-gray-400">${product.price}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {productName && searchResults.length === 0 && (
                            <div className="mt-6 text-center py-8">
                                <p className="text-gray-400 text-sm">No products found for "{productName}"</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* MOBILE SEARCH BAR - Full Width */}
            {mobileSearchOpen && (
                <div className="fixed top-[72px] left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-40 p-4 animate-slideDown md:hidden">
                    <div className="relative">
                        <input
                            value={productName}
                            onChange={handleChange}
                            type="text"
                            placeholder="Search products..."
                            className="w-full px-4 py-3 pl-10 pr-12 border border-gray-200 focus:border-black outline-none text-sm"
                            autoFocus
                        />
                        <svg
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <button
                            onClick={() => {
                                setMobileSearchOpen(false);
                                setProductName('');
                                setSearchResults([]);
                            }}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Mobile Search Results */}
                    {searchResults.length > 0 && (
                        <div className="mt-4 max-h-80 overflow-y-auto">
                            {searchResults.map((product) => (
                                <Link
                                    key={product.id}
                                    to={`/product/${product.id}`}
                                    onClick={handleSelectProduct}
                                    className="flex items-center gap-3 px-2 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                                >
                                    <img src={imageUrl(product.image)} alt={product.title} className="w-10 h-10 object-cover" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-black">{product.title}</p>
                                        <p className="text-xs text-gray-400">${product.price}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}

                    {productName && searchResults.length === 0 && (
                        <div className="mt-6 text-center py-4">
                            <p className="text-gray-400 text-sm">No products found for "{productName}"</p>
                        </div>
                    )}
                </div>
            )}

            {/* Side Menu */}
            {open && (
                <>
                    <div className="fixed inset-0 bg-black/50 z-40 animate-fadeIn" onClick={() => setOpen(false)} />
                    <div ref={menuRef} className="fixed top-0 left-0 h-full w-full sm:w-80 md:w-96 bg-black text-white z-50 shadow-2xl animate-slideIn">
                        <div className="absolute top-6 right-6">
                            <button onClick={() => setOpen(false)} className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-full transition-all duration-300">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex flex-col h-full pt-24 pb-12 px-8">
                            <div className="mb-12 pb-8 border-b border-white/10">
                                <img src={logoImage} alt="Permedo" className="h-12 w-auto opacity-90" />
                                <p className="text-xs text-white/40 mt-3 tracking-wide">LUXURY FRAGRANCES</p>
                            </div>
                            <div className="flex-1 space-y-1">
                                {menuItems.map((item) => (
                                    <Link key={item.path} to={item.path} onClick={() => setOpen(false)} className="group block py-4">
                                        <span className="text-2xl font-light tracking-wide group-hover:tracking-wider transition-all duration-300">{item.label}</span>
                                        <div className="w-0 group-hover:w-full h-px bg-white/30 mt-1 transition-all duration-300"></div>
                                    </Link>
                                ))}
                            </div>
                            <div className="pt-8 mt-auto border-t border-white/10">
                                <p className="text-[10px] tracking-[0.2em] text-white/30 text-center">© 2026 Permedo</p>
                            </div>
                        </div>
                    </div>
                </>
            )}

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideIn {
                    from { transform: translateX(-100%); }
                    to { transform: translateX(0); }
                }
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
                .animate-slideIn { animation: slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
                .animate-slideDown { animation: slideDown 0.2s ease-out; }
            `}</style>
        </>
    );
}

export default Navbar;
