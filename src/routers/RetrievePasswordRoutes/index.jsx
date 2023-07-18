//Import Library
import { Routes } from 'react-router-dom'
import { Suspense, lazy, useEffect, useState } from 'react';

//Import function
import { NestedRoute } from '@/components/nestedRoute';

//Handle and export
const RetrievePasswordRoutes = () => {
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    setIsLoaded(false);
  }, []);

  const configPathRoutes = {
    retrievePassword: [
      {
        path: "/",
        element: lazy(() => import('@/pages/retrieve_password'))
      },
      {
        path: ":detailSlug",
        element: lazy(() => import('@/pages/retrieve_password/AuthSlug'))
      },
    ]
  }

  return(
    <Suspense>
      <Routes>
        {!isLoaded && NestedRoute(configPathRoutes.retrievePassword)}
      </Routes>
    </Suspense>
  )
}

export default RetrievePasswordRoutes