"use client";

import { useEffect } from "react";
import Script from "next/script";

const CALENDLY_CSS = "https://assets.calendly.com/assets/external/widget.css";
const CALENDLY_JS = "https://assets.calendly.com/assets/external/widget.js";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

/**
 * Loads the Calendly widget assets and turns any link pointing at
 * calendly.com into a popup-widget trigger. Links keep working as normal
 * anchors if JavaScript is unavailable, so this is purely an enhancement.
 */
export function CalendlyPopup() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      // Respect modifier keys / non-left clicks (open in new tab, etc.)
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target as Element | null;
      const link = target?.closest<HTMLAnchorElement>('a[href*="calendly.com"]');
      if (!link) return;

      const url = link.href;
      if (!url.includes("calendly.com")) return;

      if (window.Calendly) {
        event.preventDefault();
        window.Calendly.initPopupWidget({ url });
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-css-tags */}
      <link rel="stylesheet" href={CALENDLY_CSS} />
      <Script src={CALENDLY_JS} strategy="lazyOnload" />
    </>
  );
}
