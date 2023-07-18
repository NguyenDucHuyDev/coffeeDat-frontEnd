import { Avatar, Col, Rate, Row } from "antd";
import { commentRatePropType } from "../../utils/propTypes";

export const Comment = ({ user, rate }) => {
  return (
    <>
      <Row gutter={[24, 24]} align="middle">
        <Col>
          <Avatar>{user.name}</Avatar>
        </Col>
        <Col>
          <div className="flex flex-wrap items-center gap-x-4">
            <div className="font-bold">{user.name}</div>
            <div>
              <Rate allowClear defaultValue={rate.rate} />
            </div>
          </div>
          <div>
            <span className="mr-2">Comment:</span>
            <span>{rate.message}</span>
          </div>
        </Col>
      </Row>
    </>
  );
};

Comment.propTypes = commentRatePropType;
