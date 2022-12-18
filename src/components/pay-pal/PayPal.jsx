import React from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";

const PayPal = ({
  totalPrice,
  name,
  phone,
  email,
  address,
  note,
  cartItems,
}) => {
  const DOMAIN = "https://hama-be.vercel.app/";
  //   const DOMAIN = "http://localhost:8080/";

  const [cookies] = useCookies(["token"]);
  const history = useHistory();

  const paypal = React.useRef();
  React.useEffect(() => {
    totalPrice &&
      address &&
      window.paypal
        .Buttons({
          createOrder: (data, actions, err) => {
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  description: "Your description",
                  amount: {
                    currency_code: "USD",
                    value: totalPrice,
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            if (order.status === "COMPLETED") {
              await axios
                .post(
                  `${DOMAIN}api/order`,
                  {
                    name,
                    email,
                    phone,
                    address,
                    note,
                    total_price: Math.round(totalPrice * 24838),
                    products: cartItems.map((item) => ({
                      product: item.product.id,
                      name: item.product.name,
                      price: item.product.price,
                      images: item.product.images,
                      quantity: item.quantity,
                      size: item.size,
                    })),
                    status: 1,
                    payment_id: 2,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${cookies.token}`,
                    },
                  }
                )
                .then(() => {
                  setTimeout(() => {
                    history.push("/");
                  }, 2000);
                })
                .catch((err) => console.log(err));
            }
          },
          onError: (err) => {
            console.log(err);
          },
        })
        .render(paypal.current);
  }, [address, totalPrice]); // eslint-disable-line react-hooks/exhaustive-deps

  return <div ref={paypal}></div>;
};

export default PayPal;
