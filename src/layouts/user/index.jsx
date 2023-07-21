// Import library
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//Import propTypes
import { userInfoPropTypes } from '@/utils/propTypes';

//Import Slice
import { setUserInfo } from '@/redux/features/user/userSlice';
import { checkToken } from '@/redux/features/user/tokenSlice';

// Import function
import UserHeader  from '@/components/headers/user'
import UserFooter from '@/components/footers/users'


// // handle and export function component
export const AuthLayout = () => {
  return(
    <div className="flex flex-col min-h-screen">
      <UserHeader />
      <div className="flex-1 flex flex-col justify-center">
        <Outlet />
      </div>
      <UserFooter />
    </div>
  )
}

export const UserLayout = () => { 
  const dispatch = useDispatch()
  const userInfo = useSelector(state => state.user.userInfo)

  useEffect(() => {
    const exp = localStorage.getItem("access_token_user_exp")
    if(!exp) return
    const est =  parseInt(exp) - new Date().getTime()
    setTimeout(() => {
      // localStorage.removeItem("access_token_user")
      // localStorage.removeItem("access_token_user_exp")
      // dispatch(setUserInfo(null))
      localStorage.removeItem("access_token_user"),
      localStorage.removeItem("access_token_user_exp"),
      dispatch(setUserInfo(null)),
      dispatch(checkToken(false))  
    }, est)
  }, [dispatch])

  return(
    <div className="flex flex-col min-h-screen">
      <UserHeader userInfo={userInfo} />
      <div className="flex-1 flex flex-col justify-center">
        <Outlet context={{userInfo}} />
      </div>
      <UserFooter userInfo={userInfo} />
    </div>
  )
}

UserLayout.propTypes = userInfoPropTypes;
