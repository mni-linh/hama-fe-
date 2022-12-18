import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useCookies } from "react-cookie";
import { withRouter, useLocation, useHistory } from "react-router";

import Button from "./Button";
import numberWithCommas from "../utils/numberWithCommas";
import AlertCustom from "./alert-custom/Alert";

const formatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

const ProductView = ({ product, ...props }) => {
  const DOMAIN = "https://hama-be.vercel.app/";
  // const DOMAIN = "http://localhost:8080/";

  const location = useLocation();
  const history = useHistory();
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;

  const [previewImg, setPreviewImg] = useState(
    product?.images ? product?.images[0] : ""
  );

  const [size, setSize] = useState(undefined);

  const [quantity, setQuantity] = useState(1);

  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("success");

  const updateQuantity = (type) => {
    if (type === "plus") {
      setQuantity(quantity + 1);
    } else {
      setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
    }
  };

  const check = () => {
    if (loading) return false;

    if (!token) {
      setAlertMessage("Bạn cần đăng nhập để thực hiện chức năng này");
      setAlertVariant("danger");
      setShowAlert(true);
      setTimeout(() => {
        history.push("/signin");
      }, 2000);
      return false;
    }
    if (!size) {
      setAlertMessage("Vui lòng chọn size");
      setAlertVariant("danger");
      setShowAlert(true);
      return false;
    }

    return true;
  };

  const addToCart = async () => {
    if (check()) {
      setLoading(true);
      axios
        .post(
          `${DOMAIN}api/cart`,
          {
            product_id: product.id,
            product_size: size,
            quantity: quantity,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          setLoading(false);
          setAlertMessage("Thêm vào giỏ hàng thành công");
          setAlertVariant("success");
          setShowAlert(true);
        })
        .catch((err) => {
          setLoading(false);
          setAlertMessage("Thêm vào giỏ hàng thất bại");
          setAlertVariant("danger");
          setShowAlert(true);
          console.log(err);
        });
    }
  };

  const goToCart = async () => {
    if (check()) {
      await addToCart();
      setTimeout(() => {
        history.push("/cart");
      }, 2000);
    }
  };

  return (
    <div className="product">
      <div className="product__images">
        <div className="product__images__list">
          {product?.images?.map((image, index) => (
            <div
              key={index}
              className="product__images__list__item"
              onClick={() => setPreviewImg(image)}
            >
              <img
                src={image}
                alt="
              product"
              />
            </div>
          ))}
        </div>

        <div className="product__images__main">
          <img src={previewImg} alt="product" />
        </div>
        <div className={`product-description`}>
          <div className="product-description__title">Chi tiết sản phẩm</div>
          <div
            className="product-description__content"
            dangerouslySetInnerHTML={{ __html: product?.description }}
          ></div>
        </div>
      </div>
      <div className="product__info">
        <h1 className="product__info__title">{product?.name}</h1>
        <div className="product__info__item">
          <span className="product__info__item__price">
            {numberWithCommas(formatter.format(product?.price))}
          </span>
        </div>
        {/* <!-- Your share button code --> */}
        <div className="product__info__share">
          {/* linkedin */}
          <div className="linkedin-share-button" style={{ cursor: "pointer" }}>
            <i className="fab fa-linkedin"></i>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=hamacorner.vercel.app${location.pathname}`}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIN
            </a>
          </div>
          {/* fb */}
          <div
            className="fb-share-button"
            data-href={`https://hamacorner.vercel.app/products/${product?.id}`}
            data-layout="button"
            data-size="small"
          ></div>

          {/* twitter */}
          <div>
            <a
              href="https://twitter.com/share?ref_src=twsrc%5Etfw"
              className="twitter-share-button"
              data-show-count="false"
            >
              Tweet
            </a>
          </div>
        </div>

        <div className="product__info__item">
          <div className="product__info__item__title">Kích cỡ</div>
          <div className="product__info__item__list">
            {product?.size?.map((item, index) => (
              <div
                key={index}
                className={`product__info__item__list__item ${
                  size === item ? "active" : ""
                }`}
                onClick={() => setSize(item)}
              >
                <span className="product__info__item__list__item__size">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="product__info__item">
          <div className="product__info__item__title">Số lượng</div>
          <div className="product__info__item__quantity">
            <div
              className="product__info__item__quantity__btn"
              onClick={() => updateQuantity("minus")}
            >
              <i className="bx bx-minus"></i>
            </div>
            <div className="product__info__item__quantity__input">
              {quantity}
            </div>
            <div
              className="product__info__item__quantity__btn"
              onClick={() => updateQuantity("plus")}
            >
              <i className="bx bx-plus"></i>
            </div>
          </div>
        </div>
        <div className="product__info__item">
          <Button onClick={() => addToCart()}>
            {loading ? "đang thêm..." : "thêm vào giỏ"}
          </Button>
          <Button onClick={() => goToCart()}>{loading ? "đang thêm..." : "mua ngay"}</Button>
        </div>
      </div>
      <div className="product-description mobile">
        <div className="product-description__title">Chi tiết sản phẩm</div>
        <div
          className="product-description__content"
          dangerouslySetInnerHTML={{ __html: product?.description }}
        ></div>

        {setTimeout(() => {
          window?.FB?.XFBML?.parse();
          window?.twttr?.widgets?.load();
        }, 1000)}
      </div>
      <AlertCustom
        show={showAlert}
        setShow={setShowAlert}
        title={alertMessage}
        variant={alertVariant}
      />
    </div>
  );
};

ProductView.propTypes = {
  product: PropTypes.object,
};

export default withRouter(ProductView);
