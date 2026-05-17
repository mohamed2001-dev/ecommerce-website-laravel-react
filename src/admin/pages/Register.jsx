import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register, clearErrors } from '../../store/slices/authSlice';

export default function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, errors, token } = useSelector((state) => state.auth);

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        if (token) navigate('/admin');
    }, [token, navigate]);

    useEffect(() => {
        return () => dispatch(clearErrors());
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(register({
            name: user.name,
            email: user.email,
            password: user.password,
            password_confirmation: user.password_confirmation,
        }));
        if (!result.error) navigate('/admin');
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-md">

                <div className="text-center mb-8">
                    <h1 className="text-4xl font-light text-black">Register</h1>
                    <div className="w-12 h-px bg-black mx-auto mt-3"></div>
                    <p className="text-sm text-gray-400 mt-3">Create admin account</p>
                </div>

                <div className="border border-gray-200 p-8">
                    {errors?.message && (
                        <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-500 text-sm text-center">
                            {errors.message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <input
                                onChange={(e) => setUser({ ...user, name: e.target.value })}
                                value={user.name}
                                type="text"
                                placeholder="Full Name"
                                className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none text-sm"
                                required
                            />
                            {errors?.name && <p className="text-red-500 text-xs mt-1">{errors.name[0]}</p>}
                        </div>

                        <div>
                            <input
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                                value={user.email}
                                type="email"
                                placeholder="Email Address"
                                className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none text-sm"
                                required
                            />
                            {errors?.email && <p className="text-red-500 text-xs mt-1">{errors.email[0]}</p>}
                        </div>

                        <div>
                            <input
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                value={user.password}
                                type="password"
                                placeholder="Password"
                                className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none text-sm"
                                required
                            />
                            {errors?.password && <p className="text-red-500 text-xs mt-1">{errors.password[0]}</p>}
                        </div>

                        <div>
                            <input
                                onChange={(e) => setUser({ ...user, password_confirmation: e.target.value })}
                                value={user.password_confirmation}
                                type="password"
                                placeholder="Confirm Password"
                                className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none text-sm"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-black text-white text-sm tracking-wide hover:bg-white hover:text-black border-2 border-black transition-all duration-300 disabled:opacity-50"
                        >
                            {loading ? 'Creating...' : 'Create Account'}
                        </button>
                    </form>

                    <p className="text-center text-xs text-gray-400 mt-6">
                        Already have an account?{' '}
                        <button
                            onClick={() => navigate('/admin/login')}
                            className="text-black hover:underline"
                        >
                            Sign In
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
