import { MoveIcon } from "lucide-react";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Badge } from "../ui/badge";

export default function GestureLayout({
  children,
  defaultScale = 1,
}: {
  children: ReactNode;
  defaultScale?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [scale, setScale] = useState(defaultScale);

  // Zoom limits
  const MIN_SCALE = 0.5;
  const MAX_SCALE = 3;

  // Drag state
  let startX = 0;
  let startY = 0;
  let scrollLeft = 0;
  let scrollTop = 0;

  const initialPinchDistance = useRef(0);
  const initialScale = useRef(defaultScale);

  const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max);

  const onWheel = (e: React.WheelEvent) => {
    if (!e.ctrlKey && !e.metaKey) return;
    e.preventDefault();

    const el = containerRef.current;
    if (!el) return;

    const zoomSpeed = 0.0015;
    const newScale = clamp(scale - e.deltaY * zoomSpeed, MIN_SCALE, MAX_SCALE);

    const rect = el.getBoundingClientRect();
    const offsetX = e.clientX - rect.left + el.scrollLeft;
    const offsetY = e.clientY - rect.top + el.scrollTop;

    const zoomFactor = newScale / scale;

    setScale(newScale);

    // Scroll to keep zoom centered around the pointer
    requestAnimationFrame(() => {
      el.scrollLeft = offsetX * zoomFactor - (e.clientX - rect.left);
      el.scrollTop = offsetY * zoomFactor - (e.clientY - rect.top);
    });
  };

  const onMouseDown = (e: React.MouseEvent) => {
    const el = containerRef.current;
    if (!el) return;
    setIsDragging(true);
    startX = e.pageX - el.offsetLeft;
    startY = e.pageY - el.offsetTop;
    scrollLeft = el.scrollLeft;
    scrollTop = el.scrollTop;
    el.classList.add("cursor-grabbing");
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const el = containerRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const y = e.pageY - el.offsetTop;
    el.scrollLeft = scrollLeft - (x - startX);
    el.scrollTop = scrollTop - (y - startY);
  };

  const onMouseUpOrLeave = () => {
    setIsDragging(false);
    containerRef.current?.classList.remove("cursor-grabbing");
  };

  // Touch: pinch zoom support
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        initialPinchDistance.current = Math.sqrt(dx * dx + dy * dy);
        initialScale.current = scale;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const newDistance = Math.sqrt(dx * dx + dy * dy);

        const scaleChange = newDistance / initialPinchDistance.current;
        const newScale = clamp(
          initialScale.current * scaleChange,
          MIN_SCALE,
          MAX_SCALE
        );
        setScale(newScale);
      }
    };

    el.addEventListener("touchstart", handleTouchStart, { passive: false });
    el.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
    };
  }, [scale]);

  return (
    <div
      ref={containerRef}
      onWheel={onWheel}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUpOrLeave}
      onMouseLeave={onMouseUpOrLeave}
      className="w-full h-[400px] lg:h-fit overflow-scroll cursor-grab select-none md:border-0 md:overflow-auto bg-white relative"
    >
      <Badge className="py-2 sticky left-5 top-5 font-medium z-30 opacity-35">
        <MoveIcon size={16} />
        Drag to navigate map
      </Badge>
      <div
        ref={contentRef}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
        className="transition-transform duration-100 ease-out "
      >
        {children}
      </div>
    </div>
  );
}
