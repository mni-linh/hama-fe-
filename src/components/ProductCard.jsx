import React from "react";
import PropTypes from "prop-types";

import { useHistory } from "react-router-dom";

import Button from "./Button";

const formatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

const ProductCard = ({ product }) => {
  const history = useHistory();

  const handleClickItem = () => {
    history.push(`/products/${product.id}`);
  };

  return (
    <div className="product-card" onClick={handleClickItem}>
      <div className="product-card__image">
        <img src={product?.images[0]} alt="product" />
        <img src={product?.images[1] || product?.images[0]} alt="product" />
      </div>
      <h3 className="product-card__name">{product?.name}</h3>
      <div className="product-card__price">
        {formatter.format(product?.price)}
        <span className="product-card__price__old">
          <del>{formatter.format(product?.price * 1.2)}</del>
        </span>
      </div>
      <div className="product-card__btn">
        <Button size="sm" icon="bx bx-cart" animate={true}>
          Add to cart
        </Button>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object,
};

ProductCard.defaultProps = {
  product: {
    id: 0,
    name: "",
    price: 0,
    images: [],
    description: "",
    category: "",
  },
};

export default ProductCard;
