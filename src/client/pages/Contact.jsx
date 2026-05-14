import { useState } from "react";
import {  FaPhoneAlt, FaEnvelope, FaClock, FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";

function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log("Form submitted:", formData);
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 3000);
        setFormData({ name: "", email: "", subject: "", message: "" });
    };

    return (
        <div className="bg-white min-h-screen pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-light text-black mt-2 mb-4">
                        Contact <span className="font-bold">Us</span>
                    </h1>
                    <div className="w-12 h-px bg-black mx-auto"></div>
                    <p className="text-gray-500 max-w-2xl mx-auto mt-6 text-sm leading-relaxed">
                        Have a question or need assistance? We're here to help.
                        Reach out to us and our team will get back to you shortly.
                    </p>
                </div>

                {/* Contact Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">

                    {/* Contact Info Cards */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Address Card */}
                        {/* Phone Card */}
                        <div className="bg-white border border-gray-200 p-6 hover:border-black transition-all duration-300 group">
                            <div className="w-12 h-12 bg-black text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <FaPhoneAlt size={18} />
                            </div>
                            <h3 className="text-lg font-semibold text-black mb-2">Call Us</h3>
                            <p className="text-gray-500 text-sm">+212 600 000 000</p>
                            <p className="text-gray-400 text-xs mt-1">Mon-Fri, 9am - 6pm</p>
                        </div>

                        {/* Email Card */}
                        <div className="bg-white border border-gray-200 p-6 hover:border-black transition-all duration-300 group">
                            <div className="w-12 h-12 bg-black text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <FaEnvelope size={18} />
                            </div>
                            <h3 className="text-lg font-semibold text-black mb-2">Email Us</h3>
                            <p className="text-gray-500 text-sm">contact@medamk.com</p>
                            <p className="text-gray-400 text-xs mt-1">24/7 Response</p>
                        </div>

                        {/* Hours Card */}
                        <div className="bg-white border border-gray-200 p-6 hover:border-black transition-all duration-300 group">
                            <div className="w-12 h-12 bg-black text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <FaClock size={18} />
                            </div>
                            <h3 className="text-lg font-semibold text-black mb-2">Opening Hours</h3>
                            <p className="text-gray-500 text-sm">Monday - Friday: 9am - 6pm</p>
                            <p className="text-gray-500 text-sm">Saturday: 10am - 4pm</p>
                            <p className="text-gray-400 text-xs mt-1">Sunday: Closed</p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white border border-gray-200 p-8 md:p-10">
                            <h3 className="text-2xl font-light text-black mb-2">Send a Message</h3>
                            <div className="w-12 h-px bg-black mb-6"></div>
                            <p className="text-gray-500 text-sm mb-8">
                                Fill out the form below and we'll get back to you as soon as possible.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs tracking-wide text-gray-500 mb-2">
                                            YOUR NAME *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none transition-colors text-sm"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs tracking-wide text-gray-500 mb-2">
                                            EMAIL ADDRESS *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none transition-colors text-sm"
                                            placeholder="hello@example.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs tracking-wide text-gray-500 mb-2">
                                        SUBJECT *
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none transition-colors text-sm"
                                        placeholder="How can we help you?"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs tracking-wide text-gray-500 mb-2">
                                        MESSAGE *
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={6}
                                        className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none transition-colors text-sm resize-none"
                                        placeholder="Tell us more about your inquiry..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full md:w-auto px-8 py-3 bg-black text-white text-sm tracking-wide hover:bg-white hover:text-black border-2 border-black transition-all duration-300"
                                >
                                    SEND MESSAGE
                                </button>

                                {isSubmitted && (
                                    <div className="mt-4 p-3 bg-green-50 border border-green-200 text-green-600 text-sm text-center">
                                        Thank you! Your message has been sent successfully.
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
                {/* Social Media Section */}
                <div className="text-center mt-16 pt-8 border-t border-gray-100">
                    <p className="text-xs tracking-[0.2em] text-gray-400 mb-6">FOLLOW US</p>
                    <div className="flex gap-4 justify-center">
                        <a href="#" className="w-10 h-10 bg-black text-white flex items-center justify-center hover:bg-white hover:text-black border border-black transition-all duration-300">
                            <FaInstagram size={16} />
                        </a>
                        <a href="#" className="w-10 h-10 bg-black text-white flex items-center justify-center hover:bg-white hover:text-black border border-black transition-all duration-300">
                            <FaFacebookF size={16} />
                        </a>
                        <a href="#" className="w-10 h-10 bg-black text-white flex items-center justify-center hover:bg-white hover:text-black border border-black transition-all duration-300">
                            <FaTwitter size={16} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
