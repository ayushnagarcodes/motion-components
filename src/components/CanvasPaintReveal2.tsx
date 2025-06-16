import { useCallback, useEffect, useRef, useState } from "react";
import useWindowDimension from "../hooks/useWindowDimension";
import { lerp } from "../utils/utils";

function CanvasPaintReveal() {
  const dimension = useWindowDimension();
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const brushImage = useRef<HTMLImageElement | null>(null);
  const prevPosition = useRef<{ x: number; y: number } | null>(null);
  const isDrawing = useRef(false);
  const animationRef = useRef<number | null>(null);
  const totalPixels = useRef(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

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
    setIsAnimating(false);
  }, [dimension]);

  const drawBrush = (x: number, y: number, scale: number = 1) => {
    if (!canvas.current || isRevealed || !brushImage.current) return;
    const context = canvas.current.getContext("2d");
    if (!context) return;

    context.save();
    context.translate(x, y);
    context.scale(scale, scale);
    context.drawImage(
      brushImage.current,
      -brushImage.current.width / 2,
      -brushImage.current.height / 2
    );
    context.restore();
  };

  const drawBrushLine = (
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    scale: number = 1
  ) => {
    if (!canvas.current || isRevealed) return;

    const distance = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
    const steps = Math.max(1, Math.floor(distance / 3));

    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = lerp(startX, endX, t);
      const y = lerp(startY, endY, t);
      drawBrush(x, y, scale);
    }
  };

  // Auto-paint animation function
  const startAutoAnimation = useCallback(() => {
    if (!canvas.current || isAnimating || isRevealed) return;

    setIsAnimating(true);
    const canvasWidth = canvas.current.width;
    const canvasHeight = canvas.current.height;

    const animationSpeed = 0.05;

    const waypoints = [
      { x: canvasWidth * 0.05, y: canvasHeight * 0.2 },
      { x: canvasWidth * 0.3, y: 0 },
      { x: canvasWidth * 0.1, y: canvasHeight * 0.45 },
      { x: canvasWidth * 0.6, y: 0.05 },
      { x: canvasWidth * 0.1, y: canvasHeight * 0.7 },
      { x: canvasWidth * 0.75, y: canvasHeight * 0.05 },
      { x: canvasWidth * 0.2, y: canvasHeight * 0.9 },
      { x: canvasWidth * 0.9, y: canvasHeight * 0.2 },
      { x: canvasWidth * 0.4, y: canvasHeight * 0.95 },
      { x: canvasWidth * 0.9, y: canvasHeight * 0.5 },
      { x: canvasWidth * 0.7, y: canvasHeight * 0.95 },
      { x: canvasWidth, y: canvasHeight * 0.75 },
    ];

    let currentWaypointIndex = 0;
    let segmentProgress = 0;
    let lastPosition: { x: number; y: number } | null = null;

    const animateStroke = () => {
      if (isRevealed || currentWaypointIndex >= waypoints.length - 1) {
        setIsAnimating(false);
        return;
      }

      segmentProgress += animationSpeed;

      const startPoint = waypoints[currentWaypointIndex];
      const endPoint = waypoints[currentWaypointIndex + 1];

      // Calculate current position along the segment
      const currentX = lerp(startPoint.x, endPoint.x, segmentProgress);
      const currentY = lerp(startPoint.y, endPoint.y, segmentProgress);

      if (lastPosition) {
        drawBrushLine(lastPosition.x, lastPosition.y, currentX, currentY);
        lastPosition = { x: currentX, y: currentY };
      } else {
        // Draw the first point
        drawBrush(currentX, currentY);
        lastPosition = { x: currentX, y: currentY };
      }

      // Move to next segment when current one is complete
      if (segmentProgress >= 1) {
        currentWaypointIndex++;
        segmentProgress = 0;
      }

      animationRef.current = requestAnimationFrame(animateStroke);
    };

    animateStroke();
  }, [isRevealed, isAnimating]);

  const stopAutoAnimation = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    setIsAnimating(false);
  };

  const handleMouseEnter = () => {
    // Only start animation on desktop (non-touch devices)
    if (dimension.width >= 768 && !isAnimating && !isRevealed) {
      startAutoAnimation();
    }
  };

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

    if (erasedPercentage > 70) {
      setIsRevealed(true);
      stopAutoAnimation();
    }
  }, [isRevealed]);

  const handleMouseMove = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    // Disable manual painting on desktop when auto-animation is active
    if (isRevealed || (dimension.width >= 768 && isAnimating)) return;

    const rect = canvas.current?.getBoundingClientRect();
    if (!rect) return;

    const currentX = event.clientX - rect.left;
    const currentY = event.clientY - rect.top;

    if (prevPosition.current !== null) {
      drawBrushLine(
        prevPosition.current.x,
        prevPosition.current.y,
        currentX,
        currentY
      );
    } else {
      drawBrush(currentX, currentY);
    }

    prevPosition.current = { x: currentX, y: currentY };
  };

  // Handlers for touch events
  const getTouchEventCoordinates = (
    event: React.TouchEvent<HTMLCanvasElement>
  ) => {
    const rect = canvas.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };

    if (event.touches && event.touches.length > 0) {
      return {
        x: event.touches[0].clientX - rect.left,
        y: event.touches[0].clientY - rect.top,
      };
    }
    return { x: 0, y: 0 };
  };

  const handleTouchDrawing = (event: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current || isRevealed) return;

    const currentPos = getTouchEventCoordinates(event);

    if (prevPosition.current !== null) {
      drawBrushLine(
        prevPosition.current.x,
        prevPosition.current.y,
        currentPos.x,
        currentPos.y
      );
    } else {
      drawBrush(currentPos.x, currentPos.y);
    }

    prevPosition.current = currentPos;
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLCanvasElement>) => {
    if (isRevealed) return;

    isDrawing.current = true;
    const currentPos = getTouchEventCoordinates(event);

    drawBrush(currentPos.x, currentPos.y);

    prevPosition.current = currentPos;
  };

  const handleTouchEnd = () => {
    isDrawing.current = false;

    if (dimension.width < 768) {
      setTimeout(checkErasedPercentage, 100);
    }

    prevPosition.current = null;
  };

  // Initialize canvas
  useEffect(() => {
    if (dimension.width > 0) init();
  }, [dimension, init]);

  // Load brush image
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      brushImage.current = img;
    };
    img.src = "/assets/masks/brush-texture.png";
  }, []);

  // Check animation progress periodically
  useEffect(() => {
    if (isAnimating) {
      const interval = setInterval(checkErasedPercentage, 800);
      return () => clearInterval(interval);
    }
  }, [isAnimating, checkErasedPercentage]);

  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) stopAutoAnimation();
    };
  }, []);

  return (
    <section className="relative grid min-h-svh w-full place-items-center overflow-hidden bg-slate-300 p-8">
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
            touchAction: isRevealed || !isDrawing ? "auto" : "none",
            opacity: isRevealed ? 0 : 1,
            transition: isRevealed ? "opacity 0.8s ease-out" : "none",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
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
