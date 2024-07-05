import React, { useContext } from 'react';
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import Products from './products/Products';
import Login from './auth/Login';
import Register from './auth/Register';
import Cart from './cart/Cart';
import NotFound from './notfound/NotFound'
import Categories from './categories/Categories';
import CreateProduct from './createProduct/CreateProduct';
import DetailProduct from './products/DetailProduct';

import { GlobalState } from '../../GlobalState';

function Pages() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;

  return (
    //Navigation ans rendering logic
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/detail/:id" element={<DetailProduct />} />

      <Route path="/login" element={isLogged ? <NotFound /> : <Login />} />
      <Route path="/register" element={isLogged ? <NotFound /> : <Register />} />

  
      <Route path="/category" element={isAdmin ? <Categories /> : <NotFound />} />
      <Route path="/create_product" element={isAdmin ? <CreateProduct /> : <NotFound />} />
      <Route path="/edit_product/:id" element={isAdmin ? <CreateProduct /> : <NotFound />} />
     

      <Route path="/cart" element={<Cart />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Pages;
