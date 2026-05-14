import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register, clearErrors } from '../../store/slices/authSlice';

export default function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, errors, token } = useSelector((state) => state.auth);

    const [user, setUser] = useState({
        name:                  '',
        email:                 '',
        password:              '',
        password_confirmation: '',
    });

    useEffect(() => {
        if (token) navigate('/admin');
    }, [token]);

    useEffect(() => {
        return () => dispatch(clearErrors());
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(register({
            name:                  user.name,
            email:                 user.email,
            password:              user.password,
            password_confirmation: user.password_confirmation,
        }));
        if (!result.error) navigate('/admin');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">

                <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
                    Admin Register
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Full Name */}
                    <div>
                        <label className="block text-gray-600 mb-1">Full Name</label>
                        <input
                            onChange={(e) => setUser({ ...user, name: e.target.value })}
                            value={user.name}
                            type="text"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        {errors?.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name[0]}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-gray-600 mb-1">Email</label>
                        <input
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            value={user.email}
                            type="email"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
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
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        {errors?.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password[0]}</p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-gray-600 mb-1">Confirm Password</label>
                        <input
                            onChange={(e) => setUser({ ...user, password_confirmation: e.target.value })}
                            value={user.password_confirmation}
                            type="password"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 cursor-pointer disabled:opacity-50"
                    >
                        {loading ? 'Creating...' : 'Create Account'}
                    </button>

                </form>

                <p className="text-center text-gray-500 text-sm mt-6">
                    Admin access only
                </p>

            </div>
        </div>
    );
}
