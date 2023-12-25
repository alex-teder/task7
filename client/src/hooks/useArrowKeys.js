import { useEffect, useRef, useState } from "react";

export function useArrowKeys(optionsCount) {
  const opt1 = useRef(null);
  const opt2 = useRef(null);
  const opt3 = useRef(null);
  const opt4 = useRef(null);
  const opt5 = useRef(null);
  const opts = [opt1, opt2, opt3, opt4, opt5].slice(0, optionsCount);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const toggleFocus = (event) => {
      switch (event.key) {
        case "ArrowUp":
          setActiveIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : opts.length - 1));
          break;
        case "ArrowDown":
          setActiveIndex((prevIndex) => (prevIndex < opts.length - 1 ? prevIndex + 1 : 0));
          break;
        default:
          break;
      }
    };

    opts[activeIndex].current.focus();

    document.addEventListener("keydown", toggleFocus);
    return () => document.removeEventListener("keydown", toggleFocus);
  }, [activeIndex]);

  useEffect(() => {
    const setHover = (idx) => () => {
      setActiveIndex(idx);
    };

    opts.forEach(({ current: element }, idx) => {
      if (!element) return;
      element.addEventListener("mouseenter", setHover(idx));
    });

    return () => {
      opts.forEach(({ current: element }, idx) => {
        if (!element) return;
        element.removeEventListener("mouseenter", setHover(idx));
      });
    };
  }, [opts]);

  return opts;
}
