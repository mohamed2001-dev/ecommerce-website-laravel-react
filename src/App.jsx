import {Routes, Route } from "react-router-dom"
import Home from "./client/pages/Home"
import Contact from "./client/pages/Contact"
import NotFoundPage from "./client/pages/NotFoundPage"
import ClientLayout from "./client/layouts/ClientLayout"
import Login from "./admin/pages/Login"
import Register from "./admin/pages/Register"
import Dashboard from "./admin/pages/Dashboard"
import ProductCreate from "./admin/pages/products/ProductCreate"
import ProductUpdate from "./admin/pages/products/ProductUpdate"
import ProtectedRoute from "./admin/components/ProtectedRoute"
import AdminLayout from "./admin/layouts/AdminLayout"
import CategoryList from "./admin/pages/categories/CategoriesList"
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './store/slices/authSlice';
import Cart from "./client/pages/Cart"
import Men from "./client/pages/Men"
import Women from "./client/pages/Women"
import Pack from "./client/pages/Pack"
import ProductList from "./admin/pages/products/ProductsList"
import Shop from "./client/pages/Shop"
import Product from "./client/pages/Product"


function App() {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);

    useEffect(() => {
        if (token) {
            dispatch(getUser());
        }
    }, [dispatch, token]);


  return (
    <div>
      <div>
      <Routes>
            {/* Client Routes */}
            <Route element={<ClientLayout />}>
                <Route path="/"        element={<Home />} />
                <Route path="/men"   element={<Men />} />
                <Route path="/women"   element={<Women />} />
                <Route path="/pack"   element={<Pack />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<Product />} />
            </Route>

            {/* Admin Public Routes */}
            <Route path="/admin/login"    element={<Login />} />
            <Route path="/admin/register" element={<Register />} />

            {/* Admin Protected Routes */}
            <Route path="/admin" element={
                <ProtectedRoute>
                    <AdminLayout />
                </ProtectedRoute>
            }>
                <Route index          element={<Dashboard />} />
                <Route path="products"           element={<ProductList />} />
                <Route path="categories"            element={<CategoryList />} />
                {/* <Route path="categories/create"       element={<CategoryCreate />} /> */}
                <Route path="products/create"       element={<ProductCreate />} />
                <Route path="products/edit/:id"     element={<ProductUpdate />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
