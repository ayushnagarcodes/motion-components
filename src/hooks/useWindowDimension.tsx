import { useEffect, useState } from "react";

function useWindowDimension() {
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const resize = () => {
      setDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    resize();
    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, []);

  return dimension;
}

export default useWindowDimension;
