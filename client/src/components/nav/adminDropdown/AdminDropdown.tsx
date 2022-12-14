import React from "react";
import { DropdownMenu } from "./AdminDropdownStyle";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogoutUser } from "../../../redux/actions/user";
import { State } from "../../../redux/reducers";
import { clearCart } from "../../../redux/actions/cart";
import swal from "sweetalert";
import { setPage } from "../../../redux/actions/setPage";

const AdminDropdown = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState = useSelector((state: State) => state.user);

  const logout = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    dispatch(LogoutUser());
    localStorage.removeItem('cart')
    dispatch(clearCart())
    dispatch(setPage(1))
    navigate("/products");
    swal({
      title: "Logged out.",
    });
  };

  const getOrders = (event: React.MouseEvent<HTMLSpanElement>) => {
  console.log('under construction');
  
  };

  return (
    <ul className="nav-item dropdown navbar-nav">
      <a
        className="nav-link dropdown-toggle"
        data-bs-toggle="dropdown"
        role="button"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {userState && userState.name}
      </a>
      <DropdownMenu className="dropdown-menu">
      <Link className="dropdown-item" to="/createbrand">
          Create brand
        </Link>
        <Link className="dropdown-item" to="/deletebrand">
          Delete brand
        </Link>
        <Link className="dropdown-item" to="/createProduct">
          Create product
        </Link>
        <Link className="dropdown-item" to="/createCategory">
          Create category
        </Link>
        <Link className="dropdown-item" to="/deleteCategory">
          Delete category
        </Link>
        <Link onClick={getOrders} to={""} className="dropdown-item">
          Admin orders
        </Link>
        <Link to={"/productsAdminMode"} className="dropdown-item">
          Admin products
        </Link>
        <Link to={"/usersAdminMode"} className="dropdown-item">
          Admin users
        </Link>
        <div className="dropdown-divider"></div>
        <a onClick={logout} className="dropdown-item" href="#">
          Log out
        </a>
      </DropdownMenu>
    </ul>
  );
};

export default AdminDropdown;


