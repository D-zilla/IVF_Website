"use client";

import { useEffect } from "react";
import { ShieldCheckIcon } from "@/components/ui/icons";

export type ToastVariant = "success" | "error";

export interface ToastProps {
  /** Message to show. The toast is hidden when this is null. */
  message: string | null;
  variant?: ToastVariant;
  /** Auto-dismiss delay in ms. */
  duration?: number;
  onDismiss: () => void;
}

/**
 * Lightweight, dependency-free toast pinned to the bottom of the viewport.
 * Auto-dismisses after `duration` and is announced to screen readers.
 */
export function Toast({
  message,
  variant = "success",
  duration = 4000,
  onDismiss,
}: ToastProps) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onDismiss, duration);
    return () => clearTimeout(t);
  }, [message, duration, onDismiss]);

  if (!message) return null;

  const isError = variant === "error";

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-5 z-[60] flex justify-center px-4"
      aria-live="assertive"
      role="status"
    >
      <div
        className={`pointer-events-auto flex max-w-md items-center gap-3 rounded-card px-5 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(0,0,0,0.18)] motion-safe:animate-[toast-in_0.25s_ease-out] ${
          isError ? "bg-[#e23b3b]" : "bg-brand-green"
        }`}
      >
        <ShieldCheckIcon className="h-5 w-5 shrink-0 fill-white" aria-hidden="true" />
        <span>{message}</span>
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss notification"
          className="ml-1 shrink-0 rounded p-0.5 text-white/80 transition hover:text-white"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
