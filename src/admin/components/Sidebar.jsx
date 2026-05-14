import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Package,
    FolderKanban,
    ShoppingCart
} from 'lucide-react';

export default function Sidebar() {

    const links = [
        {
            to: '/admin',
            label: 'Dashboard',
            icon: <LayoutDashboard size={20} />
        },
        {
            to: '/admin',
            label: 'Products',
            icon: <Package size={20} />
        },
        {
            to: '/admin/categories',
            label: 'Categories',
            icon: <FolderKanban size={20} />
        },
    ];

    return (
        <aside className="w-72 min-h-screen bg-slate-950 text-white fixed left-0 top-0 border-r border-slate-800 shadow-2xl flex flex-col">

            {/* Logo */}
            <div className="h-20 border-b border-slate-800 flex items-center px-6">
                <div className="flex items-center gap-3">

                    <div className="w-11 h-11 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg">
                        <ShoppingCart size={22} />
                    </div>

                    <div>
                        <h1 className="text-lg font-bold tracking-wide">
                            MyShop
                        </h1>

                        <p className="text-xs text-slate-400">
                            Admin Dashboard
                        </p>
                    </div>

                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2">

                <p className="text-slate-500 text-xs uppercase tracking-widest px-3 mb-4">
                    Main Menu
                </p>

                {links.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        end={link.to === '/admin'}
                        className={({ isActive }) =>
                            `
                            group flex items-center gap-4 px-4 py-3 rounded-2xl
                            transition-all duration-300 text-sm font-medium
                            ${
                                isActive
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                                    : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                            }
                            `
                        }
                    >
                        <span className="opacity-90">
                            {link.icon}
                        </span>

                        <span>
                            {link.label}
                        </span>
                    </NavLink>
                ))}
            </nav>

            {/* Footer */}
            <div className="p-5 border-t border-slate-800">

                <div className="bg-slate-900 rounded-2xl p-4">
                    <p className="text-sm font-semibold text-white">
                        MyShop Admin
                    </p>

                    <p className="text-xs text-slate-400 mt-1">
                        Version 1.0.0
                    </p>
                </div>

            </div>

        </aside>
    );
}
