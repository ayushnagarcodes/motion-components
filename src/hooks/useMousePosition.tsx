import { useEffect, useState } from "react";

function useMousePosition(
  containerRef: React.RefObject<HTMLDivElement | null>
) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const element = containerRef.current;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition(
        element ? { x: e.layerX, y: e.layerY } : { x: e.clientX, y: e.clientY }
      );
    };

    if (element) {
      element.addEventListener("mousemove", updateMousePosition);
    } else {
      window.addEventListener("mousemove", updateMousePosition);
    }

    return () => {
      if (element) {
        element.removeEventListener("mousemove", updateMousePosition);
      } else {
        window.removeEventListener("mousemove", updateMousePosition);
      }
    };
  }, [containerRef]);

  return mousePosition;
}

export default useMousePosition;
