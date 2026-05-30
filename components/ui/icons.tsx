import { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export const LocationIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
  </svg>
);

export const PhoneIcon = (p: IconProps) => (
  <svg viewBox="0 0 18 18" fill="currentColor" {...p}>
    <path d="M3.62 7.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V17c0 .55-.45 1-1 1C7.61 18 0 10.39 0 1 0 .45.45 0 1 0h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
  </svg>
);

export const PhoneFooterIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1A17 17 0 0 1 3 4c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
  </svg>
);

export const DropletIcon = (p: IconProps) => (
  <svg viewBox="0 0 48 56" fill="none" {...p}>
    <path
      d="M24 2C24 2 6 22 6 36a18 18 0 0 0 36 0C42 22 24 2 24 2z"
      stroke="currentColor"
      strokeWidth={3}
    />
    <circle cx="24" cy="37" r="9" fill="currentColor" />
  </svg>
);

export const WhatsAppIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.02zM12.04 20.15a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24a8.2 8.2 0 0 1 8.24 8.25c0 4.54-3.7 8.23-8.24 8.23z" />
  </svg>
);

export const CalendarIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
  </svg>
);

export const CheckIcon = (p: IconProps) => (
  <svg viewBox="0 0 16 12" fill="currentColor" {...p}>
    <path d="M5.6 11.4 0.7 6.5 2.1 5.1l3.5 3.5L13.9 0.3l1.4 1.4z" />
  </svg>
);

export const PlayIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M8 5v14l11-7z" />
  </svg>
);

export const ArrowRightIcon = (p: IconProps) => (
  <svg viewBox="0 0 8 12" fill="currentColor" {...p}>
    <path d="M1.4 0 0 1.4 4.6 6 0 10.6 1.4 12l6-6z" />
  </svg>
);

export const ChevronLeftIcon = (p: IconProps) => (
  <svg viewBox="0 0 12 12" fill="currentColor" {...p}>
    <path d="M8 0 9.4 1.4 4.8 6l4.6 4.6L8 12 2 6z" />
  </svg>
);

export const ChevronRightIcon = (p: IconProps) => (
  <svg viewBox="0 0 12 12" fill="currentColor" {...p}>
    <path d="M4 0 2.6 1.4 7.2 6l-4.6 4.6L4 12l6-6z" />
  </svg>
);

export const PlusIcon = (p: IconProps) => (
  <svg viewBox="0 0 12 12" fill="currentColor" {...p}>
    <path d="M5 0h2v5h5v2H7v5H5V7H0V5h5z" />
  </svg>
);

export const StarIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.9L12 17.8 5.8 21l1.2-6.9-5-4.9 6.9-1z" />
  </svg>
);

export const HeartPulseIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 21s-7.5-4.9-10-9.2C.3 8.9 1.7 5 5.2 5c2 0 3.3 1.3 3.8 2.3L9.7 9l1.3-2.6c.2-.4.6-.4.8 0l1.2 2.4 1-1.6C16 5.9 17.3 5 19 5c3 0 4.5 3.9 2.9 6.8C19.5 16.1 12 21 12 21z" />
  </svg>
);

export const ShieldIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 1 3 5v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V5l-9-4z" />
  </svg>
);

export const ShieldCheckIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 1 3 5v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V5l-9-4zm-1 15-4-4 1.4-1.4L11 13.2l4.6-4.6L17 10l-6 6z" />
  </svg>
);

export const UsersIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2c-4 0-9 2-9 6v2h18v-2c0-4-5-6-9-6z" />
  </svg>
);

export const UsersDuoIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M16 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm-8 0a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm0 2c-2.7 0-8 1.3-8 4v3h10v-3c0-1 .4-1.9 1-2.6C9.9 13.1 8.7 13 8 13zm8 0c-.3 0-.6 0-1 .1.9.9 1 1.9 1 2.9v3h8v-3c0-2.7-5.3-4-8-4z" />
  </svg>
);

export const ClockIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 11H7v-2h4V6h2v7z" />
  </svg>
);

export const BuildingIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M3 21V7l9-4 9 4v14h-6v-6h-6v6H3z" />
  </svg>
);

export const MessageIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" />
  </svg>
);

export const SendIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M3 3h18v14H7l-4 4V3zm4 5v2h10V8H7zm0 4v2h7v-2H7z" />
  </svg>
);

export const PersonalCareIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M14 6V4h-4v2H4v14h16V6h-6zm-4 0h4v2h-4V6zm8 12H6V8h12v10zm-5-6h2v-2h2v2h2v2h-2v2h-2v-2h-2v-2z" />
  </svg>
);

export const GoogleIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" {...p}>
    <path
      fill="#4285F4"
      d="M23 12.27c0-.79-.07-1.54-.2-2.27H12v4.51h6.2a5.3 5.3 0 0 1-2.3 3.48v2.9h3.72C21.96 18.92 23 15.9 23 12.27z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.72-2.9c-1.03.69-2.35 1.1-4.21 1.1-3.24 0-5.99-2.19-6.97-5.13H1.18v2.99A12 12 0 0 0 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.03 14.26A7.2 7.2 0 0 1 4.65 12c0-.78.13-1.55.38-2.26V6.75H1.18A12 12 0 0 0 0 12c0 1.93.46 3.76 1.18 5.25l3.85-2.99z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.3-3.3C17.95 1.2 15.24 0 12 0A12 12 0 0 0 1.18 6.75l3.85 2.99C6.01 6.94 8.76 4.75 12 4.75z"
    />
  </svg>
);
