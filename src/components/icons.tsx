import type { SVGProps } from "react";

export type IconName =
  | "arrow-right"
  | "arrow-left"
  | "arrow-up-right"
  | "check"
  | "chevron-down"
  | "clock"
  | "calendar"
  | "flame"
  | "bolt"
  | "target"
  | "rocket"
  | "box"
  | "github"
  | "linkedin"
  | "link"
  | "copy"
  | "trophy"
  | "users"
  | "eye"
  | "pen"
  | "alert"
  | "map-pin"
  | "gauge"
  | "layers"
  | "shield"
  | "moon"
  | "sun"
  | "sparkle"
  | "command"
  | "play"
  | "x"
  | "menu";

const PATHS: Record<IconName, React.ReactNode> = {
  "arrow-right": <path d="M4 12h16m0 0-6-6m6 6-6 6" />,
  "arrow-left": <path d="M20 12H4m0 0 6-6m-6 6 6 6" />,
  "arrow-up-right": <path d="M7 17 17 7m0 0H8m9 0v9" />,
  check: <path d="m5 12.5 4.5 4.5L19 7" />,
  "chevron-down": <path d="m6 9 6 6 6-6" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M3.5 10h17M8 3v4m8-4v4" />
    </>
  ),
  flame: (
    <path d="M13.5 3c.3 2.5-1 4.2-2.8 5.6C8.6 10.2 7 12 7 14.8a5 5 0 0 0 10 .2c0-2-.9-3.4-1.9-4.6.3 1 .1 1.9-.4 2.6.7-4-1.2-7.6-2.2-10Z" />
  ),
  bolt: <path d="M13 3 5 13.5h5.5L11 21l8-10.5h-5.5L13 3Z" />,
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="0.8" fill="currentColor" />
    </>
  ),
  rocket: (
    <>
      <path d="M12 3c3.5 0 6.5 2 7.5 6 .7 2.7.3 5.5-1.5 7.5l-1.5-1-.5 2.5h-4l-1-1.5-2.5 1v-4L8 12c-1.5-2-1-4.5-.5-6C6.5 4 9.5 3 12 3Z" />
      <circle cx="12" cy="9" r="1.8" />
      <path d="m4.5 14.5 2.8 2.4M6.5 8.5l2.6.8M12 21l1.2-2.4" />
    </>
  ),
  box: (
    <>
      <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
      <path d="M4 7.5 12 12l8-4.5M12 12v9" />
    </>
  ),
  github: (
    <>
      <path d="M9.5 17.5c-2 .6-3.5-.5-4.5-1" />
      <path d="M9.5 20.5c.2-.8.2-1.5-.2-2.2 1.9-.2 3.7-1 4.5-2.9 1.2-2.8-.1-5.9-2.4-6.5.3-1.1.4-2.4-.3-3.4 1.3-.4 2.7.3 3.4 1.4 1.3-.6 2.8-.8 4.1-.4.8.4 1.3 1.2 1.6 2 .2.6.4 1.3.6 1.9" />
      <path d="M9.2 20.5c-.6.2-1.1-.2-1.2-.8" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2.5" />
      <path d="M8 11v5.5M8 8.2v.1M12 16.5v-3a2.2 2.2 0 0 1 4.4 0v3" />
    </>
  ),
  link: (
    <>
      <path d="M10 14a4 4 0 0 0 6.4.8l2.3-2.3a4 4 0 0 0-5.7-5.7L11.9 8" />
      <path d="M14 10a4 4 0 0 0-6 .9l-2.4 2.3a4 4 0 0 0 5.7 5.7l1.4-1.4" />
    </>
  ),
  copy: (
    <>
      <rect x="9" y="9" width="12" height="12" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </>
  ),
  trophy: (
    <>
      <path d="M8 21h8m-4-4v4M7 4h10v5a5 5 0 0 1-10 0V4Z" />
      <path d="M7 6H4.5a2 2 0 0 0 0 4H7m10-4h2.5a2 2 0 0 1 0 4H17" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.8 19.5c.6-3.2 3-5 6.2-5s5.6 1.8 6.2 5" />
      <path d="M16 5.2a3.5 3.5 0 0 1 0 6M17.5 14.6c1.8.5 3 1.8 3.4 4.4" />
    </>
  ),
  eye: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  pen: (
    <>
      <path d="m14.5 5.5 4 4L8 21H4v-4L14.5 5.5Z" />
      <path d="m12.5 7.5 4 4" />
    </>
  ),
  alert: (
    <>
      <path d="M12 3.5 22 20H2L12 3.5Z" />
      <path d="M12 9.5v4.5M12 17v.1" />
    </>
  ),
  "map-pin": (
    <>
      <path d="M12 21s7-6.2 7-11.5a7 7 0 0 0-14 0C5 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.6" />
    </>
  ),
  gauge: (
    <>
      <path d="M4.5 17.5A9 9 0 1 1 19.5 17.5" />
      <path d="M12 14 16 8.5" />
      <circle cx="12" cy="14" r="1.2" fill="currentColor" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3.5 13.5 8.5 4.7 8.5-4.7M3.5 17l8.5 4.7L21 17" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 4.5 6v6.5c0 4.5 3 7 7.5 8.5 4.5-1.5 7.5-4 7.5-8.5V6L12 3Z" />
      <path d="m9 11.5 2 2 4-4" />
    </>
  ),
  moon: <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.5m0 14v2.5M2.5 12h2.5m14 0h2.5M5 5l1.8 1.8M17.2 17.2 19 19M19 5l-1.8 1.8M6.8 17.2 5 19" />
    </>
  ),
  sparkle: (
    <path d="M12 3.5c.6 4.2 1.5 5.4 5.5 6-4.2.7-4.9 2-5.5 6.5-.6-4.5-1.3-5.8-5.5-6.5 4-.6 4.9-1.8 5.5-6Z" />
  ),
  command: (
    <>
      <path d="M9 9V6.5A2.5 2.5 0 1 0 6.5 9H9Zm6 0H9m6 0h2.5A2.5 2.5 0 1 0 15 6.5V9ZM15 9v6m0 0h2.5a2.5 2.5 0 1 1-2.5 2.5V15ZM9 15v2.5A2.5 2.5 0 1 1 6.5 15H9Zm0 0h6" />
    </>
  ),
  play: <path d="M8 5.5v13l10-6.5-10-6.5Z" />,
  x: <path d="m6 6 12 12M18 6 6 18" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
};

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
}

export function Icon({ name, size = 20, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {PATHS[name]}
    </svg>
  );
}