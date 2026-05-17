import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, clearErrors } from '../../store/slices/authSlice';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaShieldAlt } from 'react-icons/fa';

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, errors, token } = useSelector((state) => state.auth);

    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        if (token) navigate('/admin');
    }, [token, navigate]);

    useEffect(() => {
        return () => dispatch(clearErrors());
    }, [dispatch]);

    // Load saved email if remember me was checked
    useEffect(() => {
        const savedEmail = localStorage.getItem('adminEmail');
        if (savedEmail) {
            setUser(prev => ({ ...prev, email: savedEmail }));
            setRememberMe(true);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(login({
            email: user.email,
            password: user.password,
        }));

        if (!result.error && rememberMe) {
            localStorage.setItem('adminEmail', user.email);
        } else if (!rememberMe) {
            localStorage.removeItem('adminEmail');
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">

            {/* Decorative Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gray-100 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-100 rounded-full blur-3xl opacity-50"></div>
            </div>

            {/* Login Card */}
            <div className="relative w-full max-w-md">

                {/* Logo / Brand */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-black mb-4">
                        <span className="text-white text-2xl font-bold">M</span>
                    </div>
                    <h1 className="text-3xl font-light text-black">Admin Access</h1>
                    <div className="w-12 h-px bg-black mx-auto mt-3"></div>
                    <p className="text-sm text-gray-400 mt-3">Secure dashboard login</p>
                </div>

                {/* Login Form */}
                <div className="bg-white border border-gray-200 p-8 shadow-sm">

                    {/* General Error */}
                    {errors?.message && (
                        <div className="mb-6 p-3 bg-red-50 border border-red-200">
                            <p className="text-red-500 text-xs text-center">{errors.message}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Email Field */}
                        <div>
                            <label className="block text-[10px] tracking-[0.2em] text-gray-400 uppercase mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300">
                                    <FaEnvelope size={14} />
                                </div>
                                <input
                                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                                    value={user.email}
                                    type="email"
                                    placeholder="admin@medamk.com"
                                    className="w-full pl-11 pr-4 py-3 border border-gray-200 focus:border-black outline-none transition-colors text-sm"
                                    required
                                />
                            </div>
                            {errors?.email && (
                                <p className="text-red-500 text-xs mt-1">{errors.email[0]}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-[10px] tracking-[0.2em] text-gray-400 uppercase mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300">
                                    <FaLock size={14} />
                                </div>
                                <input
                                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                                    value={user.password}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="w-full pl-11 pr-12 py-3 border border-gray-200 focus:border-black outline-none transition-colors text-sm"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                                >
                                    {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                                </button>
                            </div>
                            {errors?.password && (
                                <p className="text-red-500 text-xs mt-1">{errors.password[0]}</p>
                            )}
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-3 h-3 border border-gray-300 focus:border-black checked:bg-black"
                                />
                                <span className="text-[10px] tracking-wide text-gray-400">REMEMBER ME</span>
                            </label>
                            <a
                                href="#"
                                className="text-[10px] tracking-wide text-gray-400 hover:text-black transition-colors"
                            >
                                FORGOT PASSWORD?
                            </a>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-black text-white text-sm tracking-wide hover:bg-white hover:text-black border-2 border-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    SIGNING IN...
                                </>
                            ) : (
                                'SIGN IN'
                            )}
                        </button>

                    </form>

                    {/* Security Notice */}
                    <div className="mt-6 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-center gap-2">
                            <FaShieldAlt size={12} className="text-gray-300" />
                            <p className="text-[9px] tracking-[0.2em] text-gray-400 uppercase">
                                Secure Admin Access Only
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer Note */}
                <p className="text-center text-[10px] text-gray-400 mt-6">
                    This area is restricted to authorized personnel only
                </p>
            </div>
        </div>
    );
}
