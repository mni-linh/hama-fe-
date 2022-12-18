import React, { useRef } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { styled } from "@mui/material/styles";
import { Typography, Container, Stack, TextField, Button } from "@mui/material";

const SignIn = () => {
  const DOMAIN = "https://hama-be.vercel.app/";
  const [, setCookie] = useCookies(["token"]);
  const email = useRef("");
  const password = useRef("");
  // const
  const StyledContent = styled("div")(({ theme }) => ({
    maxWidth: 480,
    // margin: "auto",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2, 0),
  }));

  const handleSignIn = async (e) => {
    e.preventDefault();
    await axios
      .post(
        `${DOMAIN}api/user/token`,
        {
          grant_type: "",
          username: email.current.value,
          password: password.current.value,
          scope: "",
          client_id: "",
          client_secret: "",
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((res) => {
        setCookie("token", res?.data?.access_token, { path: "/" });
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
        console.log(res.data);
      })
      .catch((err) => {
        // setError(err?.response?.data?.detail);
        // setShow(true);
        return console.log("err", err);
      });
  };

  return (
    <>
      <Container maxWidth="sm">
        <StyledContent>
          <Typography
            variant="h4"
            gutterBottom
            style={{
              textAlign: "center",
              my: 3,
              marginBottom: "30px",
              fontWeight: "500",
            }}
          >
            Đăng nhập
          </Typography>
          {/* Login Form */}
          <Stack spacing={7}>
            <TextField
              id="utlined-password-input"
              name="email"
              label="Email"
              type="email"
              autoComplete="current-password"
              variant="outlined"
              fullWidth
              required
              sx={{ height: "1.4375em" }}
              inputRef={email}
            />
            <TextField
              name="password"
              label="Mật khẩu"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              fullWidth
              required
              sx={{ height: "1.4375em" }}
              inputRef={password}
            />
            <Button
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              onClick={handleSignIn}
              style={{
                fontSize: "1.3rem",
                boxShadow: "0 8px 16px 0 rgb(32 101 209 / 24%)",
                height: "50px",
                width: "43%",
                marginLeft: "30%",
              }}
            >
              Đăng nhập
            </Button>
          </Stack>
          {/*  */}
        </StyledContent>
      </Container>
    </>
  );
};

export default SignIn;
