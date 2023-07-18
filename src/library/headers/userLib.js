import { ROUTES } from "../../config";

export const userLibraryHeader = {
  placeholder_input:"Enter search product",
  btn_login: "Login",
  btn_register: "Register",
  infoDropdown: [
    {
      label: "Profile",
      url: ROUTES.PROFILE
    },
    {
      label: "Order Management",
      url: ROUTES.CART 
    },
    {
      label: "Logout",
      url: ROUTES.HOME
    },
  ],
  nav: [
    {
      label: "HOME",
      url: ROUTES.HOME
    },
    {
      label: "PRODUCT",
      url: ROUTES.PRODUCT
    },
    {
      label: "QUICK ORDER",
      url: ROUTES.QUICK_ORDER
    },
    {
      label: "NEWS",
      url: ROUTES.NEWS
    },
    {
      label: "CONTACT US",
      url: ROUTES.CONTACT_US
    },
    {
      label: "ABOUT US",
      url:ROUTES.ABOUT_US
    }
  ]

}