//Import Library
import { Suspense, lazy, useEffect, useState } from "react";
import { Routes } from "react-router-dom";

//Import function
import { NestedRoute } from '@/components/nestedRoute';

const NewsRoutes = () => {
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    setIsLoaded(false);
  }, []);

  const configPathRoutes = {
    news: [
      {
        path: "/",
        element: lazy(() => import('@/pages/news'))
      },
      {
        path: ":detailSlug",
        element: lazy(() => import('@/pages/news/newsDetails'))
      },
    ]
  }

  return(
    <Suspense>
      <Routes>
        {!isLoaded && NestedRoute(configPathRoutes.news)}
      </Routes>
    </Suspense>
  )
}

export default NewsRoutes