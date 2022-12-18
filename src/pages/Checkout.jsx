import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { getDistance } from "geolib";
import moneyLogo from "../assets/images/give-money.png";
import AlertCustom from "../components/alert-custom/Alert";
import PayPal from "../components/pay-pal/PayPal";
import { Button } from "@themesberg/react-bootstrap";
import locations from "../assets/fake-data/locations";
// import
const formatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

const Checkout = () => {
  // const relatedLocations = vietNamLocations.filter(
  //   (location) => location.name === "Hà Nội"
  // );
  const DOMAIN = "https://hama-be.vercel.app/";
  // const DOMAIN = "http://localhost:8080/";

  const history = useHistory();
  const [cookies] = useCookies(["token"]);
  const [feeship, setFeeship] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [city, setCity] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("");

  const handleGetCarts = () => {
    setCartItems(history.location.state.cartItems);
    setTotalPrice(
      history.location.state.totalPrice
      // history.location.state.totalPrice > 239000
      //   ? history.location.state.totalPrice
      //   : history.location.state.totalPrice + 30000
    );
  };

  const handleGetUser = async () => {
    await axios
      .get(`${DOMAIN}api/user/me`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        const { name, email, phone, address } = res.data;
        setName(name);
        setEmail(email);
        setPhone(phone);
        setAddress(address);
      })
      .catch((err) => {
        console.log(err);
        setAlertMessage("Có lỗi xảy ra, vui lòng thử lại sau");
        setAlertVariant("danger");
        setShowAlert(true);
      });
  };

  const handleCheckout = async (payment_id) => {
    if (cartItems.length === 0) {
      setAlertMessage("Giỏ hàng trống");
      setAlertVariant("danger");
      setShowAlert(true);
      return;
    }

    if (!name || !email || !phone || !address) {
      setAlertMessage("Vui lòng điền đầy đủ thông tin");
      setAlertVariant("danger");
      setShowAlert(true);
      return;
    }

    const order = {
      name,
      email,
      phone,
      address,
      note,
      total_price: totalPrice,
      products: cartItems.map((item) => ({
        product: item.product.id,
        name: item.product.name,
        price: item.product.price,
        images: item.product.images,
        quantity: item.quantity,
        size: item.size,
      })),
      status: 1,
      payment_id: payment_id,
    };

    await axios
      .post(`${DOMAIN}api/order`, order, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then(() => {
        setAlertMessage("Đặt hàng thành công");
        setAlertVariant("success");
        setShowAlert(true);
        setTimeout(() => {
          history.push("/");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setAlertMessage("Có lỗi xảy ra, vui lòng thử lại sau");
        setAlertVariant("danger");
        setShowAlert(true);
      });
  };

  useEffect(() => {
    handleGetUser();
    handleGetCarts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div
        className="py-3 bg-Muted link"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        <div
          className="container"
          style={{
            width: "100%",
            maxWidth: "1620px",
            padding: "0 50px",
            margin: "auto",
          }}
        >
          <h6
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              fontFamily: '"Lora", serif',
              color: "#243a6f",
              fontSize: "40px",
            }}
          >
            Checkout
          </h6>
        </div>
      </div>

      <div
        className="py-4"
        style={{
          paddingBottom: "1.5rem!important",
          paddingTop: "1.5rem!important",
        }}
      >
        <div
          className="container"
          style={{
            width: "100%",
            maxWidth: "1620px",
            padding: "0 50px",
            margin: "auto",
          }}
        >
          <div className="row">
            <div className="col-md-7">
              <div className="card">
                <div className="card-header">
                  <h4>Billing Information</h4>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label>Full Name </label>
                        <input
                          type="text"
                          name="name"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                          className="form-control"
                          style={{
                            border: "1px solid #ced4da",
                            borderRadius: "20px",
                          }}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label> Phone Number </label>
                        <input
                          type="text"
                          name="phone"
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                          }}
                          className="form-control"
                          style={{
                            border: "1px solid #ced4da",
                            borderRadius: "20px",
                          }}
                          pattern="[0-9]{4}[0-9]{3}[0-9]{3}"
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label> Email </label>
                        <input
                          type="email"
                          name="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                          className="form-control"
                          style={{
                            border: "1px solid #ced4da",
                            borderRadius: "20px",
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label>Province / City </label>
                        <select
                          className="form-control"
                          style={{
                            border: "1px solid #ced4da",
                            borderRadius: "20px",
                          }}
                          onChange={(e) => {
                            // lay value cua option selected
                            var index = e.target.value;
                            setFeeship(
                              (getDistance(
                                { latitude: 10.8167, longitude: 106.6333 },
                                {
                                  latitude: locations[index].lat,
                                  longitude: locations[index].long,
                                }
                              ) /
                                1000) *
                                50
                            );
                          }}
                        >
                          {locations.map((opt, index) => (
                            <option
                              value={index}
                              onChange={(e) => {
                                setCity(e.target.value);
                                // console.log(
                                //   getDistance(
                                //     {
                                //       latitude: 10.8167,
                                //       longitude: 106.6333,
                                //     },
                                //     {
                                //       // latitude: { otp.lat },
                                //       // longitude: { otp.long },
                                //     }
                                //   )
                                // );
                              }}
                            >
                              {opt.city}
                            </option>
                          ))}
                        </select>
                        {/* <input
                          type="text"
                          name="city"
                          className="form-control"
                          value={city}
                          // options={}
                          onChange={(e) => {
                            setCity(e.target.value);
                            console.log(
                              getDistance(
                                { latitude: 20.0504188, longitude: 64.4139099 },
                                { latitude: 51.528308, longitude: -0.3817765 }
                              ) * 5000
                            );
                          }}
                          style={{
                            border: "1px solid #ced4da",
                            borderRadius: "20px",
                          }}
                        />{" "} */}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group mb-3">
                        <label>Address </label>
                        <input
                          type="text"
                          name="address"
                          className="form-control"
                          value={address}
                          onChange={(e) => {
                            setAddress(e.target.value);
                          }}
                          style={{
                            border: "1px solid #ced4da",
                            borderRadius: "20px",
                          }}
                        />
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="form-group mb-3">
                        <label> Note </label>
                        <textarea
                          name="note"
                          className="form-control"
                          value={note}
                          onChange={(e) => {
                            setNote(e.target.value);
                          }}
                          style={{
                            border: "1px solid #ced4da",
                            borderRadius: "20px",
                          }}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <table className="table table-bordered">
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "160px 90px 80px 100px",
                    gridGap: "10px",
                    backgroundColor: "transparent",
                    padding: "5px",
                  }}
                >
                  <div
                    style={{
                      textAlign: "center",
                      fontWeight: "500",
                      borderRight: "2px solid black",
                    }}
                  >
                    Product
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      fontWeight: "500",
                      borderRight: "2px solid black",
                    }}
                  >
                    Price
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      fontWeight: "500",
                      borderRight: "2px solid black",
                      padding: "0 5px",
                    }}
                  >
                    Quantity
                  </div>
                  <div style={{ textAlign: "center", fontWeight: "500" }}>
                    Total
                  </div>
                </div>

                <tbody>
                  {cartItems?.map((item, index) => {
                    return (
                      <table key={index}>
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "160px 90px 80px 100px",
                            gridGap: "10px",
                            backgroundColor: "transparent",
                            padding: "5px",
                          }}
                        >
                          <div
                            style={{
                              textAlign: "center",
                              borderBottom: "1px solid gray",
                            }}
                          >
                            {item.product.name}
                          </div>
                          <div
                            style={{
                              textAlign: "center",
                              borderBottom: "1px solid gray",
                            }}
                          >
                            {formatter.format(item.product.price)}
                          </div>
                          <div
                            style={{
                              textAlign: "center",
                              borderBottom: "1px solid gray",
                            }}
                          >
                            {item.quantity}
                          </div>
                          <div
                            style={{
                              textAlign: "center",
                              borderBottom: "1px solid gray",
                            }}
                          >
                            {formatter.format(
                              item.product.price * item.quantity
                            )}
                          </div>
                        </div>
                      </table>
                    );
                  })}
                  <div style={{ padding: "15px" }}>
                    <p>
                      <b>Shipping:</b>&nbsp;
                      {/* {totalPrice > 239000 ? " Free" : " 30.000 đ"} */}
                      {formatter.format(Math.round(feeship))}
                    </p>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "286px 83px 100px",
                    }}
                  >
                    <p></p>
                    <p style={{ fontWeight: "500" }}>Grand Total:</p>
                    {/* <p>{formatter.format(totalPrice)}</p> */}
                    <p>{formatter.format(Math.round(totalPrice + feeship))}</p>
                  </div>
                </tbody>
              </table>
              <h3 style={{ textAlign: "center" }}>Thanh toán</h3>
              <div className="form-check" style={{ display: "block" }}>
                <Button
                  variant="success"
                  onClick={() => handleCheckout(1)}
                  style={{ width: "100%", marginBottom: "10px" }}
                >
                  <img
                    src={moneyLogo}
                    alt=""
                    style={{
                      width: "70px",
                      height: "35px",
                      objectFit: "contain",
                      marginRight: "5px",
                    }}
                  />
                  Thanh toán khi nhận hàng
                </Button>

                <PayPal
                  name={name}
                  email={email}
                  phone={phone}
                  address={address}
                  note={note}
                  cartItems={cartItems}
                  totalPrice={Math.round(totalPrice / 24838)}
                />
              </div>
            </div>
          </div>
        </div>
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

export default Checkout;
