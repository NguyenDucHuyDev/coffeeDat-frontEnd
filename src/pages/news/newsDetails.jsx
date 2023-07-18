import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import newsPoster from "../../assets/images/coffee_banner_slide3.png";
import { Col, Divider, Image, List, Row } from "antd";
import { NewsDetail } from "../../components/news/detail";

const NewsDetailPage = () => {
  const [newsInfo, setNewsInfo] = useState({});
  const [relatedNews, setRelativeNews] = useState([]);
  const { newsSlug } = useParams();

  const getNews = useCallback((newsSlug) => {
    // Handle data here
    // Below is random data
    const data = {
      id: crypto.randomUUID(),
      title: "News title",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, necessitatibus soluta quas, repellendus ipsa eos dolorum minus nisi vel consequuntur, qui cupiditate! Ipsa fuga sed, doloribus explicabo voluptas eius? Tenetur!",
      image: newsPoster,
    };
    setNewsInfo(data);
  }, []);

  const getRelatedNews = useCallback((newsSlug) => {
    // Logic handle data here
    // Below is random
    const data = Array(20)
      .fill(null)
      .map(() => ({
        id: crypto.randomUUID(),
        title: "News title",
        image: newsPoster,
        description:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius quidem quibusdam tempore vitae dicta velit dolore perspiciatis doloribus, dolorem, libero quod nulla nam cumque, consequatur repellendus laudantium non omnis cum?",
        author: {
          name: "Admin",
        },
        created_at: new Date(new Date().getTime() - 1000 * 60 * 60 * 3), // 3 hour ago
      }));

    setRelativeNews(data);
  }, []);

  useEffect(() => {
    getNews(newsSlug);
    getRelatedNews(newsSlug);
  }, [getNews, newsSlug, getRelatedNews]); // Watch the slug change, will be fetch data
  return (
    <div className="productPage flex-1">
      <div className="productPage__main py-5">
        <div className="pageWrapper">
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={18}>
              <Image src={newsInfo.image} className="max-h-[300px]" />
              <div className="mt-4 font-bold text-2xl">{newsInfo.title}</div>
              <div className="mt-4 text-base">{newsInfo.description}</div>
              <div className="spacey-4 mt-4">
                <Divider
                  orientation="left"
                  className="text-2xl text-orange-500 uppercase"
                  style={{ fontSize: "inherit", color: "inherit" }}
                >
                  Much Attentions From The Community
                </Divider>
                <List
                  pagination={true}
                  dataSource={relatedNews}
                  renderItem={(item) => <NewsDetail news={item} />}
                />
              </div>
            </Col>
            <Col xs={24} lg={6}></Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailPage