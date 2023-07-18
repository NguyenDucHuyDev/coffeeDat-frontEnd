//Import library
import { Player } from 'video-react';
import { Col, Row } from 'antd';

//Import word
import { aboutUsLib } from "@/library/aboutUsPage/aboutUsLib";

//Import image
import img_banner_aboutUs from '@/assets/images/banner_about_us.png';
import img_poster_aboutUs1 from '@/assets/images/poster_about_us_1.png';
import img_poster_aboutUs2 from '@/assets/images/poster_about_us_2.png';
import img_poster_video from '@/assets/images/poster_video_aboutUs.png';
import video_aboutUs from '@/assets/videos/video_aboutUs.mp4';

const AboutUsPage = () => {
  return (
    <div className="aboutUsPage flex-1">
      <div className="aboutUsPage__main">
        <section className="banner_aboutUs py-5 bg-[#FFFEFC] border-b-2">
          <div className="banner h-[18.5rem] md:h-[38.4375rem] xl:h-full relative">
            <img
              src={img_banner_aboutUs}
              alt=""
              className="w-full h-full object-cover"
            />

            <div className="absolute z-10 top-0 left-2/4 -translate-x-2/4 bg-[#d7d1c9] p-5 xl:py-10 xl:px-20 w-3/4 md:w-2/4 text-sm max-h-3/4">
              <div className="text-xl md:text-4xl font-bold text-[#8c203f] font-serif">{aboutUsLib.word_ourTeam}</div>
              <p className="text-justify md:my-5">{aboutUsLib.word_ourTeam_des}</p>
            </div>
          </div>
        </section>

        <section className="introduce bg-[#FFFEFC] border-b-2 md: py-8">
          <div className="introduce_main pageWrapper">
            <div className="text-center text-4xl text-[#603809] font-bold mb-5">{aboutUsLib.word_infoAboutUs}</div>

            <Row className="py-5 md:mb-8 flex flex-col md:flex-row">
              <Col md={{span:14}} span={24} >
                <div className="text-3xl font-semibold mb-5">{aboutUsLib.word_discoverBestCoffee}</div>
                <p className="text-justify md:w-3/4 mb-5 text-sm ">{aboutUsLib.word_discoverBestCoffee_des}</p>
              </Col>
              <Col  md={{span:10}} span={24} >
                <img src={img_poster_aboutUs1} alt="" className="object-cover md:m-0 my-5" />
              </Col>
            </Row>
            <Row className="md:py-5 md:my-5 flex-wrap-reverse md:flex-wrap">
              <Col md={{span:14}} span={24} >
                <img src={img_poster_aboutUs2} alt="" className="md:w-3/4 object-cover" />
              </Col>
              <Col md={{span:10}} span={24}>
                <div className="text-3xl font-semibold mb-5">{aboutUsLib.word_discoverBestCoffee}</div>
                <p className="text-justify md:w-3/4 mb-5 text-sm">{aboutUsLib.word_discoverBestCoffee_des}</p>
              </Col>
            </Row>
          </div>
        </section>

        <section className="video_introduce md:py-8 bg-[#FFFEFC]">
          <div className="video_introduce__main pageWrapper">
            <div className="text-center text-4xl text-[#603809] font-bold mb-8">{aboutUsLib.word_ourProductIntroductionVideo}</div>
            <div className="relative h-[35rem] mb-8">
              <Player playsInline poster={img_poster_video} src={video_aboutUs} />
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default AboutUsPage;
