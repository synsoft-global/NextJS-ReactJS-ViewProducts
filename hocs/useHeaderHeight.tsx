import { useEffect, useState } from "react";

const useHeaderHeight = () => {
  const [siteHeaderHeight, setSiteHeaderHeight] = useState(0);

  useEffect(() => {
    const element = document.querySelector("#site-header");
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { height } = entry.contentRect;
        setSiteHeaderHeight(height);
      }
    });

    if (element) {
      resizeObserver.observe(element);
    }

    return () => {
      if (element) {
        resizeObserver.unobserve(element);
      }
    };
  }, []);

  return siteHeaderHeight;
};

export default useHeaderHeight;
