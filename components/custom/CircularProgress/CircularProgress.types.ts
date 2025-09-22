export interface CircularProgressProps {
  value: number;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | number;
  strokeWidth?: number;
  label?: string;
  showPercentage?: boolean;
  variant?: "default" | "success" | "warning" | "danger" | "info";
  className?: string;
  animated?: boolean;
  showBackground?: boolean;
  children?: React.ReactNode;
  shape?: "full" | "half";
}

export const sizeConfig = {
  xs: { diameter: 60, stroke: 4, text: "text-sm", label: "text-xs" },
  sm: { diameter: 80, stroke: 6, text: "text-base", label: "text-xs" },
  md: { diameter: 120, stroke: 8, text: "text-xl", label: "text-sm" },
  lg: { diameter: 160, stroke: 10, text: "text-2xl", label: "text-base" },
  xl: { diameter: 200, stroke: 12, text: "text-3xl", label: "text-lg" },
};

export const variantColors = {
  default: {
    progress: "stroke-primary-600",
    background: "stroke-primary-50",
    text: "text-gray-500",
    label: "text-gray-900",
  },
  success: {
    progress: "stroke-green-600",
    background: "stroke-green-50",
    text: "text-green-500",
    label: "text-green-900",
  },
  warning: {
    progress: "stroke-yellow-600",
    background: "stroke-yellow-50",
    text: "text-yellow-500",
    label: "text-yellow-600",
  },
  danger: {
    progress: "stroke-error-600",
    background: "stroke-error-50",
    text: "text-error-500",
    label: "text-error-900",
  },
  info: {
    progress: "stroke-cyan-600",
    background: "stroke-cyan-50",
    text: "text-cyan-500",
    label: "text-cyan-900",
  },
};
