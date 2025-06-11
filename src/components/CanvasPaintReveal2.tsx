import { useCallback, useEffect, useRef, useState } from "react";
import useWindowDimension from "../hooks/useWindowDimension";
import { lerp } from "../utils/utils";

function CanvasPaintReveal2() {
  const dimension = useWindowDimension();
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const brushImage = useRef<HTMLImageElement | null>(null);
  const prevPosition = useRef<{ x: number; y: number } | null>(null);
  const isDrawing = useRef(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const totalPixels = useRef(0);

  // Load brush image
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      brushImage.current = img;
    };
    img.src = "/assets/masks/brush-texture.png";
  }, []);

  const init = useCallback(() => {
    if (!canvas.current) return;
    const context = canvas.current.getContext("2d");
    if (!context) return;

    context.fillStyle = "#d6478a";
    context.fillRect(0, 0, dimension.width, dimension.height);
    context.globalCompositeOperation = "destination-out";

    const canvasWidth =
      dimension.width < 768 ? dimension.width : dimension.width / 2;
    totalPixels.current = canvasWidth * dimension.height;
    setIsRevealed(false);
  }, [dimension]);

  const drawBrush = useCallback(
    (x: number, y: number, scale: number = 1) => {
      if (!canvas.current || isRevealed || !brushImage.current) return;
      const context = canvas.current.getContext("2d");
      if (!context) return;

      context.save();

      // Just translate and scale - no rotation
      context.translate(x, y);
      context.scale(scale, scale);

      // Draw the brush image at the current position
      context.drawImage(
        brushImage.current,
        -brushImage.current.width / 2,
        -brushImage.current.height / 2
      );

      context.restore();
    },
    [isRevealed]
  );

  const drawBrushLine = useCallback(
    (
      startX: number,
      startY: number,
      endX: number,
      endY: number,
      speed: number
    ) => {
      if (!canvas.current || isRevealed) return;

      const distance = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
      const steps = Math.max(1, Math.floor(distance / 3));

      // Scale based on speed
      // const scale = Math.max(0.8, Math.min(1.5, 1.2 - speed / 200));

      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const x = lerp(startX, endX, t);
        const y = lerp(startY, endY, t);

        // Draw brush at interpolated position without rotation
        drawBrush(x, y);
      }
    },
    [drawBrush, isRevealed]
  );

  const checkErasedPercentage = useCallback(() => {
    if (!canvas.current || isRevealed) return;

    const context = canvas.current.getContext("2d");
    if (!context) return;

    const imageData = context.getImageData(
      0,
      0,
      canvas.current.width,
      canvas.current.height
    );
    const data = imageData.data;

    let transparentPixels = 0;

    for (let i = 3; i < data.length; i += 4) {
      if (data[i] === 0) {
        transparentPixels++;
      }
    }

    const erasedPercentage = (transparentPixels / totalPixels.current) * 100;

    if (erasedPercentage > 50) {
      setIsRevealed(true);
    }
  }, [isRevealed]);

  const manageMouseMove = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
      if (isRevealed) return;

      const rect = canvas.current?.getBoundingClientRect();
      if (!rect) return;

      const currentX = event.clientX - rect.left;
      const currentY = event.clientY - rect.top;
      const speed = Math.max(
        Math.abs(event.movementX),
        Math.abs(event.movementY)
      );

      if (prevPosition.current !== null) {
        drawBrushLine(
          prevPosition.current.x,
          prevPosition.current.y,
          currentX,
          currentY,
          speed
        );
      } else {
        drawBrush(currentX, currentY);
      }

      prevPosition.current = { x: currentX, y: currentY };
    },
    [drawBrushLine, drawBrush, isRevealed]
  );

  // Handlers for touch events
  const getTouchEventCoordinates = useCallback(
    (event: React.TouchEvent<HTMLCanvasElement>) => {
      const rect = canvas.current?.getBoundingClientRect();
      if (!rect) return { x: 0, y: 0 };

      if (event.touches && event.touches.length > 0) {
        return {
          x: event.touches[0].clientX - rect.left,
          y: event.touches[0].clientY - rect.top,
        };
      }
      return { x: 0, y: 0 };
    },
    []
  );

  const calculateTouchSpeed = useCallback(
    (currentPos: { x: number; y: number }) => {
      if (!prevPosition.current) return 1;

      const deltaX = Math.abs(currentPos.x - prevPosition.current.x);
      const deltaY = Math.abs(currentPos.y - prevPosition.current.y);
      return Math.max(deltaX, deltaY);
    },
    []
  );

  const handleTouchDrawing = useCallback(
    (event: React.TouchEvent<HTMLCanvasElement>) => {
      if (!isDrawing.current || isRevealed) return;

      event.preventDefault();

      const currentPos = getTouchEventCoordinates(event);
      const speed = calculateTouchSpeed(currentPos);

      if (prevPosition.current !== null) {
        drawBrushLine(
          prevPosition.current.x,
          prevPosition.current.y,
          currentPos.x,
          currentPos.y,
          speed
        );
      } else {
        drawBrush(currentPos.x, currentPos.y);
      }

      prevPosition.current = currentPos;
    },
    [
      drawBrushLine,
      drawBrush,
      getTouchEventCoordinates,
      calculateTouchSpeed,
      isRevealed,
    ]
  );

  const handleTouchStart = useCallback(
    (event: React.TouchEvent<HTMLCanvasElement>) => {
      if (isRevealed) return;

      isDrawing.current = true;
      const currentPos = getTouchEventCoordinates(event);
      prevPosition.current = currentPos;
      drawBrush(currentPos.x, currentPos.y);
    },
    [drawBrush, getTouchEventCoordinates, isRevealed]
  );

  const handleTouchEnd = useCallback(() => {
    isDrawing.current = false;
    prevPosition.current = null;

    if (dimension.width < 768) {
      setTimeout(checkErasedPercentage, 100);
    }
  }, [checkErasedPercentage, dimension.width]);

  useEffect(() => {
    if (dimension.width > 0) init();
  }, [dimension, init]);

  return (
    <section className="relative grid min-h-screen w-full place-items-center overflow-hidden bg-slate-300 p-8">
      <p className="text-5xl font-semibold text-pink-800">
        <span className="block">Another paint reveal...</span>
        <span className="block">Just a lot more fancier!</span>
      </p>

      <div className="absolute inset-0">
        {dimension.width === 0 && (
          <div className="absolute grid h-full w-full place-items-center bg-[#d6478a] text-slate-300" />
        )}
        <canvas
          ref={canvas}
          width={dimension.width < 768 ? dimension.width : dimension.width / 2}
          height={dimension.height}
          style={{
            touchAction: "none",
            opacity: isRevealed ? 0 : 1,
            transition: isRevealed ? "opacity 0.8s ease-out" : "none",
          }}
          onMouseMove={manageMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchDrawing}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
        />
      </div>
    </section>
  );
}

export default CanvasPaintReveal2;
