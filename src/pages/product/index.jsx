//Import function
import { TotalHeaderHeight } from "@/components/headers/TotalHeaderHeight";
import { ProductPagination } from "./ProductPagination";
import { ProductMenu } from "./ProductMenu";

//Handle and export
const ProductPage = () => {
  return (
    <div className="productPage flex-1 absolute inset-0">
      <div className="productPage__main ">
        <div className="mainView">
          <div className="flex flex-col fixed top-0 bottom-0 left-0 w-80">
            <TotalHeaderHeight />
            <ProductMenu />
          </div>
          <div className="min-h-screen flex">
            <div className="w-80"></div>
            <div className="flex flex-col bg-[#FFFEFC] flex-1">
              <TotalHeaderHeight />
              <ProductPagination />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
