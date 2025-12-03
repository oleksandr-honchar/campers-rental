// SVG іконки для FiltersSidebar

interface IconProps {
  className?: string;
}

// Іконка локації (map pin)
export const LocationIcon = ({ className }: IconProps) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 1C6.68629 1 4 3.68629 4 7C4 11.5 10 18 10 18C10 18 16 11.5 16 7C16 3.68629 13.3137 1 10 1Z"
      stroke="#101828"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="10"
      cy="7"
      r="2"
      stroke="#101828"
      strokeWidth="1.5"
    />
  </svg>
);

// Іконка AC (кондиціонер)
export const ACIcon = ({ className }: IconProps) => (
  <svg
    className={className}
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 11H28V21H4V11Z"
      stroke="#101828"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 11V9M24 11V9M8 23V21M24 23V21"
      stroke="#101828"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
    <path
      d="M12 16H20M16 13V19"
      stroke="#101828"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
  </svg>
);

// Іконка Automatic (коробка передач)
export const AutomaticIcon = ({ className }: IconProps) => (
  <svg
    className={className}
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16 4V28M16 4L12 8M16 4L20 8M16 28L12 24M16 28L20 24"
      stroke="#101828"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="16"
      cy="16"
      r="4"
      stroke="#101828"
      strokeWidth="1.3"
    />
  </svg>
);

// Іконка Kitchen (кухня)
export const KitchenIcon = ({ className }: IconProps) => (
  <svg
    className={className}
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 8H26V24H6V8Z"
      stroke="#101828"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="12"
      cy="14"
      r="2.5"
      stroke="#101828"
      strokeWidth="1.3"
    />
    <circle
      cx="20"
      cy="14"
      r="2.5"
      stroke="#101828"
      strokeWidth="1.3"
    />
    <path
      d="M10 20H22"
      stroke="#101828"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
  </svg>
);

// Іконка TV (телевізор)
export const TVIcon = ({ className }: IconProps) => (
  <svg
    className={className}
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="4"
      y="8"
      width="24"
      height="16"
      rx="2"
      stroke="#101828"
      strokeWidth="1.3"
    />
    <path
      d="M11 28H21M16 24V28"
      stroke="#101828"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
  </svg>
);

// Іконка Bathroom (ванна)
export const BathroomIcon = ({ className }: IconProps) => (
  <svg
    className={className}
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 16H26V24C26 25.1046 25.1046 26 24 26H8C6.89543 26 6 25.1046 6 24V16Z"
      stroke="#101828"
      strokeWidth="1.3"
    />
    <path
      d="M10 16V10C10 7.79086 11.7909 6 14 6H18C20.2091 6 22 7.79086 22 10V16"
      stroke="#101828"
      strokeWidth="1.3"
    />
    <circle
      cx="16"
      cy="10"
      r="1.5"
      fill="#101828"
    />
  </svg>
);

// Іконка Van (фургон)
export const VanIcon = ({ className }: IconProps) => (
  <svg
    className={className}
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 14H32V24H8V14Z"
      stroke="#101828"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="14"
      cy="28"
      r="2"
      stroke="#101828"
      strokeWidth="1.5"
    />
    <circle
      cx="26"
      cy="28"
      r="2"
      stroke="#101828"
      strokeWidth="1.5"
    />
    <path
      d="M8 24V28M32 24V28M8 14V12H12M32 14V12H28"
      stroke="#101828"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

// Іконка Fully Integrated
export const FullyIntegratedIcon = ({ className }: IconProps) => (
  <svg
    className={className}
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 16C6 14.8954 6.89543 14 8 14H32C33.1046 14 34 14.8954 34 16V26H6V16Z"
      stroke="#101828"
      strokeWidth="1.5"
    />
    <circle
      cx="12"
      cy="30"
      r="2"
      stroke="#101828"
      strokeWidth="1.5"
    />
    <circle
      cx="28"
      cy="30"
      r="2"
      stroke="#101828"
      strokeWidth="1.5"
    />
    <path
      d="M10 14V12C10 10.8954 10.8954 10 12 10H28C29.1046 10 30 10.8954 30 12V14"
      stroke="#101828"
      strokeWidth="1.5"
    />
    <rect
      x="14"
      y="18"
      width="4"
      height="6"
      rx="1"
      stroke="#101828"
      strokeWidth="1.3"
    />
    <rect
      x="22"
      y="18"
      width="4"
      height="6"
      rx="1"
      stroke="#101828"
      strokeWidth="1.3"
    />
  </svg>
);

// Іконка Alcove
export const AlcoveIcon = ({ className }: IconProps) => (
  <svg
    className={className}
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 18H32V28H8V18Z"
      stroke="#101828"
      strokeWidth="1.5"
    />
    <path
      d="M12 18V14H28V18"
      stroke="#101828"
      strokeWidth="1.5"
    />
    <circle
      cx="14"
      cy="32"
      r="2"
      stroke="#101828"
      strokeWidth="1.5"
    />
    <circle
      cx="26"
      cy="32"
      r="2"
      stroke="#101828"
      strokeWidth="1.5"
    />
    <rect
      x="16"
      y="21"
      width="8"
      height="4"
      rx="1"
      stroke="#101828"
      strokeWidth="1.3"
    />
  </svg>
);