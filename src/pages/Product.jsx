import React, { useEffect, useState } from "react";
import axios from "axios";

import Helmet from "../components/Helmet";
import Section, { SectionBody, SectionTitle } from "../components/Section";
import Grid from "../components/Grid";
import ProductCard from "../components/ProductCard";
import ProductView from "../components/ProductView";
import { useParams } from "react-router-dom";

const Product = () => {
  const DOMAIN = "https://hama-be.vercel.app/";

  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getRandomsProduct = (number) => {
    let arr = [];
    for (let i = 0; i < number; i++) {
      let random = Math.floor(Math.random() * productData.length);
      arr.push(productData[random]);
    }
    return arr;
  };  

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleGetAllProduct = async () => {
      setLoading(true);
      await axios
        .get(`${DOMAIN}api/products`)
        .then((res) => {
          setProductData(res.data);
          setProduct(res.data.find((item) => item.id.toString() === id));
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    };
    handleGetAllProduct();
  }, [id]);

  return (
    <Helmet title={product?.name}>
      <Section>
        <SectionBody>
          {loading ? (
            <div> Loading... </div>
          ) : (
            <ProductView product={product} />
          )}
        </SectionBody>
      </Section>
      <Section>
        <SectionTitle>Khám phá thêm</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {productData &&
              getRandomsProduct(4).map((item, index) => (
                <ProductCard
                  key={index}
                  product={item}
                />
              ))}
          </Grid>
        </SectionBody>
      </Section>
    </Helmet>
  );
};

export default Product;
