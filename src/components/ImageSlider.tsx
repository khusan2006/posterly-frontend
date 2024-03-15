import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ReactNode } from "react";

interface ImageSliderProps {
  urls: string[];
}
function SampleNextArrow(props: {
  className?: string;
  style?: { [prop: string]: string };
  onClick?: () => void;
}) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        position: "absolute",
        top: "50%",
        right: "2%",
        zIndex: "1000",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props: {
  className?: string;
  style?: { [prop: string]: string };
  onClick?: () => void;
}) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        position: "absolute",
        top: "50%",
        left: "2%",
        zIndex: "1000",
      }}
      onClick={onClick}
    />
  );
}

const ImageSlider = ({ urls }: ImageSliderProps) => {
  const settings = {
    dots: urls ? true : false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    swipeToSlide: true,
    accessibility: urls.length > 1 ? true : false,
    nextArrow: urls.length > 1 ? <SampleNextArrow /> : <></>,
    prevArrow: urls.length > 1 ? <SamplePrevArrow /> : <></>,
    appendDots: (dots: ReactNode) => {
      if(urls.length <= 1) return <></>
      return (
        <ul style={{ margin: "0px", position: "absolute", bottom: "3%" }}>
          {" "}
          {dots}{" "}
        </ul>
      );
    },
  };

  return (
    <Slider
      {...settings}
      className="group relative h-full bg-zinc-100  overflow-hidden rounded-xl"
    >
      {urls.map((item) => (
        <img src={item} alt="carousel image" />
      ))}
    </Slider>
  );
};

export default ImageSlider;
