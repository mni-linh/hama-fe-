import React, { useState, useEffect } from "react";
import axios from "axios";

import Helmet from "../components/Helmet";
import CheckBox from "../components/CheckBox";

import Button from "../components/Button";
import InfinityList from "../components/InfinityList";

const Catalog = () => {
  const DOMAIN = "https://hama-be.vercel.app/";

  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const [productsFilter, setProductsFilter] = useState([]);

  const handleSearch = (e) => {
    setProductsFilter(
      products.filter((product) =>
        product.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  const handleChangeCategory = (e) => {
    setProductsFilter(
      products.filter(
        (product) => product.category_id.toString() === e.target.value
      )
    );
  };

  useEffect(() => {
    axios
      .get(`${DOMAIN}api/categories`)
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(`${DOMAIN}api/products`)
      .then((res) => {
        setProducts(res.data);
        setProductsFilter(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Helmet title="Products">
      <div className="catalog">
        <div className="catalog__filter">
          <div className="catalog__filter__widget">
            <div className="catalog__filter__widget__title">
              product portfolio
            </div>
            <div className="catalog__filter__widget__content">
              {category.map((item, index) => (
                <div
                  key={index}
                  className="catalog__filter__widget__content__item"
                >
                  <CheckBox
                    label={item.name}
                    value={item.id}
                    onChange={handleChangeCategory}
                  />
                </div>
              ))}
            </div>
            <input
              type="serach"
              placeholder="Enter product name..."
              onChange={handleSearch}
              style={{
                width: "90%",
                padding: "10px",
                color: "#8d8d8d",
                borderRadius: "20px",
                border: "1px solid #8d8d8d",
              }}
            />
          </div>

          <div className="catalog__filter__widget">
            <div className="catalog__filter__widget__content">
              <Button
                size="sm"
                onClick={() => {
                  setProductsFilter(products);
                }}
              >
                Remove filter
              </Button>
            </div>
          </div>
        </div>
        <div className="catalog__content">
          <InfinityList data={productsFilter} />
        </div>
      </div>
    </Helmet>
  );
};

export default Catalog;
