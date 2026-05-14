import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, clearErrors } from '../../store/slices/authSlice';

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, errors, token } = useSelector((state) => state.auth);

    const [user, setUser] = useState({
        email:    '',
        password: '',
    });

    useEffect(() => {
        if (token) navigate('/admin');
    }, [token]);

    useEffect(() => {
        return () => dispatch(clearErrors());
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(login({
            email:    user.email,
            password: user.password,
        }));
        if (!result.error) navigate('/admin');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">

                <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
                    Admin Login
                </h2>

                {/* General error */}
                {errors?.message && (
                    <p className="text-red-500 text-sm text-center mb-4">
                        {errors.message}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Email */}
                    <div>
                        <label className="block text-gray-600 mb-1">Email</label>
                        <input
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            value={user.email}
                            type="email"
                            placeholder="admin@email.com"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors?.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-gray-600 mb-1">Password</label>
                        <input
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            value={user.password}
                            type="password"
                            placeholder="********"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors?.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password[0]}</p>
                        )}
                    </div>

                    {/* Remember + Forgot */}
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" />
                            Remember me
                        </label>
                        <a href="#" className="text-blue-600 hover:underline">
                            Forgot password?
                        </a>
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-700 text-white py-2 rounded-lg font-semibold hover:bg-blue-800 transition duration-300 cursor-pointer disabled:opacity-50"
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>

                </form>

                <p className="text-center text-gray-500 text-sm mt-6">
                    Admin access only
                </p>

            </div>
        </div>
    );
}
