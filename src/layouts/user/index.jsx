// //import library
import { Outlet } from 'react-router-dom'

// //import function component
import UserHeader  from '../../components/headers/user'
import UserFooter from '../../components/footers/users'
import { userInfoPropTypes } from '../../utils/propTypes';

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

export const UserLayout = (props) => {  
  const { userInfo } = props 

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
