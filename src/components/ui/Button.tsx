import Link from "next/link";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-zinc-950 text-white hover:bg-zinc-800 focus-visible:outline-zinc-950",
  secondary:
    "bg-sand-100 text-zinc-950 hover:bg-sand-200 focus-visible:outline-sand-300",
  ghost:
    "bg-transparent text-zinc-950 hover:bg-zinc-950/5 focus-visible:outline-zinc-300"
};

export function Button({
  variant = "primary",
  className,
  children,
  type = "button",
  disabled,
  onClick
}: {
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium tracking-tight shadow-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className
}: {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium tracking-tight shadow-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </Link>
  );
}

