import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

const formatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

const CartItem = ({ item, removeCartItem }) => {
  const updateQuantity = (opt) => {
    if (opt === "+") {
    }
    if (opt === "-") {
    }
  };

  return (
    <div className="cart__item">
      <div className="cart__item__image">
        <img src={item?.product?.images[0]} alt="" />
      </div>
      <div className="cart__item__info">
        <div className="cart__item__info__name">
          <Link to={`/products/${item?.product?.id}`}>
            <p>{item?.product?.name}</p>
            <p>Size: {item?.size}</p>
            <p>Giá: {formatter.format(item?.product?.price)}</p>
          </Link>
        </div>
        <div className="cart__item__info__price">{item?.price}</div>
        <div className="cart__item__info__quantity">
          <div className="product__info__item__quantity">
            <div
              className="product__info__item__quantity__btn"
              onClick={() => updateQuantity("-")}
            >
              <i className="bx bx-minus"></i>
            </div>
            <div className="product__info__item__quantity__input">
              {item?.quantity}
            </div>
            <div
              className="product__info__item__quantity__btn"
              onClick={() => updateQuantity("+")}
            >
              <i className="bx bx-plus"></i>
            </div>
          </div>
        </div>
        <div className="cart__item__del">
          <i className="bx bx-trash" onClick={() => removeCartItem(item.id)}></i>
        </div>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.object,
};

export default CartItem;
