import type { WhatsAppContent } from "@/lib/types";

export interface WhatsAppFloatProps {
  content: WhatsAppContent;
}

export function WhatsAppFloat({ content }: WhatsAppFloatProps) {
  const params = new URLSearchParams();
  if (content.defaultMessage) params.set("text", content.defaultMessage);
  const query = params.toString();
  const href = `https://wa.me/${content.number}${query ? `?${query}` : ""}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={content.label}
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-lg ring-1 ring-black/5 transition hover:bg-accent-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/40 sm:bottom-6 sm:right-6 sm:h-16 sm:w-16"
    >
      <WhatsAppIcon className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden="true" />
    </a>
  );
}

function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" {...props}>
      <path d="M19.11 17.36c-.27-.13-1.58-.78-1.82-.87-.24-.09-.42-.13-.6.13-.18.27-.69.87-.85 1.05-.16.18-.31.2-.58.07-.27-.13-1.13-.42-2.16-1.33-.8-.71-1.34-1.59-1.5-1.86-.16-.27-.02-.42.12-.55.12-.12.27-.31.4-.47.13-.16.18-.27.27-.45.09-.18.04-.34-.02-.47-.07-.13-.6-1.45-.83-1.99-.22-.52-.44-.45-.6-.46-.16 0-.34-.02-.52-.02-.18 0-.47.07-.71.34-.24.27-.93.91-.93 2.22 0 1.31.96 2.58 1.09 2.76.13.18 1.88 2.86 4.55 4.01.64.28 1.13.45 1.52.57.64.2 1.22.17 1.68.1.51-.08 1.58-.65 1.8-1.27.22-.62.22-1.16.16-1.27-.07-.11-.24-.18-.51-.31Zm-4.86 6.55h-.01a9.74 9.74 0 0 1-4.96-1.36l-.36-.21-3.69.97.99-3.6-.23-.37a9.7 9.7 0 0 1-1.49-5.18c0-5.37 4.37-9.73 9.75-9.73 2.6 0 5.04 1.01 6.88 2.85a9.66 9.66 0 0 1 2.85 6.88c0 5.36-4.37 9.75-9.73 9.75Zm8.28-18.04A11.6 11.6 0 0 0 14.24 2.5C7.81 2.5 2.6 7.71 2.6 14.14c0 2.05.54 4.06 1.56 5.83L2.5 26l6.18-1.62a11.62 11.62 0 0 0 5.56 1.42h.01c6.43 0 11.64-5.21 11.64-11.64 0-3.11-1.21-6.03-3.36-8.29Z" />
    </svg>
  );
}
