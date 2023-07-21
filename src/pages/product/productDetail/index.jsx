import {Image, Spin, Typography } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import {
//   MinusOutlined,
//   PlusOutlined,
//   ShoppingCartOutlined,
// } from "@ant-design/icons";
// import { Comment } from "@/components/comment/rate";
// import { formatCurrency } from "@/config/common.currency";
// import { ProductRate } from "@/components/product/Rate";

//Import api
import apiAxiosAuth from '@/utils/api/auth'

//Import function
import PageNotFound from "@/pages/error";
import { checkImageProductDetail } from "@/utils/checkImage";

const ProductDetail = () => {
  const {detailSlug} = useParams()

  const [productInfo, setProductInfo] = useState(null);
  // const [quality, setQuality] = useState(1);
  // const { productSlug } = useParams();
  // const [grindModes, setGrindModes] = useState([]);
  // const [gramWeights, setGramWeights] = useState([]);
  // const [currentTab, setCurrentTab] = useState("rate_comment");
  // const [rates, setRates] = useState([]);
  // const [ratedProducts, setRatedProducts] = useState([]);

  // const mappingSelectValue = useCallback((data) => {
  //   return data.map((item) => ({
  //     value: item.id,
  //     label: item.name,
  //   }));
  // }, []);


  // const getRate = (productSlug) => {
  //   // Logic handling rate and comment here
  //   // Random is below
  //   const data = Array(20)
  //     .fill(null)
  //     .map(() => {
  //       return {
  //         user: {
  //           name: "Nguyen Duc Huy",
  //         },
  //         rate: {
  //           rate: 5,
  //           message: "Good product",
  //         },
  //       };
  //     });
  //   setRates(data);
  // };

  // const getRatedProducts = (productSlug) => {
  //   // Logic handling data here
  //   // Random data below
  //   const data = Array(10)
  //     .fill(null)
  //     .map(() => {
  //       return {
  //         id: 10,
  //         image: productImage,
  //         rate: {
  //           rate: 5,
  //           message: "",
  //         },
  //         price: 20_000,
  //         name: "Product name",
  //       };
  //     });
  //   setRatedProducts(data);
  // };

  // const priceEst = useMemo(() => {
  //   let price = 0;
  //   const _price = productInfo.price * quanlity;
  //   if (_price > 0) price = _price;
  //   return price;
  // }, [productInfo.price, quanlity]);

  // const handleSetQuanlity = (quanlity) => {
  //   if (quanlity <= 0) return;
  //   setQuanlity(quanlity);
  // };

  const [ellipsis, setEllipsis] = useState(true);

  useEffect(() => {
    apiAxiosAuth.get("product/get-product-detail/"+detailSlug)
      .then(res =>{
        setProductInfo(res)
      }).catch(()=>{
        setProductInfo("PageNotFound")
      })
  }, [detailSlug]); 

  return (
    <div className="productPage flex-1">
      <div className="productPage__main py-5">
        <div className="pageWrapper">
          {
            !productInfo
            && <Spin size="large"><div className="content" /></Spin>
          }
          { productInfo == "PageNotFound" 
            && <PageNotFound />
          }
          { productInfo
            && 
            <div className="flex h-64 gap-5">
              <div className="flex-1">
                <Image 
                  src={checkImageProductDetail(productInfo.product.image[0])}
                  // style={{height:"16rem", minWidth:"24.75rem"}}
                  className="object-cover rounded-md"
                />
              </div>
              <div className="flex-1 flex-col flex gap-3">
                <Typography.Paragraph 
                  className="font-medium text-xl"
                  ellipsis={
                    ellipsis
                      ? {
                        rows: 2,
                      }
                      : false
                  }
                  style={{margin:"0"}}
                >
                  {productInfo.product.name}
                </Typography.Paragraph>
                <Typography.Paragraph 
                  className="text-md"
                  ellipsis={
                    ellipsis
                      ? {
                        rows: 2,
                      }
                      : false
                  }
                  style={{margin:"0"}}
                >
                  {productInfo.product.description}
                </Typography.Paragraph>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default ProductDetail
