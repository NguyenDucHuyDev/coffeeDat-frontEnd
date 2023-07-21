//Import library
import { Route, Routes } from 'react-router-dom';
import { lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Import layouts
import { AuthLayout, UserLayout } from '../layouts/user';

// Import api
import apiAxiosUser from '@/utils/api/user';

// Import Redux slice
import { setUserInfo } from "@/redux/features/user/userSlice";

// Import name routes
import { ROUTES } from "@/config";

//Import function
import { NestedRoute } from '@/components/nestedRoute';

// Handle and export
const RootRouter = () => {
  const checkToken = localStorage.getItem("access_token_user")
  const dispatch = useDispatch()

  const userToken = useSelector(state => state.token.checkToken) 
  useEffect(()=>{},[userToken])

  useEffect(() => {
    if(checkToken) apiAxiosUser.get("is-auth").then(res => dispatch(setUserInfo(res.user)))
  },[dispatch, checkToken])


  const configPathRoutes = {
    user: [
      {
        path: ROUTES.HOME,
        element: lazy(() => import('@/pages/home'))
      },
      {
        path: ROUTES.LOGIN,
        protectedRoute: !checkToken,
        element: lazy(() => import('@/pages/login'))
      },
      {
        path:ROUTES.REGISTER,
        protectedRoute: !checkToken,
        element: lazy(() => import('@/pages/register'))
      },
      {
        path:ROUTES.RETRIEVE_PASSWORD + "/*",
        protectedRoute: !checkToken,
        element: lazy(() => import('./RetrievePasswordRoutes'))
      },
      {
        path:ROUTES.CONTACT_US + "/*",
        element: lazy(() => import('./ContactUsRoutes'))
      },
      {
        path:ROUTES.QUICK_ORDER,
        element: lazy(() => import('@/pages/home'))
      },
      {
        path:ROUTES.NEWS + "/*",
        element: lazy(() => import('./NewsRoutes'))
      },
      {
        path:ROUTES.VERIFY_EMAIL,
        element: lazy(() => import('@/pages/verifyEmail'))
      },
      {
        path:ROUTES.ABOUT_US,
        element: lazy(() => import('@/pages/about_us'))
      },
      {
        path:ROUTES.PRODUCT + "/*",
        element: lazy(() => import('./ProductRoutes'))
      },
      {
        path:ROUTES.PRODUCT_DETAIL + "/*",
        element: lazy(() => import('./ProductRoutes/ProductDetailRoutes'))
      },
      {
        path:ROUTES.CART,
        element: lazy(() => import('@/pages/cart'))
      },
      {
        path:ROUTES.PROFILE,
        protectedRoute: checkToken,
        element: lazy(() => import('@/pages/profile'))
      },
      {
        path:"*",
        element: lazy(() => import('@/pages/error'))
      },
    ]
  }

  return(
    <Routes>
      <Route element={checkToken ? <UserLayout /> : <AuthLayout />}>
        {NestedRoute(configPathRoutes.user)} 
      </Route>
    </Routes>
  )
}

export default RootRouter

