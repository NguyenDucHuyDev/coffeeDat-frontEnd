import { Button, Col, Row, Select, Image, Radio, List } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  MinusOutlined,
  PlusOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import productImage from "@/assets/images/coffee_banner_slide1.png";
import { Comment } from "@/components/comment/rate";
import { formatCurrency } from "@/config/common.currency";
import { ProductRate } from "@/components/product/Rate";

const ProductDetail = () => {
  const [productInfo, setProductInfo] = useState({});
  const [quanlity, setQuanlity] = useState(1);
  const { productSlug } = useParams();
  const [grindModes, setGrindModes] = useState([]);
  const [gramWeights, setGramWeights] = useState([]);
  const [currentTab, setCurrentTab] = useState("rate_comment");
  const [rates, setRates] = useState([]);
  const [ratedProducts, setRatedProducts] = useState([]);

  const mappingSelectValue = useCallback((data) => {
    return data.map((item) => ({
      value: item.id,
      label: item.name,
    }));
  }, []);

  const getProductInfo = useCallback(async (productSlug) => {
    // Logic handling fetch info product here
    const data = {
      id: 1,
      name: "Test",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga numquam delectus ipsa quo inventore minima nam eveniet ut sequi, in, officia vitae sapiente molestias. Expedita maxime aut voluptate officiis porro.",
      sold: 20,
      image: productImage,
      grind_modes: [
        {
          id: 1,
          name: "ABC",
        },
        {
          id: 2,
          name: "XYZ",
        },
      ],
      gram_weights: [
        {
          id: 1,
          name: "ABC",
        },
        {
          id: 2,
          name: "XYZ",
        },
      ],
      price: 200_000,
    };
    setProductInfo(data);
    setGrindModes(mappingSelectValue(data.grind_modes));
    setGramWeights(mappingSelectValue(data.gram_weights));
  }, []);

  const getRate = (productSlug) => {
    // Logic handling rate and comment here
    // Random is below
    const data = Array(20)
      .fill(null)
      .map(() => {
        return {
          user: {
            name: "Nguyen Duc Huy",
          },
          rate: {
            rate: 5,
            message: "Good product",
          },
        };
      });
    setRates(data);
  };

  const getRatedProducts = (productSlug) => {
    // Logic handling data here
    // Random data below
    const data = Array(10)
      .fill(null)
      .map(() => {
        return {
          id: 10,
          image: productImage,
          rate: {
            rate: 5,
            message: "",
          },
          price: 20_000,
          name: "Product name",
        };
      });
    setRatedProducts(data);
  };

  const priceEst = useMemo(() => {
    let price = 0;
    const _price = productInfo.price * quanlity;
    if (_price > 0) price = _price;
    return price;
  }, [productInfo.price, quanlity]);

  const handleSetQuanlity = (quanlity) => {
    if (quanlity <= 0) return;
    setQuanlity(quanlity);
  };

  useEffect(() => {
    getProductInfo(productSlug);
    getRate(productSlug);
    getRatedProducts(productSlug);
  }, [productSlug, getProductInfo]); // Watch the product slug has been change then refresh info product

  return (
    <div className="productPage flex-1">
      <div className="productPage__main py-5">
        <div className="pageWrapper">
          <Row gutter={[24, 24]}>
            <Col md={24} lg={12}>
              <Image
                className="h-auto !lg:h-[400px] object-cover bg-center mx-auto"
                src={productInfo.image}
              />
            </Col>
            <Col md={24} lg={12}>
              <div className="space-y-4">
                <div className="text-2xl font-bold">{productInfo.name}</div>
                <div>
                  <span className="font-bold mr-2">Product Description:</span>
                  <span>{productInfo.name}</span>
                </div>
                <div>
                  <span className="font-bold mr-2">Product Sold:</span>
                  <span>{productInfo.sold}</span>
                </div>
                <div>
                  <span className="font-bold mr-4">Grind Mode:</span>
                  <Select
                    options={grindModes}
                    placeholder="Choose the option"
                    className="max-w-full w-44"
                  />
                </div>
                <div>
                  <span className="font-bold mr-4">Gram weight:</span>
                  <Select
                    options={gramWeights}
                    placeholder="Choose the option"
                    className="max-w-full w-44"
                  />
                </div>
                <div className="font-bold">
                  <span className="mr-2">Price:</span>
                  <span>{formatCurrency(priceEst)}</span>
                </div>
                <div className="flex gap-x-2 md:gap-x-12">
                  <div className="flex border p-2 gap-x-4 items-center border-black">
                    <MinusOutlined
                      onClick={() => handleSetQuanlity(quanlity - 1)}
                    />
                    <span>{quanlity}</span>
                    <PlusOutlined
                      onClick={() => handleSetQuanlity(quanlity + 1)}
                    />
                  </div>
                  <Button
                    size="large"
                    className="bg-[#F9C06A]"
                    type="ghost"
                    icon={<ShoppingCartOutlined />}
                  >
                    Add to cart
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
          <div className="my-4">
            <Radio.Group
              buttonStyle="solid"
              className="flex"
              size="large"
              onChange={({ target: { value } }) => setCurrentTab(value)}
              optionType="button"
              value={currentTab}
            >
              <Radio.Button
                className="text-ellipsis overflow-hidden whitespace-nowrap"
                value="rate_comment"
              >
                Rate And Comment
              </Radio.Button>
              <Radio.Button
                className="text-ellipsis overflow-hidden whitespace-nowrap"
                value="information"
              >
                Other Information
              </Radio.Button>
            </Radio.Group>
          </div>
          <div className="bg-[#f6f6f6]">
            {currentTab === "rate_comment" ? (
              <List
                className="overflow-auto max-h-[400px]"
                itemLayout="vertical"
                size="large"
                pagination={{
                  onChange: (page) => {
                    console.log(page);
                  },
                  pageSize: 10,
                  align: "center",
                }}
                dataSource={rates}
                renderItem={(item, index) => {
                  return (
                    <List.Item key={index}>
                      <Comment user={item.user} rate={item.rate} />
                    </List.Item>
                  );
                }}
              ></List>
            ) : (
              <></>
            )}
          </div>
          <div className="mt-4 lg:mt-8">
            <Row gutter={[24, 24]}>
              <Col xs={24} lg={18}>
                <div className="uppercase font-bold text-xl">
                  Selling products
                </div>
                {/* Product list here */}
              </Col>
              <Col xs={24} lg={6}>
                <div className="bg-[#f6f6f6] p-2 space-y-2">
                  <div className="uppercase font-semibold text-lg">
                    Top rated products
                  </div>
                  <List
                    itemLayout="vertical"
                    size="large"
                    dataSource={ratedProducts}
                    renderItem={(item, index) => {
                      return (
                        <List.Item key={index}>
                          <ProductRate product={item} />
                        </List.Item>
                      );
                    }}
                  ></List>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail
