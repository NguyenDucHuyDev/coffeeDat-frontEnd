//Import Library
import { Routes } from 'react-router-dom'
import { Suspense, lazy, useEffect, useState } from 'react'

//Import function
import { NestedRoute } from '@/components/nestedRoute';

//Handle and export
const ContactUsRoutes = () =>{
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    setIsLoaded(false);
  }, []);

  const configPathRoutes = {
    contactUs: [
      {
        path: "/",
        element: lazy(() => import('@/pages/contact_us'))
      },
      {
        path: "success",
        element: lazy(() => import('@/pages/contact_us/SuccessfulContact'))
      }
    ]
  }
  return(
    <Suspense>
      <Routes>
        {!isLoaded && NestedRoute(configPathRoutes.contactUs)}
      </Routes>
    </Suspense>
  )
}

export default ContactUsRoutes
