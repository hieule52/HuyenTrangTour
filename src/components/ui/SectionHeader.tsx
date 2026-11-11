import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  light?: boolean;
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
  light = false,
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        isCenter ? "text-center mx-auto max-w-3xl" : "max-w-2xl",
        className
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "inline-flex items-center gap-2 mb-3",
            isCenter && "justify-center"
          )}
        >
          <span className="h-0.5 w-6 bg-gold-500 rounded" />
          <span
            className={cn(
              "text-xs font-semibold uppercase tracking-widest",
              light ? "text-gold-300" : "text-gold-600"
            )}
          >
            {eyebrow}
          </span>
          <span className="h-0.5 w-6 bg-gold-500 rounded" />
        </div>
      )}

      <h2
        className={cn(
          "font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight",
          light ? "text-white" : "text-brand-500"
        )}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={cn(
            "mt-4 text-base md:text-lg leading-relaxed",
            light ? "text-white/80" : "text-gray-600"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
