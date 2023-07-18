import { useCallback, useEffect, useState } from "react"
import newsPoster from "../../assets/images/coffee_banner_slide3.png"
import { Col, List, Row } from "antd"
import { NewsGeneral } from "../../components/news/general"
import { NewsDetail } from "../../components/news/detail"

const NewsPage = () => {
  const [hotNews, setHotNews] = useState([])
  const [news, setNews] = useState([])
  const getHotNews = useCallback(() => {
    const data = Array(3).fill(null).map(() => ({
      id: crypto.randomUUID(),
      title: "News title",
      image: newsPoster,
    }))

    setHotNews(data)
  }, [])

  const getListNews = useCallback(() => {
    // Logic handle data here
    // Below is random
    const data = Array(20).fill(null).map(() => ({
      id: crypto.randomUUID(),
      title: "News title",
      image: newsPoster,
      description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius quidem quibusdam tempore vitae dicta velit dolore perspiciatis doloribus, dolorem, libero quod nulla nam cumque, consequatur repellendus laudantium non omnis cum?",
      author: {
        name: "Admin",
      },
      created_at: new Date(new Date().getTime() - 1000 * 60 * 60 * 3) // 3 hour ago
    }))

    setNews(data)
  }, [])

  useEffect(() => {
    getHotNews()
    getListNews()
  }, [getHotNews, getListNews])

  return (
    <div className="productPage flex-1">
      <div className="productPage__main py-5">
        <div className="pageWrapper">
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={18}>
              <Row gutter={[24, 24]}>
                {
                  hotNews.map((news) => {
                    return (
                      <Col xs={8} key={news.id}>
                        <NewsGeneral newsInfo={news} />
                      </Col>
                    )
                  })
                }
              </Row>
              <div className="mt-4 md:mt-8 divide-y">
                <List
                  pagination={true}
                  dataSource={news}
                  renderItem={(item) => (
                    <NewsDetail news={item} />
                  )
                  }
                />
              </div>
            </Col>
            <Col xs={24} lg={6}></Col>
          </Row>
        </div>
      </div>
    </div>
  )
}

export default NewsPage