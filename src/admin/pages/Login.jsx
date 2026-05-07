import { useState } from "react";



export default function Login() {
  const [user , setUser] = useState({
    email : "" ,
    password : ""
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("data" , user)
  }
  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Admin Login
        </h2>

        {/* Form */}
        <form 
          onSubmit={handleSubmit}
          className="space-y-5">
          
          {/* Email */}
          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              onChange={(e) => {
                setUser({...user , email : e.target.value})
              }}
              value={user.email}
              type="email"
              placeholder="admin@email.com"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              onChange={(e) => {
                setUser({...user , password : e.target.value})
              }}
              value={user.password}
              type="password"
              placeholder="********"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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
            className="w-full bg-blue-700 text-white py-2 rounded-lg font-semibold hover:bg-blue-800 transition duration-300 cursor-pointer"
          >
            Sign In
          </button>

        </form>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Admin access only
        </p>

      </div>

    </div>
  );
}