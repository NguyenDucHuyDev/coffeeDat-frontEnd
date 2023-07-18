import { Col, Rate, Row } from "antd";
import { productRatePropType } from "../../utils/propTypes";
import { formatCurrency } from "../../config/common.currency";

export const ProductRate = ({ product }) => {
  return (
    <Row gutter={[12, 12]} wrap={false}>
      <Col>
        <img className="h-full object-cover" src={product.image} />
      </Col>
      <Col>
        <div>
          <div className="text-lg font-bold">{product.name}</div>
          <Rate value={product.rate.rate} className="flex" />
          <div className="">
            <span className="mr-2">Price</span>
            <span>{formatCurrency(product.price)}</span>
          </div>
        </div>
      </Col>
    </Row>
  );
};

ProductRate.propTypes = productRatePropType;
