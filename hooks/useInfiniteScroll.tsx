import { useEffect, useRef, MutableRefObject } from "react";

type Callback = () => void;

export default function useInfiniteScroll(
  callback: Callback
): MutableRefObject<null | HTMLElement> {
  const observerRef = useRef<null | HTMLElement>(null);

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          callback();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [callback]);

  return observerRef;
}
