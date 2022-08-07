import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetail, deleteProductDetail } from "../../redux/actions/productDetail";
import { State } from "../../redux/reducers/index";
import { useParams, Link, useNavigate } from "react-router-dom";
import Loading from "../loading/Loading";
import { DetailContainer, Box, ImgPriceContainer, Price, DeleteEditButton, ImagesContainer, } from "./DetailStyles";
import swal from "sweetalert";

import { addProductCart } from "../../redux/actions/cart";
import { ProductCart } from "../../redux/interface";
import { useLocalStorage } from "../../helpers/useLocalStorage";
import notActive from "../../icons/notActive.png"
import EditIMG from "../../icons/edit.png"
import { resetPoducts } from "../../redux/actions/products";
import { setInactiveProduct } from "../../redux/actions/admin";

export default function Detail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const product = useSelector((state: State) => state.productDetail);
  const user = useSelector((state: State) => state.user);

  const productsCart = useSelector((state: State) => state.cart.cart);
  const [userInStorage, setuserInStorage] = useLocalStorage("USER_LOGGED", "");
  const productInCart = productsCart.find(
    (product: ProductCart) => product.productId == product.productId
  );

  useEffect(() => {
    dispatch(getProductDetail(id));

    return () => {
      dispatch(deleteProductDetail());
    };
  }, []);

  function addCartHandler(e: React.MouseEvent<HTMLButtonElement>): void {
    const productToAdd = {
      productId: product.id,
      productName: product.name,
      price: product.price,
      image: product.image,
      stock: product.stock,
      quantity: 0,
    };
    const quantity = productInCart ? productInCart.quantity + 1 : 1;
    if (Number(quantity) <= Number(product.stock)) {
      productToAdd.quantity = quantity;
      dispatch(addProductCart(productToAdd));
    }
  }

  function deleteHandler(e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();
    swal({
      title: "Are you sure?",
      text: "This product is now going to be inactive!",
      icon: "warning",
      dangerMode: true,
      buttons: {
        cancel: true,
        confirm: true,
      },
    }).then(value => {
      if (value) {
        const data = { isActive: false }
        dispatch(setInactiveProduct(id, data, userInStorage.token));
        dispatch(resetPoducts());
        navigate("/products");
        swal({
          text: "Product is now inactive",
          icon: "success",
        });
      }
    });
  }

  return (
    <DetailContainer>
      {product.name.length > 0 ? (
        <Box>
          <div>
            <h3>{product.name}</h3>
          </div>
          <div className="card">
            <div className="card-body">
              <ImgPriceContainer>
                <ImagesContainer>
                  <img
                    src={product.image}
                    alt="product-image"
                    className="w-75"
                  ></img>
                </ImagesContainer>
                <Price>
                  <h3>$ {product.price}</h3>
                  <p>Current stock: {product.stock}</p>

                  {product.quantity === product.stock ||
                  (productInCart &&
                    productInCart.quantity === product.stock) ? (
                    <button
                      type="button"
                      className="btn btn-primary btn"
                      disabled
                    >
                      No stock
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-primary btn"
                      onClick={e => addCartHandler(e)}
                    >
                      Add to cart
                    </button>
                  )}

                  {userInStorage && userInStorage.role === "admin" ? (
                    <DeleteEditButton>
                      <button
                        onClick={deleteHandler}
                        type="button"
                        className="btn btn-danger btn-sm"
                      >
                        <img src={notActive} alt="notActive"></img>
                      </button>
                      <Link to={`/editProduct/${product.id}`}>
                        <button
                          type="button"
                          className="btn btn-warning btn-sm"
                        >
                          <img src={EditIMG} alt="edit"></img>
                        </button>
                      </Link>
                    </DeleteEditButton>
                  ) : (
                    <div></div>
                  )}
                </Price>
              </ImgPriceContainer>
            </div>
          </div>
          <div></div>
        </Box>
      ) : (
        <Loading></Loading>
      )}
      <Box className="mt-4">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a className="nav-link active" data-bs-toggle="tab" href="#home">
              Description
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-bs-toggle="tab" href="#profile">
              Reviews
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link " data-bs-toggle="tab" href="#questions">
              Questions
            </a>
          </li>
        </ul>
        <div id="myTabContent" className="tab-content">
          <div className="tab-pane fade active show m-2" id="home">
            <p>{product.description}</p>
          </div>
          <div className="tab-pane fade m-2" id="profile">
            Reviews
          </div>
          <div className="tab-pane fade m-2" id="questions">
            Questions
          </div>
        </div>
      </Box>
    </DetailContainer>
  );
}
