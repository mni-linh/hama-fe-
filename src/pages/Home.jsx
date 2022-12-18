import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Helmet from "../components/Helmet";
import HeroSlider from "../components/HeroSlider";
import Section, { SectionTitle, SectionBody } from "../components/Section";
import PolicyCard from "../components/PolicyCard";
import Grid from "../components/Grid";
import ProductCard from "../components/ProductCard";

import heroSliderData from "../assets/fake-data/hero-slider";
import policy from "../assets/fake-data/policy";

import banner from "../assets/images/banner.png";

const Home = () => {
  const DOMAIN = "https://hama-be.vercel.app/";

  const [productData, setProductData] = useState([]);

  const getRandomsProduct = (number) => {
    let arr = [];
    for (let i = 0; i < number; i++) {
      let random = Math.floor(Math.random() * productData.length);
      arr.push(productData[random]);
    }
    return arr;
  };

  useEffect(() => {
    axios
      .get(`${DOMAIN}api/products`)
      .then((res) => {
        setProductData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Helmet title="HOME">
      <title> Cửa hàng Hà Mã - Ha Ma Corner </title>
      {/* hero slider */}
      <HeroSlider
        data={heroSliderData}
        control={true}
        auto={false}
        timeOut={5000}
      />
      {/* end hero slider */}

      {/* policy section */}
      <Section>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {policy.map((item, index) => (
              <Link key={index} to="/policy">
                <PolicyCard
                  name={item.name}
                  description={item.description}
                  icon={item.icon}
                />
              </Link>
            ))}
          </Grid>
        </SectionBody>
      </Section>
      {/* end policy section */}

      {/* best selling section */}
      <Section>
        <SectionTitle>Top selling products of the week</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {productData &&
              getRandomsProduct(4)?.map((item, index) => (
                <ProductCard key={index} product={item} />
              ))}
          </Grid>
        </SectionBody>
      </Section>
      {/* end best selling section */}

      {/* new arrival section */}
      <Section>
        <SectionTitle>new product</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {productData &&
              getRandomsProduct(8)?.map((item, index) => (
                <ProductCard key={index} product={item} />
              ))}
          </Grid>
        </SectionBody>
      </Section>
      {/* end new arrival section */}

      {/* banner */}
      <Section>
        <SectionBody>
          <Link to="/catalog">
            <img src={banner} alt="" />
          </Link>
        </SectionBody>
      </Section>
      {/* end banner */}

      {/* popular product section */}
      <Section>
        <SectionTitle>Popular</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {productData &&
              getRandomsProduct(12)?.map((item, index) => (
                <ProductCard key={index} product={item} />
              ))}
          </Grid>
        </SectionBody>
      </Section>
      {/* end popular product section */}
    </Helmet>
  );
};

export default Home;
