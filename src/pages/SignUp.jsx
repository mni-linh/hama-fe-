import React, { useRef, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Col, Row, Card, Form, Button } from "@themesberg/react-bootstrap";

import DefaultAvatar from "../assets/images/Default Avatar.jpg";
import AlertCustom from "../components/alert-custom/Alert";

const SignUp = () => {
  const DOMAIN = "https://hama-be.vercel.app/";
  const [, setCookie] = useCookies(["token"]);
  const [image, setImage] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);
  const [loadingSignUp, setLoadingSignUp] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("");
  const name = useRef("");
  const email = useRef("");
  const phone = useRef("");
  const address = useRef("");
  const password = useRef("");
  const passwordConfirm = useRef("");

  const handleSelectImage = async (e) => {
    if (e.target.files[0]) {
      setLoadingImage(true);
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      await axios({
        method: "POST",
        url: "https://api.imgbb.com/1/upload?key=55b682fb2235adc9beb9aa845a4f08de",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((res) => {
          setLoadingImage(false);
          setImage(res?.data?.data?.display_url);
          setAlertMessage("Upload ảnh thành công");
          setAlertVariant("success");
          setShowAlert(true);
        })
        .catch((err) => {
          console.log(err);
          setLoadingImage(false);
          setAlertMessage("Upload ảnh thất bại");
          setAlertVariant("danger");
          setShowAlert(true);
        });
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password?.current?.value !== passwordConfirm?.current?.value) {
      setAlertMessage("Mật khẩu không khớp");
      setAlertVariant("danger");
      setShowAlert(true);
    } else {
      setLoadingSignUp(true);
      await axios
        .post(
          `${DOMAIN}api/user`,
          {
            name: name?.current?.value,
            email: email?.current?.value,
            phone: phone?.current?.value,
            address: address?.current?.value,
            password: password?.current?.value,
            avatar: image,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )

        .then((res) => {
          setLoadingSignUp(false);
          setCookie("token", res?.data?.access_token, { path: "/" });
          setAlertMessage("Đăng ký thành công");
          setAlertVariant("success");
          setShowAlert(true);
          console.log(res);
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
        })
        .catch((err) => {
          setLoadingSignUp(false);
          setAlertMessage(err?.response?.data?.detail || "Đăng ký thất bại");
          setAlertVariant("danger");
          setShowAlert(true);
          console.log(err);
        });
    }
  };

  return (
    <>
      <Row style={{ display: "flex", justifyContent: "space-between" }}>
        <Col xs={8} style={{ margin: "10px auto" }}>
          {/* GerneralInform */}
          <Card
            border="light"
            className="bg-white shadow-lg mb-4"
            style={{ borderRadius: "25px" }}
          >
            <Card.Body>
              <h4 className="mb-4" style={{ textAlign: "center" }}>
                Thông tin chung
              </h4>
              <Form onSubmit={handleSignUp}>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group id="yourName">
                      <Form.Label>Tên</Form.Label>
                      <Form.Control
                        ref={name}
                        required
                        type="text"
                        placeholder="Nhập tên vào đây..."
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group id="emal">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        required
                        ref={email}
                        name="email"
                        type="email"
                        placeholder="Nhập email vào đây..."
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group id="address">
                      <Form.Label>Địa chỉ</Form.Label>
                      <Form.Control
                        ref={address}
                        required
                        type="address"
                        placeholder="Nhập lại địa chỉ..."
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group id="address">
                      <Form.Label>Số điện thoại</Form.Label>
                      <Form.Control
                        ref={phone}
                        required
                        type="number"
                        placeholder="Nhập số điện thoại..."
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group id="password">
                      <Form.Label>Mật khẩu</Form.Label>
                      <Form.Control
                        ref={password}
                        type="password"
                        required
                        placeholder="Nhập mật khẩu..."
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group id="repassword">
                      <Form.Label>Nhập lại mật khẩu</Form.Label>
                      <Form.Control
                        ref={passwordConfirm}
                        type="password"
                        required
                        placeholder="Nhập lại mật khẩu..."
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <div className="mt-3" style={{ float: "right" }}>
                  <Button
                    variant="success"
                    type="submit"
                    className="mr-2"
                    style={{ textTransform: "none", fontSize: "1.2rem" }}
                    disabled={loadingSignUp || loadingImage}
                  >
                    {loadingSignUp
                      ? "Đang đăng ký..."
                      : loadingImage
                      ? "Đang tải ảnh..."
                      : "Đăng ký"}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={4}>
          <Row>
            <Col xs={12} style={{ margin: "10px auto" }}>
              {/* Widgets */}
              <Card
                border="light"
                className="text-center bg-white shadow-lg mb-4"
                style={{ marginTop: "0px", borderRadius: "25px" }}
              >
                <Card.Body style={{}}>
                  <h4 style={{ marginBottom: "3.75rem" }}>Ảnh đại diện</h4>
                  <Card.Img
                    src={image || DefaultAvatar}
                    alt="Avatar Admin"
                    className="user-avatar large-avatar rounded-circle mx-auto mt-n5 mb-2"
                    style={{ width: "150px", height: "150px", padding: "0" }}
                  />
                  <div>
                    <div className="d-flex justify-content-xl-center ">
                      <div className="d-flex"></div>
                      <input
                        type="file"
                        id="file"
                        accept="image/*"
                        onChange={handleSelectImage}
                        style={{ display: "none" }}
                      />
                      <label
                        htmlFor="file"
                        className="btn btn-primary"
                        style={{
                          textTransform: "none",
                          fontSize: "1.2rem",
                          backgroundColor: "#4267b2",
                        }}
                      >
                        {loadingImage ? "Đang tải ảnh..." : "Chọn ảnh"}
                      </label>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
      <AlertCustom
        show={showAlert}
        setShow={setShowAlert}
        title={alertMessage}
        variant={alertVariant}
      />
    </>
  );
};

export default SignUp;
