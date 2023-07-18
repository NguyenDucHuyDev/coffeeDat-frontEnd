//Import library
import { Pagination, Spin } from "antd";
import { useState, memo, useEffect  } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

//Import word
import { productLib } from '@/library/productPage/productLib'

//Import name  ROUTES
import { ROUTES } from '@/config' 

//Import image
import img_arrowDown from '@/assets/images/arrow-down.png'

//Import api
import apiAxiosAuth from '@/utils/api/auth'

//Import function
import { VerticalProduct } from '@/components/product'
import { checkImageProduct } from '@/utils/checkImage'
import PageNotFound from "../error";

//Handle and export
export const ProductPagination = memo(function PaginationProduct(){

  const {pathname} = useLocation()
  const navigate = useNavigate()
  const [getAllProduct, setGetAllProduct] = useState(null)

  const [status, setStatus] = useState("init")
  const [,...pathArray] = pathname.split("/");
  const checkPaginationIndex = pathArray.includes("page")
  let paginationIndex = 1

  if(checkPaginationIndex){
    const lastArray = pathArray[pathArray.length - 1 ]
    if(lastArray != "page") paginationIndex = lastArray
  }

  let urlApiAllProduct = "product/" + paginationIndex
  if(pathArray[1] == "type") urlApiAllProduct = "product/get-product-by-category/" + pathArray[2] + "/" + paginationIndex
  
  const handlePageChange = (page) => {
    if(pathArray[1] == "type") return navigate("/product/type/" + pathArray[2] + "/page" + "/" + page )
    navigate("/product/page/" + page )
  }

  useEffect(() =>{
    setStatus("pending")
    apiAxiosAuth.get(urlApiAllProduct)
      .then(res => {
        setGetAllProduct(res)
        setStatus("success")
      }).catch(()=>{
        setStatus("fail")
      })
  },[urlApiAllProduct])

  return (
    <div className="flex-1 relative">
      {status == "pending" 
      &&
      <div className="absolute top-2/4 left-2/4 -translate-x-full -translate-y-full">
        <Spin tip="Loading" size="large">
          <div className="content pl-10" />
        </Spin>
      </div>
      }
      {status == "fail" 
      &&
      <PageNotFound />
      }
      {status == "success"
      && 
      <div className="mainView">
        <div className="mainView__main p-4">
          <div className="flex justify-end px-3 mb-6">
            <div className="bg-[#f6f6f6] cursor-pointer flex items-center gap-3 p-3">
              <span>{productLib.filters_price}</span>
              <img src={img_arrowDown} alt="" className="w-4 h-3" />
            </div>
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
      }
    </div>
  );
});
