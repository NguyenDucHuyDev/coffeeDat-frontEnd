//import library
import {
  Avatar,
  Col,
  Drawer,
  Dropdown,
  Form,
  Input,
  Menu,
  Row,
  Skeleton,
} from "antd";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";

//import name router
import { ROUTES } from "@/config";

//import library
import { userLibraryHeader } from "@/library/headers/userLib";

//import Slice redux
import { setUserInfo } from "@/redux/features/user/userSlice";

//import function
import { BtnYellow } from "../../button";
import { checkAvatarUser } from "@/utils/checkImage";
import { userInfoPropTypes } from "@/utils/propTypes";
import { Cart } from "../../cart";

//import image
import img_logo from "@/assets/images/logo.png";
import img_navBar from "@/assets/images/navbar.png";
import img_iconSearch from "@/assets/images/icons8-search.png";
import img_iconArrowDow from "@/assets/images/arrow-down.png";

const UserHeader = ({ userInfo }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDropdown = (label, url) => {
    if (label === "Logout")
      localStorage.removeItem("access_token_user"), dispatch(setUserInfo(null));
    navigate(url);
  };

  // items Dropdown
  const items = userLibraryHeader.infoDropdown.map((item) => {
    return {
      key: item.url,
      label: (
        <div
          onClick={() => {
            handleDropdown(item.label, item.url);
          }}
          className="p-1"
        >
          <span>{item.label}</span>
        </div>
      ),
    };
  });

  const itemsNav = userLibraryHeader.nav.map((item) => {
    return {
      key: item.url,
      label: (
        <NavLink
          to={item.url}
          className={({ isActive }) =>
            isActive ? "md:bg-[#F9C06A] md:block" : ""
          }
        >
          <span className="px-3 text-black">{item.label}</span>
        </NavLink>
      ),
    };
  });

  //openModal on mobile
  const [openModalMobile, setOpenModalMobile] = useState(false);
  const [size, setSize] = useState();
  const [searchValue, setSearchValue] = useState("");
  const handleSearch = () => {
    navigate(`/product/search/${searchValue}`);
  };

  const showDrawer = () => {
    setSize("large");
    setOpenModalMobile(true);
  };

  const onCloseModalMobile = () => setOpenModalMobile(false);

  return (
    <div
      className="header sticky top-0 z-50 bg-white md:shadow-none"
      id="header"
    >
      <div className="header_main">
        <Row
          className="pageWrapper justify-between md:justify-start items-center"
          id="header_main"
        >
          <Col span={6}>
            <img src={img_logo} alt="" width={96} />
          </Col>
          <Col span={8} className="md:block hidden translate-y-1/4">
            <Form onFinish={handleSearch}>
              <Form.Item>
                <Input
                  placeholder={userLibraryHeader.placeholder_input}
                  className="py-2 rounded relative"
                  suffix={
                    <div className="absolute w-6 top-2/4 -translate-y-2/4 right-0 -translate-x-2/4">
                      <img
                        src={img_iconSearch}
                        className="opacity-50 cursor-pointer"
                        onClick={handleSearch}
                      />
                    </div>
                  }
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </Form.Item>
            </Form>
          </Col>

          <Col span={4} className="flex justify-center items-center">
            {userInfo === null && <Skeleton.Avatar active />}
            {userInfo && <Link to={ROUTES.CART}>{Cart()}</Link>}
          </Col>

          <Col span={6} className="flex justify-end">
            <Row className="gap-3 hidden md:flex w-max ml-auto md:flex-nowrap">
              {userInfo === undefined && (
                <>
                  <Link to={ROUTES.LOGIN} className="hover:text-black">
                    {BtnYellow(userLibraryHeader.btn_login)}
                  </Link>
                  <Link to={ROUTES.REGISTER} className="hover:text-black">
                    {BtnYellow(userLibraryHeader.btn_register)}
                  </Link>
                </>
              )}
              {userInfo === null && (
                <Skeleton
                  className="flex items-center"
                  avatar
                  paragraph={{ rows: 0 }}
                  active
                  style={{ width: "200px" }}
                />
              )}
              {userInfo && (
                <Dropdown menu={{ items }} placement="bottomLeft">
                  <div className="flex items-center gap-3 cursor-pointer">
                    <Avatar
                      src={checkAvatarUser(userInfo?.avatar)}
                      size="large"
                    />
                    <div className="flex gap-1 items-center">
                      <span>{userInfo.name}</span>
                      <img src={img_iconArrowDow} alt="" className="w-2 h-2" />
                    </div>
                  </div>
                </Dropdown>
              )}
            </Row>
            <Row justify="end" className="block md:hidden">
              <div
                className="flex justify-end cursor-pointer"
                onClick={showDrawer}
              >
                <img src={img_navBar} />
              </div>
              <Drawer
                title={
                  <div className="inline-block ml-5">
                    {userInfo === undefined && (
                      <div className="flex gap-3 items-center">
                        <Link to={ROUTES.LOGIN} className="hover:text-black">
                          {BtnYellow(userLibraryHeader.btn_login)}
                        </Link>
                        <Link to={ROUTES.REGISTER} className="hover:text-black">
                          {BtnYellow(userLibraryHeader.btn_register)}
                        </Link>
                      </div>
                    )}
                    {userInfo === null && (
                      <Skeleton
                        className="w-2/4 flex items-center"
                        avatar
                        paragraph={{ rows: 1 }}
                        active
                        width={200}
                      />
                    )}
                    {userInfo && (
                      <Dropdown menu={{ items }} placement="bottomLeft">
                        <div className="flex items-center gap-3 cursor-pointer justify-end">
                          <Avatar
                            src={checkAvatarUser(userInfo?.avatar)}
                            size="large"
                          />
                          <div className="flex gap-2 items-center">
                            <span>{userInfo.name}</span>
                            <img
                              src={img_iconArrowDow}
                              alt=""
                              className="w-2 h-2"
                            />
                          </div>
                        </div>
                      </Dropdown>
                    )}
                  </div>
                }
                placement="right"
                size={size}
                onClose={onCloseModalMobile}
                open={openModalMobile}
              >
                <Menu
                  mode="vertical"
                  items={itemsNav}
                  className="navHeader_mobile"
                />
              </Drawer>
            </Row>
          </Col>
        </Row>

        <div className="bg-[#f6f6f6] hidden md:block" id="userInfoHeader">
          <div
            className="pageWrapper"
            style={{ paddingLeft: 0, paddingRight: 0 }}
          >
            <Menu
              mode="horizontal"
              items={itemsNav}
              className="bg-[#f6f6f6] border-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserHeader;
UserHeader.propTypes = userInfoPropTypes;
