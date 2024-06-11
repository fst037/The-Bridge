import { useEffect, useRef, useState } from "react";

export const useCardToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef();

  useEffect(() => {
    const handlerClick = (e) => {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    const handlerEscapeKey = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handlerClick);
    document.addEventListener("keydown", handlerEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handlerClick);
      document.removeEventListener("keydown", handlerEscapeKey);
    };
  }, []);

  return { isOpen, setIsOpen, cardRef };
};
