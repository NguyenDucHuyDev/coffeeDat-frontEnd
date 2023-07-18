//Import Image
import { Link } from "react-router-dom";
import img_notPage from "../../assets/images/image_404.png";
import { ROUTES } from "@/config";

const PageNotFound = () => {
  return (
    <div className="PageNotFound flex-1">
      <div className="PageNotFound min-h-[43rem] flex flex-col justify-center">
        <div className="error-page__main flex justify-center flex-col items-center h-full">
          <img src={img_notPage} alt="" className="w-80" />
          <span className="font-medium text-xl mb-5">Sorry! The page you’re looking for cannot be found!</span>
          <Link to={ROUTES.HOME} className="text-[#F9C06A] text-md">Go to Homepage</Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
