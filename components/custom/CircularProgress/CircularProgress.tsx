import { cn } from "@/lib/utils";
import {
  CircularProgressProps,
  sizeConfig,
  variantColors,
} from "./CircularProgress.types";

const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  size = "md",
  strokeWidth,
  label,
  showPercentage = true,
  variant = "default",
  className,
  animated = true,
  showBackground = true,
  children,
  shape = "full",
}) => {
  const clampedValue = Math.max(0, Math.min(100, value));

  const config =
    typeof size === "number"
      ? {
          diameter: size,
          stroke: strokeWidth || size * 0.067,
          text: "text-xl",
          label: "text-sm",
        }
      : sizeConfig[size];

  const diameter = config.diameter;
  const stroke = strokeWidth || config.stroke;
  const radius = (diameter - stroke) / 2;

  const colors = variantColors[variant];

  const isHalf = shape === "half";
  const circumference = isHalf ? Math.PI * radius : 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (clampedValue / 100) * circumference;

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center",
        className
      )}
    >
      <svg
        width={diameter}
        height={isHalf ? diameter / 2 : diameter}
        viewBox={`0 0 ${diameter} ${isHalf ? diameter / 2 : diameter}`}
        className={cn(isHalf ? "" : "transform -rotate-90")}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label || `Progress ${clampedValue}%`}
      >
        {isHalf ? (
          <>
            {showBackground && (
              <path
                d={`M ${stroke / 2} ${diameter / 2} 
                   A ${radius} ${radius} 0 0 1 ${diameter - stroke / 2} ${
                  diameter / 2
                }`}
                fill="transparent"
                strokeWidth={stroke}
                className={colors.background}
              />
            )}
            <path
              d={`M ${stroke / 2} ${diameter / 2} 
                 A ${radius} ${radius} 0 0 1 ${diameter - stroke / 2} ${
                diameter / 2
              }`}
              fill="transparent"
              strokeWidth={stroke}
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className={cn(
                colors.progress,
                animated && "transition-all duration-700 ease-in-out"
              )}
            />
          </>
        ) : (
          <>
            {showBackground && (
              <circle
                cx={diameter / 2}
                cy={diameter / 2}
                r={radius}
                fill="transparent"
                strokeWidth={stroke}
                className={colors.background}
              />
            )}
            <circle
              cx={diameter / 2}
              cy={diameter / 2}
              r={radius}
              fill="transparent"
              strokeWidth={stroke}
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className={cn(
                colors.progress,
                animated && "transition-all duration-700 ease-in-out"
              )}
              style={{ transformOrigin: "center" }}
            />
          </>
        )}
      </svg>

      <div
        className={cn(
          "absolute flex flex-col items-center justify-center px-2",
          {
            "inset-0": !isHalf,
          }
        )}
        style={
          isHalf
            ? {
                bottom: "0%",
                left: "50%",
                transform: "translateX(-50%) translateY(30%)",
              }
            : {}
        }
      >
        {children ? (
          children
        ) : (
          <>
            {showPercentage && (
              <span
                className={cn(
                  "font-semibold tabular-nums",
                  config.text,
                  colors.text
                )}
              >
                {Math.round(clampedValue)}%
              </span>
            )}
            {label && (
              <span
                className={cn(
                  "text-center leading-tight mt-1",
                  config.label,
                  colors.label
                )}
                style={!isHalf ? { maxWidth: `${diameter * 0.7}px` } : {}}
              >
                {label}
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CircularProgress;
