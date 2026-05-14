import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function NotFoundPage() {
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        document.title = "404 - Page Not Found | CarismaPerfumes";

        // Auto redirect after 5 seconds
        const timer = setTimeout(() => {
            window.location.href = "/";
        }, 5000);

        // Countdown timer
        const interval = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
            {/* Animated Content */}
            <div className="text-center animate-fadeIn">
                {/* Large 404 with Animation */}
                <div className="relative mb-8">
                    <div className="text-[120px] sm:text-[180px] md:text-[220px] font-bold text-black leading-none tracking-tighter animate-pulse">
                        404
                    </div>
                    <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-black"></span>
                        </span>
                    </div>
                </div>

                {/* Divider */}
                <div className="w-16 h-px bg-black/20 mx-auto my-6"></div>

                {/* Message */}
                <h1 className="text-2xl sm:text-3xl font-light text-black mb-3 tracking-wide">
                    Oops! Page Not Found
                </h1>

                <p className="text-gray-500 text-sm max-w-md mx-auto mb-8 leading-relaxed">
                    We couldn't find the page you were looking for.
                    You'll be redirected to the homepage in <span className="font-bold text-black">{countdown}</span> seconds.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/"
                        className="px-8 py-3 bg-black text-white text-sm tracking-wide hover:bg-white hover:text-black border-2 border-black transition-all duration-300"
                    >
                        GO HOME NOW
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="px-8 py-3 bg-transparent text-black text-sm tracking-wide border-2 border-black hover:bg-black hover:text-white transition-all duration-300"
                    >
                        GO BACK
                    </button>
                </div>

                {/* Help Section */}
                <div className="mt-12">
                    <p className="text-xs text-gray-400 mb-4">Need help?</p>
                    <Link
                        to="/contact"
                        className="text-xs text-gray-500 hover:text-black transition-colors underline-offset-4 hover:underline"
                    >
                        Contact Support
                    </Link>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.6s ease-out;
                }
            `}</style>
        </div>
    );
}
