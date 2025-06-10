import { useCallback, useEffect, useRef } from "react";
import useWindowDimension from "../hooks/useWindowDimension";
import { lerp } from "../utils/utils";

function CanvasPaintReveal() {
  const dimension = useWindowDimension();
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const prevPosition = useRef<{ x: number; y: number } | null>(null);

  const init = useCallback(() => {
    if (!canvas.current) return;
    const context = canvas.current.getContext("2d");
    if (!context) return;

    context.fillStyle = "#1d293d";
    context.fillRect(0, 0, dimension.width, dimension.height);
    context.globalCompositeOperation = "destination-out";
  }, [dimension]);

  const drawCircle = useCallback((x: number, y: number, radius: number) => {
    if (!canvas.current) return;
    const context = canvas.current.getContext("2d");
    if (!context) return;

    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
  }, []);

  const manageMouseMove = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
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
    [drawCircle]
  );

  useEffect(() => {
    if (dimension.width > 0) init();
  }, [dimension, init]);

  return (
    <section className="relative grid min-h-screen w-full place-items-center bg-slate-300 p-8">
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
          width={dimension.width}
          height={dimension.height}
          onMouseMove={manageMouseMove}
        />
      </div>
    </section>
  );
}

export default CanvasPaintReveal;
