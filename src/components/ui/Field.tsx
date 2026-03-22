import { cn } from "@/lib/cn";

export function Label({
  htmlFor,
  children
}: {
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium text-zinc-900">
      {children}
    </label>
  );
}

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { className?: string }) {
  return (
    <input
      {...props}
      className={cn(
        "mt-2 w-full rounded-xl border border-zinc-950/10 bg-white px-3 py-2.5 text-sm text-zinc-950 shadow-sm outline-none transition placeholder:text-zinc-400 focus:border-sand-300 focus:ring-4 focus:ring-sand-100",
        className
      )}
    />
  );
}

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { className?: string }) {
  return (
    <textarea
      {...props}
      className={cn(
        "mt-2 w-full resize-none rounded-xl border border-zinc-950/10 bg-white px-3 py-2.5 text-sm text-zinc-950 shadow-sm outline-none transition placeholder:text-zinc-400 focus:border-sand-300 focus:ring-4 focus:ring-sand-100",
        className
      )}
    />
  );
}

export function FieldHint({ children }: { children: React.ReactNode }) {
  return <p className="mt-2 text-xs text-zinc-500">{children}</p>;
}

