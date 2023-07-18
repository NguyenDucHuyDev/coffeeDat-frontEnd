//Import library
import { Suspense, lazy, useEffect, useState } from 'react';
import { Routes } from 'react-router-dom'

//Import function
import { NestedRoute } from '@/components/nestedRoute';

//Handle and export
const ProductDetailRoutes = () =>{
  const [isLoaded, setIsLoaded] = useState(true);
  useEffect(() => {
    setIsLoaded(false);
  }, []);

  const configPathRoutes = {
    productDetail: [
      {
        path: ":detailSlug",
        element: lazy(() => import('@/pages/product/productDetail'))
      },
    ]
  }

  return(
    <Suspense>
      <Routes>
        {!isLoaded && NestedRoute(configPathRoutes.productDetail)}
      </Routes>
    </Suspense>
  )
}

export default ProductDetailRoutes