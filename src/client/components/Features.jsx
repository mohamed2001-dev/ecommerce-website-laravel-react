function Features() {
    const features = [
        {
            title: "Premium Quality",
            description:
                "Luxury perfumes crafted with high-quality ingredients and long-lasting fragrances.",
        },
        {
            title: "Fast Delivery",
            description:
                "Quick and secure shipping to deliver your favorite perfumes directly to your door.",
        },
        {
            title: "Secure Payment",
            description:
                "Safe and encrypted payment methods for a trusted shopping experience.",
        },
        {
            title: "Customer Support",
            description:
                "Professional support team available to help you anytime you need assistance.",
        },
    ];

    return (
        <section className="bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Heading */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
                        Why Choose Us
                    </h2>
                    <div className="w-16 h-0.5 bg-black mx-auto mb-6"></div>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        Discover a premium shopping experience with exclusive fragrances,
                        exceptional service, and trusted quality.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group bg-white rounded-2xl p-8 border border-gray-200 hover:border-black transition-all duration-300 hover:shadow-xl"
                        >
                            {/* Professional SVG Icons */}
                            <div className="mb-6">
                                {index === 0 && (
                                    <svg className="w-12 h-12 text-black group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                )}

                                {index === 1 && (
                                    <svg className="w-12 h-12 text-black group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                )}

                                {index === 2 && (
                                    <svg className="w-12 h-12 text-black group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                )}

                                {index === 3 && (
                                    <svg className="w-12 h-12 text-black group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                    </svg>
                                )}
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-bold text-black mb-3">
                                {feature.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Features;
