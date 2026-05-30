export interface LogoProps extends React.SVGProps<SVGSVGElement> {
  variant?: "color" | "inverse";
}

export function Logo({ variant = "color", className, ...rest }: LogoProps) {
  const stroke = variant === "inverse" ? "#FFFFFF" : "#102A56";
  const accent = "#F58A3F";
  const text = variant === "inverse" ? "#FFFFFF" : "#102A56";
  return (
    <svg
      viewBox="0 0 160 56"
      role="img"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      <g>
        <path
          d="M30 8c8 9 12 16 12 24a12 12 0 1 1-24 0c0-8 4-15 12-24Z"
          fill="none"
          stroke={stroke}
          strokeWidth="2.5"
        />
        <circle cx="30" cy="32" r="5" fill={accent} />
        <path
          d="M6 38c6-2 12-2 18 0"
          fill="none"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
      <text
        x="54"
        y="30"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontSize="20"
        fontWeight="700"
        fill={text}
      >
        Alchemy
      </text>
      <text
        x="54"
        y="46"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontSize="12"
        fontWeight="500"
        letterSpacing="2"
        fill={text}
      >
        IVF
      </text>
    </svg>
  );
}
