"use client";

import { type RefObject, useEffect } from "react";
import { lockDocumentScroll } from "@/lib/document-scroll-lock";

export const MOBILE_QUERY = "(max-width: 920px)";

const inputSelector = "input:not([type='checkbox']):not([type='radio']), textarea, select, [contenteditable='true']";

// Move only the input's own scroll pane. scrollIntoView can also move the
// document, pushing the entire chat/dialog above the keyboard on iOS.
function revealFocusedInput(element: HTMLElement) {
  const input = document.activeElement;
  if (!(input instanceof HTMLElement) || !element.contains(input) || !input.matches(inputSelector)) return;
  const pane = input.closest<HTMLElement>("[data-mobile-scroll]");
  if (!pane || !element.contains(pane)) return;

  const fieldBounds = input.getBoundingClientRect();
  const paneBounds = pane.getBoundingClientRect();
  const footer = pane.querySelector<HTMLElement>("[data-mobile-scroll-footer]");
  // Leave room for the dialog's close control as well as its sticky actions.
  const top = paneBounds.top + 64;
  const bottom = Math.min(paneBounds.bottom, footer?.getBoundingClientRect().top ?? paneBounds.bottom) - 12;
  if (fieldBounds.bottom > bottom) {
    pane.scrollTop += fieldBounds.bottom - bottom;
  } else if (fieldBounds.top < top) {
    pane.scrollTop -= top - fieldBounds.top;
  }
}

export function observeMobileViewport(element: HTMLElement, lockOnInput = false) {
  const media = window.matchMedia(MOBILE_QUERY);
  const viewport = window.visualViewport;
  let frame = 0;
  let unlock: (() => void) | undefined;

  function update() {
    if (!media.matches) {
      unlock?.();
      unlock = undefined;
      element.style.removeProperty("--mobile-viewport-height");
      element.style.removeProperty("--mobile-viewport-top");
      element.removeAttribute("data-compact-viewport");
      element.removeAttribute("data-mobile-input-active");
      return;
    }

    const active = document.activeElement;
    const inputFocused = active instanceof HTMLElement && element.contains(active) && active.matches(inputSelector);
    element.toggleAttribute("data-mobile-input-active", inputFocused);
    if (lockOnInput && inputFocused && !unlock) {
      unlock = lockDocumentScroll(true);
    } else if (!inputFocused && unlock) {
      unlock();
      unlock = undefined;
    }

    // Keep pinch zoom available, including while a form field has focus.
    if (viewport && viewport.scale !== 1) return;
    const height = viewport?.height ?? window.innerHeight;
    element.style.setProperty("--mobile-viewport-height", `${height}px`);
    element.style.setProperty("--mobile-viewport-top", `${viewport?.offsetTop ?? 0}px`);
    element.toggleAttribute("data-compact-viewport", height < 500);
    revealFocusedInput(element);
  }

  function scheduleUpdate() {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(update);
  }

  // Lock on focus before the browser pans the document for the keyboard.
  element.addEventListener("focusin", update);
  element.addEventListener("focusout", scheduleUpdate);
  media.addEventListener("change", scheduleUpdate);
  window.addEventListener("resize", scheduleUpdate);
  viewport?.addEventListener("resize", scheduleUpdate);
  viewport?.addEventListener("scroll", scheduleUpdate);
  update();

  return () => {
    cancelAnimationFrame(frame);
    element.removeEventListener("focusin", update);
    element.removeEventListener("focusout", scheduleUpdate);
    media.removeEventListener("change", scheduleUpdate);
    window.removeEventListener("resize", scheduleUpdate);
    viewport?.removeEventListener("resize", scheduleUpdate);
    viewport?.removeEventListener("scroll", scheduleUpdate);
    unlock?.();
    element.removeAttribute("data-mobile-input-active");
    element.removeAttribute("data-compact-viewport");
    element.style.removeProperty("--mobile-viewport-height");
    element.style.removeProperty("--mobile-viewport-top");
  };
}

export function useMobileViewport(ref: RefObject<HTMLElement | null>, enabled = true, lockOnInput = false) {
  useEffect(() => {
    if (!enabled || !ref.current) return;
    return observeMobileViewport(ref.current, lockOnInput);
  }, [enabled, lockOnInput, ref]);
}
