import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Col, Row, Card, Form, Button } from "@themesberg/react-bootstrap";
import DefaultAvatar from "../assets/images/Default Avatar.jpg";
import AlertCustom from "../components/alert-custom/Alert";

const Profile = () => {
  const DOMAIN = "https://hama-be.vercel.app/";

  const [cookies, setCookie] = useCookies(["token"]);
  const token = cookies.token;

  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("");

  const getUser = async () => {
    await axios
      .get(`${DOMAIN}api/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setName(res.data.name);
        setEmail(res.data.email);
        setPhone(res.data.phone);
        setAddress(res.data.address);
        setImage(res.data.avatar);
        setLoading(false);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (passwordConfirm) {
      if (password !== passwordConfirm) {
        setAlertMessage("Mật khẩu không khớp");
        setAlertVariant("danger");
        setShowAlert(true);
        return;
      }
    }

    setLoadingUpdate(true);
    await axios
      .put(
        `${DOMAIN}api/user/me`,
        {
          email: email || "",
          password: passwordConfirm || "",
          name: name || "",
          phone: phone || "",
          address: address || "",
          avatar: image || "",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setLoadingUpdate(false);
        setCookie("token", res?.data?.access_token, { path: "/" });
        setAlertMessage("Cập nhật thông tin thành công");
        setAlertVariant("success");
        setShowAlert(true);
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      })
      .catch((err) => {
        setLoadingUpdate(false);
        setAlertMessage(
          err?.response?.data?.detail || "Cập nhật thông tin thất bại"
        );
        setAlertVariant("danger");
        setShowAlert(true);
        console.log(err);
      });
  };

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  return loading ? (
    <div>Loading...</div>
  ) : (
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
              <Form onSubmit={handleUpdate}>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group id="yourName">
                      <Form.Label>Tên</Form.Label>
                      <Form.Control
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
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
                        type="address"
                        placeholder="Nhập lại địa chỉ..."
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group id="address">
                      <Form.Label>Số điện thoại</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Nhập số điện thoại..."
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group id="password">
                      <Form.Label>Mật khẩu</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Nhập mật khẩu..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group id="repassword">
                      <Form.Label>Nhập lại mật khẩu</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Nhập lại mật khẩu..."
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
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
                    disabled={loadingUpdate || loadingImage}
                  >
                    {loadingUpdate
                      ? "Đang cập nhật..."
                      : loadingImage
                      ? "Đang tải ảnh"
                      : "Cập nhật"}
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
                  <Card.Text className="text-muted mb-3 mt-3 ml-3">
                    {name || ""}
                  </Card.Text>
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

export default Profile;
