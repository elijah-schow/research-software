import React, { useEffect } from "react";

/**
 * @source https://medium.com/@kevinfelisilda/click-outside-element-event-using-react-hooks-2c540814b661
 */
const useOutsideClick = (
    ref: React.RefObject<HTMLElement>,
    callback: () => void
) => {
  const handleClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};

export default useOutsideClick;