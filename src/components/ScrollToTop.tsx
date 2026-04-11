import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

/** Scrolls the document to the top on every client-side route change. */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
