import {Routes, Route } from "react-router-dom"
import Home from "./client/pages/Home"
import About from "./client/pages/About"
import Contact from "./client/pages/Contact"
import NotFoundPage from "./client/pages/NotFoundPage"
import ClientLayout from "./client/layouts/ClientLayout"
import Login from "./admin/pages/Login"
import Register from "./admin/pages/Register"
import Dashboard from "./admin/pages/Dashboard"


function App() {
  

  return (
    <div>
      <div>
      <Routes>
        {/* client routes */}
        <Route element = {<ClientLayout/>}>
        <Route path="/" element = {<Home/>}></Route>
        <Route path="/about" element = {<About/>}></Route>
        <Route path="/contact" element = {<Contact/>}></Route>
        </Route>
        {/* admin routes */}
        <Route path="/admin/login" element = {<Login/>}></Route>
        <Route path="/admin/register" element = {<Register/>}></Route>
        <Route path="/admin" element = {<Dashboard/>}></Route>
        <Route path="*" element = {<NotFoundPage/>}></Route>
      </Routes>
      </div>
    </div>
  )
}

export default App
