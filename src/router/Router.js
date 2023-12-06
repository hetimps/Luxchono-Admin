import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login/index"
import Dashboard from '../pages/Dashboard';
import Product from '../pages/Product';
import Order from '../pages/Order';
import Category from '../pages/Category';
import Offer from '../pages/Offer';
import Customer from '../pages/Customer';
import Setting from '../pages/Settings';
import AddCategory from '../pages/Category/AddCategory';
import EditCategory from '../pages/Category/EditCategory';


export default function Router() {
  return (
    <>
      <BrowserRouter>
        {/* <AuthHandler /> */}
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/product" element={<Product />}></Route>
          <Route path="/order" element={<Order />}></Route>
          <Route path="/category" element={<Category />}></Route>
          <Route path="/addcategory" element={<AddCategory />}></Route>
          <Route path="/editcategory" element={<EditCategory />}></Route>
          <Route path="/offer" element={<Offer />}></Route>
          <Route path="/customer" element={<Customer />}></Route>
          <Route path="/setting" element={<Setting />}></Route>
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter >
    </>
  )
}
