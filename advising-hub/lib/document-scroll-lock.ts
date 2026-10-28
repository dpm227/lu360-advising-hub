// Share the lock between the composer and dialogs. Closing a nested dialog
// must not unlock the page beneath a focused composer.
const locks = new Set<{ fixed: boolean }>();
let restore: (() => void) | undefined;
let update: (() => void) | undefined;

export function lockDocumentScroll(fixed: boolean) {
  const lock = { fixed };

  if (locks.size === 0) {
    const body = document.body;
    const root = document.documentElement;
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    const bodyStyles = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      width: body.style.width,
    };
    const rootStyles = {
      overflow: root.style.overflow,
      overscrollBehavior: root.style.overscrollBehavior,
      scrollBehavior: root.style.scrollBehavior,
    };
    let wasFixed = false;

    function preventDocumentPan() {
      if (
        Array.from(locks).some((entry) => entry.fixed) &&
        (!window.visualViewport || window.visualViewport.scale === 1) &&
        (window.scrollX !== 0 || window.scrollY !== 0)
      ) {
        window.scrollTo({ left: 0, top: 0, behavior: "instant" });
      }
    }

    update = () => {
      const shouldFix = Array.from(locks).some((entry) => entry.fixed);
      body.style.overflow = "hidden";
      if (shouldFix) {
        root.style.overflow = "hidden";
        root.style.overscrollBehavior = "none";
        root.style.scrollBehavior = "auto";
        body.style.position = "fixed";
        body.style.top = `${-scrollY}px`;
        body.style.left = `${-scrollX}px`;
        body.style.width = "100%";
        wasFixed = true;
        preventDocumentPan();
      } else if (wasFixed) {
        Object.assign(body.style, bodyStyles, { overflow: "hidden" });
        Object.assign(root.style, rootStyles, { scrollBehavior: "auto" });
        window.scrollTo({ left: scrollX, top: scrollY, behavior: "instant" });
        root.style.scrollBehavior = rootStyles.scrollBehavior;
      }
    };

    window.addEventListener("scroll", preventDocumentPan);
    restore = () => {
      window.removeEventListener("scroll", preventDocumentPan);
      Object.assign(body.style, bodyStyles);
      Object.assign(root.style, rootStyles);
      if (wasFixed) {
        window.scrollTo({ left: scrollX, top: scrollY, behavior: "instant" });
      }
    };
  }

  locks.add(lock);
  update?.();
  return () => {
    if (!locks.delete(lock)) return;
    if (locks.size > 0) {
      update?.();
    } else {
      restore?.();
      restore = undefined;
      update = undefined;
    }
  };
}
