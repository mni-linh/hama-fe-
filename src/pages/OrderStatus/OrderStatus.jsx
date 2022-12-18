import React from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import "./status.css";
import prod01 from "../../assets/images/tmp/01.png";
import { useEffect } from "react";
const OrderStatus = () => {
  const DOMAIN = "https://hama-be.vercel.app/";
  // const DOMAIN = "http://localhost:8080/";
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;

  useEffect(() => {
    if (token) {
      axios
        .get(`${DOMAIN}api/order`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log("res", res.data);
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  }, [token]);

  return (
    <div>
      <div class="container">
        <article
          class="card"
          style={{
            borderRadius: "5px",
            border: "2px solid #e5e5e5",
            boxShadow: "unset",
          }}
        >
          <header class="card-header">Đơn hàng của tôi / Mã đơn hàng</header>
          <div class="card-body">
            <h6>ID Đơn hàng: OD45345345435</h6>
            <article class="card">
              <div class="card-body row">
                <div class="col">
                  <strong>Thời gian giao hàng dự kién:</strong> <br />
                  30 tháng 11 năm 2022
                </div>
                <div class="col">
                  <strong>Được vận chuyển bởi:</strong> <br />
                  GNK, | <i class="fa fa-phone"></i> +84 353544089
                </div>
                <div class="col">
                  <strong>Tình trạng:</strong> <br />
                  Chuyển phát nhanh
                </div>
                <div class="col">
                  <strong>Mã đơn hàng #:</strong> <br />
                  BD045903594059
                </div>
              </div>
            </article>
            <div class="track">
              <div class="step active">
                <span class="icon">
                  {" "}
                  <i class="fa fa-check"></i>{" "}
                </span>
                <span class="text">Đơn hàng đã xác nhận</span>
              </div>
              <div class="step active">
                <span class="icon">
                  {" "}
                  <i class="fa fa-user"></i>{" "}
                </span>
                <span class="text"> Chuyển phát nhanh</span>
              </div>
              <div class="step">
                <span class="icon">
                  {" "}
                  <i class="fa fa-truck"></i>{" "}
                </span>
                <span class="text"> Đang vận chuyển </span>
              </div>
              <div class="step">
                <span class="icon">
                  {" "}
                  <i class="fa fa-box"></i>{" "}
                </span>
                <span class="text">Đã nhận hàng</span>
              </div>
            </div>
            <hr />
            <ul class="row">
              <li class="col-md-4">
                <figure class="itemside mb-3">
                  <div class="aside">
                    <img src={prod01} class="img-sm border" alt="product" />
                  </div>
                  <figcaption class="info align-self-center">
                    <p class="title">
                      product 01 <br />
                      8GB RAM
                    </p>
                    <span class="text-muted">$950 </span>
                  </figcaption>
                </figure>
              </li>
              <li class="col-md-4">
                <figure class="itemside mb-3">
                  <div class="aside">
                    <img src={prod01} class="img-sm border"alt="product"/>
                  </div>
                  <figcaption class="info align-self-center">
                    <p class="title">
                      product 02 <br />
                      8GB RAM
                    </p>
                    <span class="text-muted">$850 </span>
                  </figcaption>
                </figure>
              </li>
              <li class="col-md-4">
                <figure class="itemside mb-3">
                  <div class="aside">
                    <img src={prod01} class="img-sm border" alt="product"/>
                  </div>
                  <figcaption class="info align-self-center">
                    <p class="title">
                      product 03 <br />
                      8GB RAM
                    </p>
                    <span class="text-muted">$650 </span>
                  </figcaption>
                </figure>
              </li>
            </ul>
            <hr />
            <a
              href="/"
              class="btn btn-warning"
              data-abc="true"
              style={{
                fontSize: "15px",
                textTransform: "none",
                borderRadius: "20px",
                padding: "10px 20px",
              }}
            >
              <i class="fa fa-chevron-left" style={{ paddingRight: "2px" }}></i>{" "}
              Trở về
            </a>
          </div>
        </article>
      </div>
    </div>
  );
};

export default OrderStatus;
