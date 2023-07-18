//import library
import { memo, useEffect, useRef, useState } from 'react'

export const TotalHeaderHeight = memo(function TotalHeaderHeight() {
  const headerElementRef = useRef(null);

  const [totalHeight, setTotalHeight] = useState(0);  

  useEffect(() => {
    headerElementRef.current = document.getElementById("header");
  }, []);

  useEffect(() => {
    if (headerElementRef.current) {
      const heightHeader = headerElementRef.current.clientHeight;
      setTotalHeight(heightHeader + "px");
    }
  }, []);
    
  return <div style={{ marginTop: totalHeight }}></div>

});