import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import logoImage from "../../images/logo-2.png"

function Navbar() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const menuRef = useRef(null);

    const { items } = useSelector((state) => state.cart);
    const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close menu on escape key
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === "Escape") setOpen(false);
        };
        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, []);

    // Close menu when clicking outside
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
                            <div className="w-5 h-0.5 bg-black transition-transform duration-300"></div>
                            <div className="w-5 h-0.5 bg-black my-1.5 transition-opacity duration-300"></div>
                            <div className="w-5 h-0.5 bg-black transition-transform duration-300"></div>
                        </div>
                    </button>

                      {/* Logo - NOW LARGER */}
                    <div className="absolute left-1/2 transform -translate-x-1/2">
                        <img
                            src={logoImage}
                            alt="Medamk"
                            className="
                                        h-30 sm:h-30 md:h-30 lg:h-30 xl:h-35
                                        w-auto mt-3
                                        object-contain
                                        cursor-pointer
                                        transition-all duration-300 ease-in-out
                                        hover:scale-105 hover:opacity-90
                                        "
                            onClick={() => navigate("/")}
                        />
                    </div>

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
            </nav>

            {/* Side Menu - Full Height, 320px Width (Quarter width on large screens) */}
            {open && (
                <>
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 bg-black/50 z-40 animate-fadeIn"
                        onClick={() => setOpen(false)}
                    />

                    {/* Menu Panel */}
                    <div
                        ref={menuRef}
                        className="fixed top-0 left-0 h-full w-full sm:w-80 md:w-96 bg-black text-white z-50 shadow-2xl animate-slideIn"
                    >
                        {/* Close Button */}
                        <div className="absolute top-6 right-6">
                            <button
                                onClick={() => setOpen(false)}
                                className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-full transition-all duration-300"
                                aria-label="Close menu"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Menu Content */}
                        <div className="flex flex-col h-full pt-24 pb-12 px-8">
                            {/* Navigation Links */}
                            <div className="flex-1 space-y-1">
                                {menuItems.map((item) => (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        onClick={() => setOpen(false)}
                                        className="group block py-4"
                                    >
                                        <span className="text-2xl font-light tracking-wide group-hover:tracking-wider transition-all duration-300">
                                            {item.label}
                                        </span>
                                        <div className="w-0 group-hover:w-full h-px bg-white/30 mt-1 transition-all duration-300"></div>
                                    </Link>
                                ))}
                            </div>

                            {/* Footer */}
                            <div className="pt-8 mt-auto border-t border-white/10">
                                <p className="text-[10px] tracking-[0.2em] text-white/30 text-center">
                                    © 2026 Permedo
                                </p>
                            </div>
                        </div>
                    </div>
                </>
            )}

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes slideIn {
                    from {
                        transform: translateX(-100%);
                    }
                    to {
                        transform: translateX(0);
                    }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }

                .animate-slideIn {
                    animation: slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }
            `}</style>
        </>
    );
}

export default Navbar;
