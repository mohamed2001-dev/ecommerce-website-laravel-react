import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/slices/authSlice';

export default function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const handleLogout = async () => {
        await dispatch(logout());
        navigate('/admin/login');
    };

    return (
        <div className="h-16 bg-white shadow px-6 flex items-center justify-between">

            {/* Left - Page Title */}
            <h1 className="text-xl font-semibold text-gray-700">
                Admin Panel
            </h1>

            {/* Right - User info + Logout */}
            <div className="flex items-center gap-4">
                <span className="text-gray-600">
                    Welcome, <strong>{user?.name}</strong>
                </span>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-1.5 rounded-lg hover:bg-red-600 transition cursor-pointer"
                >
                    Logout
                </button>
            </div>

        </div>
    );
}
