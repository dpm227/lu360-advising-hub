"use client";

import { type RefObject, useEffect } from "react";

export const MOBILE_QUERY = "(max-width: 920px)";

// Mobile keyboards resize the visual viewport even when 100vh/100dvh stay tall.
// Keep the measurements local to the chat or dialog; desktop styles ignore them.
export function useMobileViewport(ref: RefObject<HTMLElement | null>, enabled = true) {
  useEffect(() => {
    const element = ref.current;
    if (!enabled || !element) return;

    const media = window.matchMedia(MOBILE_QUERY);
    const viewport = window.visualViewport;
    const navbar = element.closest(".site-shell")?.querySelector(".site-navbar");
    let frame = 0;

    function update() {
      if (!element) return;
      if (!media.matches) {
        element.style.removeProperty("--mobile-viewport-height");
        element.style.removeProperty("--mobile-viewport-top");
        element.style.removeProperty("--mobile-nav-height");
        element.removeAttribute("data-compact-viewport");
        return;
      }
      // Leave pinch zoom under the user's control.
      if (viewport && viewport.scale !== 1) return;
      const height = viewport?.height ?? window.innerHeight;
      element.style.setProperty("--mobile-viewport-height", `${height}px`);
      element.toggleAttribute("data-compact-viewport", height < 500);
      element.style.setProperty("--mobile-viewport-top", `${viewport?.offsetTop ?? 0}px`);
      if (navbar) {
        element.style.setProperty("--mobile-nav-height", `${navbar.getBoundingClientRect().height}px`);
      }
    }

    function scheduleUpdate() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    }

    update();
    const observer = new ResizeObserver(scheduleUpdate);
    if (navbar) observer.observe(navbar);
    media.addEventListener("change", scheduleUpdate);
    window.addEventListener("resize", scheduleUpdate);
    viewport?.addEventListener("resize", scheduleUpdate);
    viewport?.addEventListener("scroll", scheduleUpdate);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      media.removeEventListener("change", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      viewport?.removeEventListener("resize", scheduleUpdate);
      viewport?.removeEventListener("scroll", scheduleUpdate);
    };
  }, [enabled, ref]);
}
