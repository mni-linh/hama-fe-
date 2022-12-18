import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";

const HeroSlider = (props) => {
  const data = props.data;

  const timeOut = props.timeOut ? props.timeOut : 3000;

  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = useCallback(() => {
    const index = activeSlide + 1 === data.length ? 0 : activeSlide + 1;
    setActiveSlide(index);
  }, [activeSlide, data]);

  useEffect(() => {
    if (props.auto) {
      const slideAuto = setInterval(() => {
        nextSlide();
      }, timeOut);
      return () => {
        clearInterval(slideAuto);
      };
    }
  }, [nextSlide, timeOut, props]);

  return (
    <div className="hero-slider">
      {data.map((item, index) => (
        <HeroSliderItem
          key={index}
          item={item}
          active={index === activeSlide}
        />
      ))}
      {props.control ? (
        <div className="hero-slider__control">
          {/* <div className="hero-slider__control__item" onClick={prevSlide}>
                            <i className="bx bx-chevron-left"></i>
                        </div>
                        <div className="hero-slider__control__item">
                            <div className="index">
                                {activeSlide + 1}/{data.length}
                            </div>
                        </div>
                        <div className="hero-slider__control__item" onClick={nextSlide}>
                            <i className="bx bx-chevron-right"></i>
                        </div> */}
        </div>
      ) : null}
    </div>
  );
};

HeroSlider.propTypes = {
  data: PropTypes.array.isRequired,
  control: PropTypes.bool,
  auto: PropTypes.bool,
  timeOut: PropTypes.number,
};

const HeroSliderItem = (props) => (
  <div className={`hero-slider__item ${props.active ? "active" : ""}`}>
    <div className="hero-slider__item__info">
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div
        className={`hero-slider__item__info__title color-${props.item.color}`}
        style={{ textAlign: "right", color: "#4267b2" }}
      >
        <span>{props.item.title}</span>
      </div>
      <div
        className="hero-slider__item__info__description"
        style={{ textAlign: "right" }}
      >
        <span>{props.item.description1}</span>
        <span>{props.item.description2}</span>
        <span>{props.item.description3}</span>
      </div>
      {/* <div className="hero-slider__item__info__btn">
                <Link to={props.item.path}>
                    <Button
                        backgroundColor={props.item.color}
                        icon="bx bx-cart"
                        animate={true}
                    >
                        xem chi tiết
                    </Button>
                </Link>
            </div> */}
    </div>
    <div className="hero-slider__item__image" style={{ "z-index": "1" }}>
      {/* <div className={`shape bg-${props.item.color}`}></div> */}
      <img src={props.item.img} alt="" />
    </div>
  </div>
);

export default HeroSlider;