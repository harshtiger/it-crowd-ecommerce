import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import {
  addProductCart,  
  removeProductCart,

} from "../../redux/actions/cart";
import { ProductCart } from "../../redux/interface";
import { State } from "../../redux/reducers";
import CartProduct from "./cartProduct/CartProduct";
import { CartContainer } from "./CartStyles";
import { CheckStock } from "./CheckStock";

const Cart = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productsCart = useSelector((state: State) => state.cart.cart);
  const allProducts = useSelector((state: State) => state.products.products);
  const user = useSelector((state: State) => state.user);


  async function updateQuantityHandler(
    product: ProductCart,
    quantity: number,
    
  ): Promise<void> {
    if (quantity <= Number(product.stock) && quantity > 0) {
      product.quantity = quantity;
      dispatch(addProductCart(product));
    
    }
  }

  function removeProductHandler(product: ProductCart): void {
    dispatch(removeProductCart(product))
    
  }

  function confirmHandler(e: React.MouseEvent<HTMLElement>): void {
    let currentStock = CheckStock(productsCart , allProducts) ;
    currentStock.length ? 
      swal({
        title: "These products are out of stock",
        text: `${currentStock.map( prodName => prodName + ', ')}` ,
        icon: "error",
        buttons: {

          confirm: {
            text: "OK",
            value: true,
            visible: true,
            closeModal: true,
          },
        },
      }) :
    !user
      ? swal({
          title: "You have to be logged first.",
          icon: "error",
          buttons: {
            cancel: {
              text: "Cancel",
              value: null,
              visible: true,
              closeModal: true,
            },
            confirm: {
              text: "Login",
              value: true,
              visible: true,
              closeModal: true,
            },
          },
        }).then((value) => {
          if (value) {
            navigate("/login")
          }
        })
      : navigate("/shippingAddress");
  }

  return (
    <CartContainer className="container-fluid">
      <h3 className="text-center pt-3">Cart</h3>
      {productsCart.length === 0 ? (
        <div className="text-center">
          <h4 className="mb-4 mt-5">No products in the cart.</h4>
          <Link to="/products">
            <button className="btn btn-primary">See products</button>
          </Link>
        </div>
      ) : (
        <div>
          <div className="mt-5">
            {productsCart.map((product: any) => (
              <CartProduct
                productId={product.productId}
                name={product.productName}
                image={product.image}
                quantity={product.quantity}
                price={product.price}
                updateQuantityHandler={updateQuantityHandler}
                removeProductHandler={removeProductHandler}
                product={product}
              />
            ))}
          </div>
          <div className="d-flex flex-column flex-md-row justify-content-between mt-4 align-items-center mb-5">
            <div className="d-flex flex-column">
              <h4 className="text-center">
                total: $
                {productsCart.reduce(
                  (a: number, product: ProductCart) =>
                    a + product.price * product.quantity,
                  0
                )}
              </h4>
              <h4 className="text-center mb-4 mb-md-0">
                (
                {productsCart.reduce(
                  (a: number, product: ProductCart) => a + product.quantity,
                  0
                )}{" "}
                products)
              </h4>
            </div>
            <div>
              <button className="btn btn-primary" onClick={confirmHandler}>
                Confirm order
              </button> 
            </div>
          </div>
        </div>
      )}
    </CartContainer>
  );
};

export default Cart;
