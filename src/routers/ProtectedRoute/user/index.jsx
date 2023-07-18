//Import library
import { Navigate } from 'react-router-dom'

//Import name  ROUTES
import { ROUTES } from '@/config'

//Import PropType
import { protectedRouteUserPropType } from '@/utils/propTypes'

//Handle and export
const ProtectedRouteUser = ({user, children} ) => {
  if (!user) return <Navigate to= {ROUTES.HOME} replace /> 
  return children;
};

export default ProtectedRouteUser
ProtectedRouteUser.propTypes = protectedRouteUserPropType


