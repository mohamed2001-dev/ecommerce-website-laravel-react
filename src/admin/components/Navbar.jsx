import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { logout } from '../../store/slices/authSlice';
import { FaBox, FaTags, FaHome, FaSignOutAlt, FaUser, FaTachometerAlt, FaChevronDown , FaClipboardList } from 'react-icons/fa';

export default function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useSelector((state) => state.auth);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleLogout = async () => {
        await dispatch(logout());
        navigate('/admin/login');
    };

    const navItems = [
        { path: '/admin', name: 'Dashboard', icon: FaTachometerAlt },
        { path: '/admin/products', name: 'Products', icon: FaBox },
        { path: '/admin/categories', name: 'Categories', icon: FaTags },
        { path: '/', name: 'View Site', icon: FaHome },
        { path: '/admin/orders',     name: 'Orders',    icon: FaClipboardList },
    ];

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Logo */}
                    <Link to="/admin" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 bg-black flex items-center justify-center transition-transform group-hover:scale-105">
                            <span className="text-white text-xs font-bold tracking-wide">M</span>
                        </div>
                        <div>
                            <span className="text-lg font-light text-black tracking-wide">
                                Admin<span className="font-bold">Panel</span>
                            </span>
                            <p className="text-[8px] tracking-[0.2em] text-gray-400 uppercase">Management</p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center gap-2 px-4 py-2 text-sm tracking-wide transition-all duration-300 ${
                                        isActive
                                            ? 'bg-black text-white'
                                            : 'text-gray-600 hover:bg-gray-100 hover:text-black'
                                    }`}
                                >
                                    <Icon size={14} />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </div>

                    {/* User Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-3 focus:outline-none group"
                        >
                            <div className="text-right hidden sm:block">
                                <p className="text-xs text-gray-400">Administrator</p>
                                <p className="text-sm font-medium text-black">{user?.name}</p>
                            </div>
                            <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                                <FaUser size={16} className="text-gray-500" />
                            </div>
                            <FaChevronDown
                                size={12}
                                className={`text-gray-400 transition-transform duration-300 hidden sm:block ${
                                    isDropdownOpen ? 'rotate-180' : ''
                                }`}
                            />
                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <>
                                <div
                                    className="fixed inset-0 z-40"
                                    onClick={() => setIsDropdownOpen(false)}
                                />
                                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg z-50 animate-slideDown">
                                    <div className="py-2">
                                        <div className="px-4 py-3 border-b border-gray-100 sm:hidden">
                                            <p className="text-sm font-medium text-black">{user?.name}</p>
                                            <p className="text-xs text-gray-400">Administrator</p>
                                        </div>
                                        {navItems.map((item) => {
                                            const Icon = item.icon;
                                            return (
                                                <Link
                                                    key={item.path}
                                                    to={item.path}
                                                    onClick={() => setIsDropdownOpen(false)}
                                                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-black transition-colors"
                                                >
                                                    <Icon size={14} />
                                                    {item.name}
                                                </Link>
                                            );
                                        })}
                                        <div className="border-t border-gray-100 mt-2 pt-2">
                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors w-full"
                                            >
                                                <FaSignOutAlt size={14} />
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <style jsx>{`
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

                .animate-slideDown {
                    animation: slideDown 0.2s ease-out;
                }
            `}</style>
        </nav>
    );
}
