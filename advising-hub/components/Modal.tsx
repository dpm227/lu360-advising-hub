"use client";

import { type ReactNode, useEffect, useRef } from "react";

type ModalProps = {
  children: ReactNode;
  labelledBy: string;
  open: boolean;
  onClose: () => void;
  panelClassName?: string;
};

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

export function Modal({
  children,
  labelledBy,
  open,
  onClose,
  panelClassName = "",
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const lastActiveElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    lastActiveElementRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusableElements = Array.from(
      panelRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? [],
    );
    const firstFocusable = focusableElements[0] ?? panelRef.current;
    firstFocusable?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const activeFocusableElements = Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? [],
      ).filter((element) => element.offsetParent !== null);

      if (activeFocusableElements.length === 0) {
        event.preventDefault();
        panelRef.current?.focus();
        return;
      }

      const firstElement = activeFocusableElements[0];
      const lastElement =
        activeFocusableElements[activeFocusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }

      if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      lastActiveElementRef.current?.focus();
    };
  }, [onClose, open]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      role="presentation"
    >
      <div
        aria-labelledby={labelledBy}
        aria-modal="true"
        className={`modal-panel ${panelClassName}`}
        ref={panelRef}
        role="dialog"
        tabIndex={-1}
      >
        <button
          aria-label="Close modal"
          className="modal-close"
          onClick={onClose}
          type="button"
        >
          <svg
            aria-hidden="true"
            fill="none"
            height="18"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="18"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
}
