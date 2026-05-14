import { Outlet } from 'react-router-dom';
import Navbar  from '../components/Navbar';


export default function AdminLayout() {
    return (
        <div className="flex">

            {/* Sidebar - left side */}

            {/* Right side - Navbar + page content */}
            <div className="flex-1 flex flex-col min-h-screen">

                {/* Navbar - top */}
                <Navbar />

                {/* Page content */}
                <main className="p-6 bg-gray-100 flex-1">
                    <Outlet />
                </main>

            </div>
        </div>
    );
}
