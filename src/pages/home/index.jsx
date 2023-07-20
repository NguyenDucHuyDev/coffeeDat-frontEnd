//Import library
import { Avatar, Carousel, Col, Row } from "antd";
import { useRef } from "react";
import { Link, useLocation } from "react-router-dom";

//Import word
import { homeLib } from "@/library/homePage/homeLib";

//Import image
import img_banner1 from "@/assets/images/coffee_banner_slide1.png";
import img_banner2 from "@/assets/images/coffee_banner_slide2.png";
import img_banner3 from "@/assets/images/coffee_banner_slide3.png";
import img_banner_content from "@/assets/images/coffee_banner_content.png";
import img_arrowLeft from "@/assets/images/arrow-left.png";
import img_arrowRight from "@/assets/images/arrow-right.png";
import img_posterDiscover from "@/assets/images/coffee_poster_discover.png";
import img_productPoster from "@/assets/images/product_poster.png";
import img_infoMore from "@/assets/images/poster_about_us_2.png";
import img_iconFeedback from "@/assets/images/icon_feedback.png";
import img_avatarUser from "@/assets/images/avatar_user.gif";
import img_partnership from "@/assets/images/partnership.png";

//Import component
import { BtnYellow } from "@/components/button";
import { VerticalProduct } from "@/components/product";
import { ROUTES } from "../../config";
import { useEffect } from "react";

//Handle and export
const HomePage = () => {
  //prev and next slide
  const goToSlideBanner = useRef();
  const goToSlideFeedback = useRef();

  //items section banner
  const bannerItems = [
    {
      id: 1,
      image: img_banner1,
    },
    {
      id: 2,
      image: img_banner2,
    },
    {
      id: 3,
      image: img_banner3,
    },
  ];

  // items section partnership
  const partnershipItems = [
    {
      id: 1,
      image: img_partnership,
    },
    {
      id: 2,
      image: img_partnership,
    },
    {
      id: 3,
      image: img_partnership,
    },
    {
      id: 4,
      image: img_partnership,
    },
  ];

  // items section feedback
  const feedbackItems = [
    {
      id: 1,
      avatar: img_avatarUser,
      des: "I ordered a blend of Mexican coffee, I liked it very much, the taste is delicious, very invigorating in the morning. Now I start every day with the incredible coffee aroma that fills the kitchen. Will definitely order something again. Thanks!",
      name: "Tran Duc Thinh",
      desName: "Ceo, Coffee Dat",
    },
    {
      id: 2,
      avatar: img_avatarUser,
      des: "I ordered a blend of Mexican coffee, I liked it very much, the taste is delicious, very invigorating in the morning. Now I start every day with the incredible coffee aroma that fills the kitchen. Will definitely order something again. Thanks!",
      name: "Tran Duc Thinh",
      desName: "Ceo, Coffee Dat",
    },
    {
      id: 3,
      avatar: img_avatarUser,
      des: "I ordered a blend of Mexican coffee, I liked it very much, the taste is delicious, very invigorating in the morning. Now I start every day with the incredible coffee aroma that fills the kitchen. Will definitely order something again. Thanks!",
      name: "Tran Duc Thinh",
      desName: "Ceo, Coffee Dat",
    },
  ];

  const prevSlide = (category, title) => {
    return (
      <div
        className={
          "absolute z-10 top-2/4 left-0 translate-x-2/4 -translate-y-2/4 cursor-pointer " +
          (title === "feedback" ? "bg-[#999] p-2 rounded-full" : "")
        }
        onClick={() => category.current.prev()}
      >
        <img
          src={img_arrowLeft}
          alt=""
          className="hover:contrast-50"
          width={
            title === "banner" ? 48 : null ?? title === "feedback" ? 24 : null
          }
          height={
            title === "banner" ? 48 : null ?? title === "feedback" ? 24 : null
          }
        />
      </div>
    );
  };

  const nextSlide = (category, title) => {
    return (
      <div
        className={
          "absolute z-10 top-2/4 right-0 -translate-x-2/4 -translate-y-2/4 cursor-pointer " +
          (title === "feedback" ? "bg-[#999] p-2 rounded-full" : "")
        }
        onClick={() => category.current.next()}
      >
        <img
          src={img_arrowRight}
          alt=""
          className="hover:contrast-50"
          width={
            title === "banner" ? 48 : null ?? title === "feedback" ? 24 : null
          }
          height={
            title === "banner" ? 48 : null ?? title === "feedback" ? 24 : null
          }
        />
      </div>
    );
  };
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const jwtToken = searchParams.get("access_token_user");
  useEffect(() => {
    if (jwtToken) {
      localStorage.setItem("access_token_user", jwtToken);
    }
  }, [jwtToken]);

  return (
    <div className="homePage flex-1">
      <div className="homePage__main">
        <section className="banner">
          <div className="banner__home relative py-5 bg-[#FFFEFC] border-b-2">
            <Carousel
              autoplay
              dots={true}
              dotPosition="bottom"
              draggable
              ref={goToSlideBanner}
              className="dotsRound"
            >
              {bannerItems.map((item) => {
                return (
                  <div
                    className="banner h-[18.5rem] md:h-[38.4375rem] xl:h-full"
                    key={item.id}
                  >
                    <img
                      src={item.image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                );
              })}
            </Carousel>

            {prevSlide(goToSlideBanner, "banner")}
            {nextSlide(goToSlideBanner, "banner")}

            <div className="absolute z-10 left-2/4 top-2/4 -translate-y-2/4 md:flex-col gap-5 xl:flex hidden">
              <p className="w-96 text-white text-justify text-xl">
                {homeLib.word_titleBanner}
              </p>
              <img src={img_banner_content} alt="" width={250} />
              <p className="w-96 text-white opacity-80 text-justify">
                {homeLib.word_desBanner}
              </p>
              <Link to="/product">
                <div className="inline-block cursor-pointer">
                  {BtnYellow(homeLib.btn_orderNow)}
                </div>
              </Link>
            </div>
          </div>
        </section>

        <section className="content bg-[#FFFEFC] border-b-2">
          <div
            className="content__home pageWrapper"
            style={{ paddingLeft: 0, paddingRight: 0 }}
          >
            <div className="py-5 px-4">
              <div className="text-center text-4xl text-[#603809] font-bold mb-8">
                {homeLib.word_coffeeDiscovery}
              </div>

              <Row className="py-5 test">
                <Col md={{ span: 12 }} span={24} className="mb-5 md:mb-0">
                  <div className="text-xl font-semibold mb-5">
                    {homeLib.word_discoverBestCoffee}
                  </div>
                  <p className="text-justify md:w-3/4 mb-5 text-xs sm:text-base">
                    {homeLib.word_desOneDiscover}
                  </p>
                  <p className="text-justify md:w-3/4 mb-5 text-xs sm:text-base">
                    {homeLib.word_desTwoDiscover}
                  </p>
                </Col>

                <Col md={{ span: 12 }} span={24} align="middle">
                  <img
                    src={img_posterDiscover}
                    alt=""
                    className="object-cover h-96"
                  />
                </Col>
              </Row>
            </div>

            <div className="flex flex-col gap-5 mb-8 md:mb-0">
              <div className="text-center md:my-8 my-1">
                <span className="text-4xl text-[#603809] font-bold ">
                  {homeLib.word_coffeeProductsDat}
                </span>
                <p className="mt-3 text-sm text-gray-500">
                  {homeLib.word_coffeeProductsDatDes}
                </p>
              </div>

              <div className="flex flex-wrap justify-center sm:justify-start">
                <Link
                  className="sm:w-1/2 md:w-1/3 lg:w-1/4 p-4"
                  to={ROUTES.PRODUCT}
                >
                  {VerticalProduct(
                    img_productPoster,
                    "Title Name Coffee",
                    "15,000",
                    "20"
                  )}
                </Link>
                <Link
                  className="sm:w-1/2 md:w-1/3 lg:w-1/4 p-4"
                  to={ROUTES.PRODUCT}
                >
                  {VerticalProduct(
                    img_productPoster,
                    "Title Name Coffee",
                    "15,000",
                    "20"
                  )}
                </Link>
                <Link
                  className="sm:w-1/2 md:w-1/3 lg:w-1/4 p-4"
                  to={ROUTES.PRODUCT}
                >
                  {VerticalProduct(
                    img_productPoster,
                    "Title Name Coffee",
                    "15,000",
                    "20"
                  )}
                </Link>
                <Link
                  className="sm:w-1/2 md:w-1/3 lg:w-1/4 p-4"
                  to={ROUTES.PRODUCT}
                >
                  {VerticalProduct(
                    img_productPoster,
                    "Title Name Coffee",
                    "15,000",
                    "20"
                  )}
                </Link>
              </div>

              <Link to={ROUTES.PRODUCT} className="text-center md:my-8">
                <div className="inline-block cursor-pointer m-auto">
                  {BtnYellow(homeLib.btn_orderNow)}
                </div>
              </Link>
            </div>

            <div className="flex flex-col gap-5">
              <div className="text-center md:my-8">
                <span className="text-4xl text-[#603809] font-bold ">
                  More Information About Coffee
                </span>
                <p className="mt-3 text-sm text-gray-500">
                  About the coffee harvest
                </p>
              </div>

              <div className="flex flex-wrap justify-center sm:justify-start">
                <Link
                  className="w-64 sm:w-1/2 md:w-1/3 lg:w-1/4 p-4"
                  to={ROUTES.NEWS}
                >
                  <img src={img_infoMore} alt="" className="hover:shadow-2xl" />
                </Link>
                <Link
                  className="w-64 sm:w-1/2 md:w-1/3 lg:w-1/4 p-4"
                  to={ROUTES.NEWS}
                >
                  <img src={img_infoMore} alt="" className="hover:shadow-2xl" />
                </Link>
                <Link
                  className="w-64 sm:w-1/2 md:w-1/3 lg:w-1/4 p-4"
                  to={ROUTES.NEWS}
                >
                  <img src={img_infoMore} alt="" className="hover:shadow-2xl" />
                </Link>
                <Link
                  className="w-64 sm:w-1/2 md:w-1/3 lg:w-1/4 p-4"
                  to={ROUTES.NEWS}
                >
                  <img src={img_infoMore} alt="" className="hover:shadow-2xl" />
                </Link>
              </div>

              <Link to="/news" className="text-center my-8">
                <div className="inline-block cursor-pointer text-black">
                  {BtnYellow("Learn More")}
                </div>
              </Link>
            </div>

            <div>
              <div className="text-center my-8">
                <span className="text-4xl text-[#603809] font-bold ">
                  Our Coffee Perfection Feedback
                </span>
                <p className="mt-3 text-sm text-gray-500">
                  Our customers has amazing things to say about us
                </p>
              </div>

              <div className="relative">
                <Carousel
                  dots={true}
                  dotPosition="bottom"
                  draggable
                  className="dotsRound"
                  ref={goToSlideFeedback}
                >
                  {feedbackItems.map((item) => {
                    return (
                      <div key={item.id}>
                        <div className="flex flex-col items-center gap-10">
                          <div>
                            <Avatar
                              size={100}
                              src={item.avatar}
                              className="bg-[#ddd]"
                            />
                          </div>
                          <p className="w-2/4 text-center font-extralight text-md">
                            I ordered a blend of Mexican coffee, I liked it very
                            much, the taste is delicious, very invigorating in
                            the morning. Now I start every day with the
                            incredible coffee aroma that fills the kitchen. Will
                            definitely order something again. Thanks!
                          </p>
                          <img src={img_iconFeedback} alt="" />
                          <div className="flex flex-col items-center">
                            <span className="font-bold text-xl">
                              {item.name}
                            </span>
                            <span>{item.desName}</span>
                          </div>
                          <div className="h-10"></div>
                        </div>
                      </div>
                    );
                  })}
                </Carousel>

                {prevSlide(goToSlideFeedback, "feedback")}
                {nextSlide(goToSlideFeedback, "feedback")}
              </div>
            </div>
          </div>
        </section>

        <section className="partnership bg-[#FFFEFC] py-5">
          <div className="partnership__home pageWrapper">
            <div>
              <div className="text-center my-8">
                <span className="text-4xl text-[#603809] font-bold ">
                  Trusted Partnership
                </span>
                <p className="mt-3 text-sm text-gray-500">
                  Trusted partner by coffee dat
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start">
              {partnershipItems.map((item) => {
                return (
                  <div
                    className="w-48 sm:w-1/2 md:w-1/3 lg:w-1/4 p-4"
                    key={item.id}
                  >
                    <div className="bg-[#f6f6f6] py-5 rounded-2xl hover:shadow-lg cursor-pointer">
                      <img
                        src={item.image}
                        alt=""
                        width={120}
                        className="mx-auto"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
