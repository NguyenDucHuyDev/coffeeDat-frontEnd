//Import Library
import { Spin } from "antd"
import { Fragment, Suspense } from "react"
import { Route } from "react-router-dom"

//Import function
import ProtectedRouteUser from "../../routers/ProtectedRoute/user"

//Handle and export
export const NestedRoute = (configPathRoutes) => {
  return(
    configPathRoutes.map(routes => {
      return (
        <Fragment key={routes.path}>
          <Route 
            path= {routes.path}
            element={ 
              ("protectedRoute" in routes
                ? (
                  <ProtectedRouteUser user={routes.protectedRoute} >
                    <Suspense fallback={<Spin tip="Loading" size="large"><div className="content"/></Spin>}>
                      <routes.element />
                    </Suspense>
                  </ProtectedRouteUser>
                )
                : (
                  <Suspense fallback={<Spin tip="Loading" size="large"><div className="content"/></Spin>}>
                    <routes.element />
                  </Suspense>
                )
              )
            }
          >
            {routes.children &&  NestedRoute(routes.children) }
          </Route>
        </Fragment>
      )
    })
  )
}