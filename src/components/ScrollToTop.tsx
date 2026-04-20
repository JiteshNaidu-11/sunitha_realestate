import { useLayoutEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const scrollPositions = new Map<string, number>();
const getScrollKey = (pathname: string, search: string) => `${pathname}${search || ""}`;

/** Restores scroll on back/forward, scrolls to top on new navigations. */
const ScrollToTop = () => {
  const location = useLocation();
  const navigationType = useNavigationType(); // POP | PUSH | REPLACE

  useLayoutEffect(() => {
    const key = getScrollKey(location.pathname, location.search);

    if (navigationType === "POP") {
      const y = scrollPositions.get(key);
      if (typeof y === "number") {
        window.scrollTo(0, y);
      }
    } else {
      window.scrollTo(0, 0);
    }

    return () => {
      scrollPositions.set(key, window.scrollY);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key]);

  return null;
};

export default ScrollToTop;
