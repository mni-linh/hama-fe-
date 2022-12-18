import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

import { Link, useHistory } from "react-router-dom";

import Helmet from "../components/Helmet";
import CartItem from "../components/CartItem";
import Button from "../components/Button";
import AlertCustom from "../components/alert-custom/Alert";

const formatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

const Cart = () => {
  const DOMAIN = "https://hama-be.vercel.app/";
  //   const DOMAIN = "http://localhost:8080/";

  const [cookies] = useCookies(["token"]);
  const history = useHistory();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("");

  const handleGetCart = async () => {
    setLoading(true);
    await axios
      .get(`${DOMAIN}api/cart`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        setCartItems(res.data);
        setTotalProducts(res.data.length);
        setTotalPrice(
          res.data
            .map((item) => item.product.price * item.quantity)
            .reduce((a, b) => a + b, 0)
        );
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setAlertMessage("Có lỗi xảy ra, vui lòng thử lại sau");
        setAlertVariant("danger");
        setShowAlert(true);
      });
  };

  const handleDeleteCart = async (id) => {
    await axios
      .delete(`${DOMAIN}api/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then(() => {
        setCartItems([...cartItems.filter((item) => item.id !== id)]);
        setTotalProducts(totalProducts - 1);
        setTotalPrice(
          cartItems
            .filter((item) => item.id !== id)
            .map((item) => item.product.price * item.quantity)
            .reduce((a, b) => a + b, 0)
        );
        setAlertMessage("Xóa sản phẩm khỏi giỏ hàng thành công");
        setAlertVariant("success");
        setShowAlert(true);
      })
      .catch((err) => {
        console.log(err);
        setAlertMessage("Có lỗi xảy ra, vui lòng thử lại sau");
        setAlertVariant("danger");
        setShowAlert(true);
      });
  };

  const handleCheckout = () => {
    history.push("/checkout", { cartItems: cartItems, totalPrice: totalPrice });
  };

  useEffect(() => {
    handleGetCart();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Helmet title="Giỏ hàng">
      <div className="cart">
        <div className="cart__info">
          <div className="cart__info__txt">
            <p>You have {totalProducts} products in your shopping cart</p>
            <div className="cart__info__txt__price">
              <span>Into money:</span>{" "}
              <span>{formatter.format(totalPrice)}</span>
            </div>
          </div>
          <div className="cart__info__btn">
            <Button size="block" onClick={handleCheckout}>
              Order
            </Button>
            <Link to="/products">
              <Button size="block">Continue shopping</Button>
            </Link>
          </div>
        </div>
        {loading ? (
          <div className="cart__loading">
            <div className="cart__loading__icon">
              <i className="fas fa-spinner fa-spin"></i>
            </div>
          </div>
        ) : (
          <div className="cart__list">
            {cartItems.map((item, index) => (
              <CartItem
                key={index}
                item={item}
                removeCartItem={handleDeleteCart}
              />
            ))}
          </div>
        )}
      </div>
      <AlertCustom
        show={showAlert}
        setShow={setShowAlert}
        title={alertMessage}
        variant={alertVariant}
      />
    </Helmet>
  );
};

export default Cart;
