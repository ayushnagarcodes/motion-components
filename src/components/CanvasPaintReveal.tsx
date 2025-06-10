import { useCallback, useEffect, useRef, useState } from "react";
import useWindowDimension from "../hooks/useWindowDimension";
import { lerp } from "../utils/utils";

function CanvasPaintReveal() {
  const dimension = useWindowDimension();
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const prevPosition = useRef<{ x: number; y: number } | null>(null);
  const isDrawing = useRef(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const totalPixels = useRef(0);
  const erasedPixels = useRef(0);

  const init = useCallback(() => {
    if (!canvas.current) return;
    const context = canvas.current.getContext("2d");
    if (!context) return;

    context.fillStyle = "#1d293d";
    context.fillRect(0, 0, dimension.width, dimension.height);
    context.globalCompositeOperation = "destination-out";

    // Calculate total pixels for percentage calculation
    const canvasWidth =
      dimension.width < 768 ? dimension.width : dimension.width / 2;
    totalPixels.current = canvasWidth * dimension.height;
    erasedPixels.current = 0;
    setIsRevealed(false);
  }, [dimension]);

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

    // Check alpha channel (every 4th value) to count transparent pixels
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] === 0) {
        // Fully transparent
        transparentPixels++;
      }
    }

    const erasedPercentage = (transparentPixels / totalPixels.current) * 100;

    // If more than 50% is erased, trigger reveal
    if (erasedPercentage > 50) {
      setIsRevealed(true);
    }
  }, [isRevealed]);

  const drawCircle = useCallback(
    (x: number, y: number, radius: number) => {
      if (!canvas.current || isRevealed) return;
      const context = canvas.current.getContext("2d");
      if (!context) return;

      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fill();
    },
    [isRevealed]
  );

  const manageMouseMove = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
      if (isRevealed) return;

      const speed =
        Math.max(Math.abs(event.movementX), Math.abs(event.movementY)) / 10;

      if (prevPosition.current !== null) {
        for (let i = 0; i < speed; i++) {
          const targetX = lerp(
            prevPosition.current.x,
            event.pageX,
            (1 / speed) * i
          );
          const targetY = lerp(
            prevPosition.current.y,
            event.pageY,
            (1 / speed) * i
          );
          drawCircle(targetX, targetY, 50);
        }
      }

      prevPosition.current = {
        x: event.pageX,
        y: event.pageY,
      };
    },
    [drawCircle, isRevealed]
  );

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
      return Math.max(deltaX, deltaY) / 10;
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
        const steps = Math.max(1, Math.floor(speed));
        for (let i = 0; i <= steps; i++) {
          const targetX = lerp(prevPosition.current.x, currentPos.x, i / steps);
          const targetY = lerp(prevPosition.current.y, currentPos.y, i / steps);
          drawCircle(targetX, targetY, 50);
        }
      } else {
        drawCircle(currentPos.x, currentPos.y, 50);
      }

      prevPosition.current = currentPos;
    },
    [drawCircle, getTouchEventCoordinates, calculateTouchSpeed, isRevealed]
  );

  const handleTouchStart = useCallback(
    (event: React.TouchEvent<HTMLCanvasElement>) => {
      if (isRevealed) return;

      isDrawing.current = true;
      const currentPos = getTouchEventCoordinates(event);
      prevPosition.current = currentPos;
      drawCircle(currentPos.x, currentPos.y, 50);
    },
    [drawCircle, getTouchEventCoordinates, isRevealed]
  );

  const handleTouchEnd = useCallback(() => {
    isDrawing.current = false;
    prevPosition.current = null;

    // Check if we should reveal after touch ends (mobile only)
    if (dimension.width < 768) {
      setTimeout(checkErasedPercentage, 100); // Small delay to ensure drawing is complete
    }
  }, [checkErasedPercentage, dimension.width]);

  useEffect(() => {
    if (dimension.width > 0) init();
  }, [dimension, init]);

  return (
    <section className="relative grid min-h-screen w-full place-items-center overflow-hidden bg-slate-300 p-8">
      <p className="text-5xl font-semibold text-slate-800">
        <span className="block">I'm a frontend dev...</span>
        <span className="block">
          And other dev species don't take it seriously.
        </span>
      </p>

      <div className="absolute inset-0">
        {dimension.width === 0 && (
          <div className="absolute grid h-full w-full place-items-center bg-slate-800 text-slate-300" />
        )}
        <canvas
          ref={canvas}
          width={dimension.width < 768 ? dimension.width : dimension.width / 2}
          height={dimension.height}
          style={{
            touchAction: isRevealed ? "auto" : "none",
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

export default CanvasPaintReveal;
