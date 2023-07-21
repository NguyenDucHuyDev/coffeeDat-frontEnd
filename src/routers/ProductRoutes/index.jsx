//Import library
import { Suspense, lazy, useEffect, useState } from 'react';
import { Routes } from 'react-router-dom'

//import function
import { NestedRoute } from '@/components/nestedRoute';

const ProductRoutes = () => {
  const [isLoaded, setIsLoaded] = useState(true);
  useEffect(() => {
    setIsLoaded(false);
  }, []);
  
  const configPathRoutes = {
    product: [
      {
        path: "/",
        element: lazy(() => import('@/pages/product'))
      },
      {
        path: "page",
        element: lazy(() => import('@/pages/product')),
        children:[
          {
            path:":paginationId",
            element: lazy(() => import('@/pages/product'))
          }
        ]
      },
      {
        path: "type",
        element: lazy(() => import('@/pages/product')),
        children: [
          {
            path: ":typeSlug",
            element: lazy(() => import('@/pages/product')),
            children:[
              {
                path:":page",
                element: lazy(() => import('@/pages/product')),
                children:[
                  {
                    path:":paginationId",
                    element: lazy(() => import('@/pages/product'))
                  },
                ],
              },
            ]
          },
        ]
      },
      // {
      //   path: "*",
      //   element: lazy(() => import('@/pages/error'))
      // }
    ]
  }

  return(
    <Suspense>
      <Routes>
        {!isLoaded && NestedRoute(configPathRoutes.product)}
      </Routes>
    </Suspense>
  )
}

export default ProductRoutes