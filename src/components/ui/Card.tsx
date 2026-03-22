import { cn } from "@/lib/cn";

export function Card({
  className,
  children
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-zinc-950/10 bg-white shadow-soft",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  children
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn("p-6 pb-4", className)}>{children}</div>;
}

export function CardBody({
  className,
  children
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn("px-6 pb-6", className)}>{children}</div>;
}

