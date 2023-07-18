import { Col, Image, Row, Typography } from "antd";
import { newsDetailPropType } from "../../utils/propTypes";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export const NewsDetail = ({ news }) => {
  return (
    <Row gutter={[12, 12]} className="py-4">
      <Col xs={24} lg={5}>
        <Image src={news.image} className="!h-32 object-cover bg-center" />
      </Col>
      <Col xs={24} lg={19}>
        <div className="space-y-2">
          <div className="font-bold text-lg">{news.title}</div>
          <div className="flex gap-x-4 items-center">
            <div>{news.author.name}</div>
            <div className="first-letter:uppercase">
              {dayjs().from(news.created_at)}
            </div>
          </div>
          <Typography.Paragraph ellipsis={{ rows: 3 }}>
            {news.description}
          </Typography.Paragraph>
        </div>
      </Col>
    </Row>
  );
};

NewsDetail.propTypes = newsDetailPropType;
