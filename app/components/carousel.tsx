import { useState, useRef, useCallback } from "react";

export default function Carousel({ children }) {
  const [current, setCurrent] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef(null);
  const containerRef = useRef(null);
  const slideRefs = useRef([]);

  const goTo = useCallback((idx) => {
    setCurrent((idx + children.length) % children.length);
  }, []);

  const onPointerDown = (e) => {
    dragStart.current = e.clientX;
    setIsDragging(true);
  };

  const onPointerMove = (e) => {
    if (!isDragging || dragStart.current === null) return;
    const delta = e.clientX - dragStart.current;
    if (!isDragging && Math.abs(delta) > 5) {
      containerRef.current?.setPointerCapture(e.pointerId);
    }
    setDragOffset(delta);
  };

  const onPointerUp = () => {
    if (!isDragging) return;
    if (dragOffset < -50) goTo(current + 1);
    else if (dragOffset > 50) goTo(current - 1);
    setDragOffset(0);
    setIsDragging(false);
    dragStart.current = null;
  };

  const currentWidth = () => {
    const baseWidth =  slideRefs.current.slice(0, current).reduce((accumulator, currentValue) => accumulator + currentValue.getBoundingClientRect().width, 0);

    if (current == children.length - 1) {
      return baseWidth + slideRefs.current[current]?.getBoundingClientRect().width - containerRef.current?.getBoundingClientRect().width;
    } else if (current != 0) {
      return baseWidth + slideRefs.current[current]?.getBoundingClientRect().width / 2 - containerRef.current?.getBoundingClientRect().width / 2;
    }

    return baseWidth;
  };

  const trackStyle = {
    transform: `translateX(calc(-${currentWidth()}px + -${current * 2}rem + ${dragOffset}px))`,
    transition: isDragging ? "none" : "transform 0.45s cubic-bezier(0.77,0,0.18,1)",
    cursor: isDragging ? "grabbing" : "grab",
  };

  return (
    <div>
      <div class="carousel">

        <div class="carousel-viewport">
          <div
            ref={el => containerRef.current = el}
            class="carousel-track"
            style={trackStyle}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
          >
            {children.map((img, i) => (
              <div key={i} ref={el => slideRefs.current[i] = el} class="carousel-slide">
                { children[i] }
              </div>
            ))}
          </div>
        </div>

        { children.length > 1 &&
          <div class="carousel-dots">
            {children.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                class={ `carousel-dot ${ current == i ? 'current' : '' }` }
              />
            ))}
          </div>
        }
      </div>

      <style>{`
        .carousel {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding-bottom: 1rem;
        }
        .carousel-viewport {
          position: relative;
          overflow: hidden
        }
        .carousel-track {
          display: flex;
          will-change: transform;
          user-select: none;
          -webkit-user-select: none;
          gap: 2rem;
          ${ children.length == 1 && 'justify-content: center' }
        }
        .carousel-slide {
          flex-shrink: 0;
          max-width: 100%
        }
        .carousel-dots {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          height: 1rem;
        }
        .carousel-dot {
          border: none;
          background: none;
          cursor: pointer;
          padding: 0;
          height: 0.25rem;
          width: 0.5rem;
          background: rgba(245,240,232,0.3);
          border-radius: 0.25rem;
          transition: width 0.35s cubic-bezier(0.77,0,0.18,1), background 0.35s ease;
          cursor: pointer
        }
        .carousel-dot.current {
          width: 2.5rem;
          background: #f5f0e8
        }
      `}</style>
    </div>
  );
}