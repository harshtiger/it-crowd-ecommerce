import React, { useEffect } from "react";
import "bootswatch/dist/lux/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Nav from "./components/nav/Nav";
import Detail from "./components/detail/Detail";
import Products from "./components/products/Products";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Loading from "./components/loading/Loading";
import Edit from "./components/detail/edit/EditProduct";
import FormCreate from "./components/form/FormCreate";
import Home from "./components/home/Home";
import AdminModeCards from "./components/products/cards/AdminModeCards";
import { useDispatch, useSelector } from "react-redux";
import { FindUSer } from "./redux/actions/user";
import Cart from "./components/cart/Cart";
import CreateCategories from "./components/products/categories/create/CreateCategories";
import AdminUserMode from "./components/users/AdminPanel/AdminModeUsers";
import UserProfile from "./components/users/profile/UserProfile";
import DeleteCategories from "./components/products/categories/delete/DeleteCategories";
import BrandCreate from "./components/products/brands/BrandCreate"
import OrdersAdmin from "./components/admin/ordersAdmin/OrdersAdmin";
import PreviewOrder from "./components/checkout/previewOrder/PreviewOrder";

import { State } from "./redux/reducers";
import DeleteBrands from "./components/products/brands/delete/DeleteBrands";

function App(): JSX.Element {
  const dispatch = useDispatch();
  const user = useSelector((state: State) => state.user);

  useEffect(() => {
    dispatch(FindUSer());
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/createProduct" element={<FormCreate />} />
          <Route
            path="/editProduct/:id"
            element={
              user && user.role == "admin" ? <Edit /> : <Navigate to="/login" />
            }
          />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/createCategory"
            element={
              user && user.role == "admin" ? (
                <CreateCategories />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

<Route
            path="/createBrand"
            element={
              user && user.role == "admin" ? (
                <BrandCreate />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

<Route
            path="/deletebrand"
            element={
              user && user.role == "admin" ? (
                <DeleteBrands />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/productsAdminMode"
            element={
              user && user.role == "admin" ? (
                <AdminModeCards />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/usersAdminMode"
            element={
              user && user.role == "admin" ? (
                <AdminUserMode />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/profile"
            element={user ? <UserProfile /> : <Navigate to="/products" />}
          />

          <Route
            path="/deleteCategory"
            element={
              user && user.role == "admin" ? (
                <DeleteCategories />
              ) : (
                <Navigate to="/login" />
              )
            }
          />



          <Route
            path="/ordersAdmin"
            element={
              user && user.role == "admin" ? (
                <OrdersAdmin />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/previewOrder"
            element={user ? <PreviewOrder /> : <Navigate to="/login" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
