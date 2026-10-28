"use client";

import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { MOBILE_QUERY } from "@/lib/use-mobile-viewport";

export function MobilePageScrollReset() {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  useLayoutEffect(() => {
    const pageChanged = previousPathname.current !== pathname;
    previousPathname.current = pathname;
    if (!pageChanged || !window.matchMedia(MOBILE_QUERY).matches || window.location.hash) return;

    const scrollToTop = () => window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    scrollToTop();
    // The outgoing page may release an input/dialog scroll lock after this
    // commit. Reset again once that cleanup and router scroll handling finish.
    const frame = requestAnimationFrame(scrollToTop);
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
