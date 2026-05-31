import type { WhatsAppContent } from "@/lib/types";
import { WhatsAppIcon } from "@/components/ui/icons";

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
      className="fixed bottom-5 right-5 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white shadow-lg ring-1 ring-black/5 transition hover:bg-accent-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/40 sm:bottom-6 sm:right-6"
    >
      <WhatsAppIcon className="h-6 w-6" aria-hidden="true" />
    </a>
  );
}
