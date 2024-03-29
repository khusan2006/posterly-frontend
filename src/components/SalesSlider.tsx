import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ReactNode } from "react";
const urls = [
  '/banner.webp',
  '/webpost2.webp',
  '/webpost3.webp'
];

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

const SalesSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    swipeToSlide: true,
    accessibility: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    appendDots: (dots: ReactNode) => (
      <ul style={{ margin: "0px", position: "absolute", bottom: "3%" }}>
        {" "}
        {dots}{" "}
      </ul>
    ),
  };

  return (
    // <div className="group relative bg-zinc-100  overflow-hidden rounded-xl w-full mb-6 mt-4 h-[fit-content]  sm:h-[85vh] 2xl:h-[70vh]">
    <Slider
      {...settings}
      className="group relative bg-zinc-100  rounded-xl w-full mb-6 mt-4 h-[fit-content] overflow-hidden md:h-[90vh]   2xl:h-[70vh]"
    >
      {urls.map((item) => (
        <img src={item} alt="carousel image" fetchpriority="high" />
      ))}
    </Slider>
    // </div>
  );
};

export default SalesSlider;
