import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className="bg-blue-700 text-white shadow-md">
  <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
    
    {/* Logo */}
    <h1 className="text-2xl font-bold tracking-wide cursor-pointer">
      Parfum
    </h1>

    {/* Links */}
    <div className="flex items-center gap-8 text-lg font-medium">
      <Link to="/" className="hover:text-gray-200 transition duration-300">
        Home
      </Link>
      <Link to="/about" className="hover:text-gray-200 transition duration-300">
        About
      </Link>
      <Link to="/contact" className="hover:text-gray-200 transition duration-300">
        Contact
      </Link>
    </div>

  </div>
</div>
  )
}

export default Navbar
