import { cn } from "~/lib/utils";

export function MaxWidthWrapper({
  children,
  className,
  large = false,
}: {
  children: React.ReactNode;
  className?: string;
  large?: boolean;
}) {
  return (
    <div
      className={cn(
        "container",
        large ? "max-w-(--breakpoint-2xl)" : "max-w-6xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
