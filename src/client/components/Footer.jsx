import { Link } from "react-router-dom";
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedinIn,
} from "react-icons/fa";

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black text-white mt-10">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                    {/* Brand */}
                    <div>
                        <h2 className="text-2xl font-light tracking-[0.2em] mb-4">
                            MED<span className="font-bold">AMK</span>
                        </h2>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Luxury fragrances crafted for those who appreciate elegance and sophistication.
                        </p>
                        <div className="flex gap-4 mt-6">
                            <a href="#" className="text-gray-500 hover:text-white transition-colors">
                                <FaFacebookF size={16} />
                            </a>
                            <a href="#" className="text-gray-500 hover:text-white transition-colors">
                                <FaInstagram size={16} />
                            </a>
                            <a href="#" className="text-gray-500 hover:text-white transition-colors">
                                <FaTwitter size={16} />
                            </a>
                            <a href="#" className="text-gray-500 hover:text-white transition-colors">
                                <FaLinkedinIn size={16} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xs tracking-[0.2em] text-gray-500 mb-6">QUICK LINKS</h3>
                        <ul className="space-y-3">
                            <li><Link to="/" className="text-sm text-gray-400 hover:text-white transition">Home</Link></li>
                            <li><Link to="/shop" className="text-sm text-gray-400 hover:text-white transition">Shop</Link></li>
                            <li><Link to="/about" className="text-sm text-gray-400 hover:text-white transition">About Us</Link></li>
                            <li><Link to="/contact" className="text-sm text-gray-400 hover:text-white transition">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="text-xs tracking-[0.2em] text-gray-500 mb-6">CATEGORIES</h3>
                        <ul className="space-y-3">
                            <li className="text-sm text-gray-400 hover:text-white transition cursor-pointer">Men Perfumes</li>
                            <li className="text-sm text-gray-400 hover:text-white transition cursor-pointer">Women Perfumes</li>
                            <li className="text-sm text-gray-400 hover:text-white transition cursor-pointer">Luxury Collection</li>
                            <li className="text-sm text-gray-400 hover:text-white transition cursor-pointer">New Arrivals</li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-xs tracking-[0.2em] text-gray-500 mb-6">CONTACT</h3>
                        <ul className="space-y-3">
                            <li className="text-sm text-gray-400">Agadir, Morocco</li>
                            <li className="text-sm text-gray-400">+212 600 000 000</li>
                            <li className="text-sm text-gray-400">contact@medamk.com</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="text-center">
                        <p className="text-gray-600 text-xs tracking-wide">
                            © {currentYear} MEDAMK. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
