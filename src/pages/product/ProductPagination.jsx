//Import library
import { Dropdown, Form, Input, Pagination, Space, Spin } from "antd";
import { useState, memo, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

//Import name  ROUTES
import { ROUTES } from "@/config";
//Import api
import apiAxiosAuth from "@/utils/api/auth";

//Import function
import { VerticalProduct } from "@/components/product";
import { checkImageProduct } from "@/utils/checkImage";
import PageNotFound from "../error";
import { DownOutlined } from "@ant-design/icons";

//Handle and export
export const ProductPagination = memo(function PaginationProduct() {
  const items = [
    {
      label: (
        <button
          rel="noopener noreferrer"
          onClick={(e) => handleFilter(e, "asc")}
        >
          Sort by price ascending
        </button>
      ),
      key: "0",
      type: "asc",
    },
    {
      label: (
        <button
          rel="noopener noreferrer"
          onClick={(e) => handleFilter(e, "desc")}
        >
          Sort by price descending
        </button>
      ),
      key: "1",
      type: "desc",
    },
  ];
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [getAllProduct, setGetAllProduct] = useState(null);
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();

  const [status, setStatus] = useState("init");
  const [, ...pathArray] = pathname.split("/");
  const checkPaginationIndex = pathArray.includes("page");
  let paginationIndex = 1;

  if (checkPaginationIndex) {
    const lastArray = pathArray[pathArray.length - 1];
    if (lastArray != "page") paginationIndex = lastArray;
  }

  let urlApiAllProduct = "product/" + paginationIndex;
  if (pathArray[1] == "type")
    urlApiAllProduct =
      "product/get-product-by-category/" + pathArray[2] + "/" + paginationIndex;
  if (pathArray[1] == "search")
    urlApiAllProduct = "product/search/" + pathArray[2] + "/" + paginationIndex;
  const handlePageChange = (page) => {
    if (pathArray[1] == "type")
      return navigate("/product/type/" + pathArray[2] + "/page" + "/" + page);
    navigate("/product/page/" + page);
  };
  const handleFilter = (e, type) => {
    e.preventDefault();
    const sortedProducts = [...getAllProduct.products];
    if (type == "asc") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else {
      sortedProducts.sort((a, b) => b.price - a.price);
    }

    setGetAllProduct({ ...getAllProduct, products: sortedProducts });
  };
  const filterPrice = () => {
    const filteredProducts = getAllProduct.products.filter((item) => {
      return item.price >= minPrice && item.price <= maxPrice;
    });

    setGetAllProduct({ ...getAllProduct, products: filteredProducts });
  };

  useEffect(() => {
    setStatus("pending");
    apiAxiosAuth
      .get(urlApiAllProduct)
      .then((res) => {
        setGetAllProduct(res);
        setStatus("success");
      })
      .catch(() => {
        setStatus("fail");
      });
  }, [urlApiAllProduct]);

  return (
    <div className="flex-1 relative">
      {status == "pending" && (
        <div className="absolute top-2/4 left-2/4 -translate-x-full -translate-y-full">
          <Spin tip="Loading" size="large">
            <div className="content pl-10" />
          </Spin>
        </div>
      )}
      {status == "fail" && <PageNotFound />}
      {status == "success" && (
        <div className="mainView">
          <div className="mainView__main p-4">
            <div className="flex justify-between px-3 mb-6">
              <Form className="flex space-x-4" onFinish={filterPrice}>
                <Form.Item>
                  <Input
                    placeholder="Min price"
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                </Form.Item>
                <Form.Item>
                  <Input
                    placeholder="Max price"
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </Form.Item>
                <Form.Item>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    type="submit"
                  >
                    Filter
                  </button>
                </Form.Item>
              </Form>
              <Dropdown
                menu={{
                  items,
                }}
              >
                <button onClick={filterPrice}>
                  <Space>
                    Filter
                    <DownOutlined />
                  </Space>
                </button>
              </Dropdown>
            </div>

            <div className="flex items-stretch flex-wrap mb-6 max-w-screen-2xl mx-auto">
              {getAllProduct.products.map((item) => {
                return (
                  <Link
                    to={ROUTES.PRODUCT_DETAIL + "/" + item.slug}
                    key={item._id}
                    className="basis-1/4 px-2 mb-4 max-w-xs"
                  >
                    {VerticalProduct(
                      checkImageProduct(false),
                      item.name,
                      item.price,
                      "20"
                    )}
                  </Link>
                );
              })}
            </div>
            <div className="pb-6"></div>
            <div className="pagination absolute left-2/4 bottom-5 -translate-x-2/4">
              <Pagination
                size="large"
                showQuickJumper
                defaultCurrent={getAllProduct.pageCurrent}
                total={getAllProduct.totalProduct}
                defaultPageSize={getAllProduct.productsPerPage}
                className="w-max"
                onChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
