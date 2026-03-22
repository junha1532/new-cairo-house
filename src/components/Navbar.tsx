import Link from "next/link";
import { Container } from "@/components/Container";
import { ButtonLink } from "@/components/ui/Button";

const navItems: Array<{ href: string; label: string }> = [
  { href: "/plan", label: "Plan My Trip" },
  { href: "/packages", label: "Packages" },
  { href: "/room", label: "Cairo Stay" },
  { href: "/contact", label: "Contact" }
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-950/10 bg-white/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="group inline-flex items-baseline gap-2">
          <span className="text-sm font-semibold tracking-tight text-zinc-950">
            New Cairo House
          </span>
          <span className="hidden text-xs text-zinc-500 sm:inline">
            Egypt travel concierge
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-zinc-700 transition hover:text-zinc-950"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://wa.me/201000000000"
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full bg-sand-100 px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-sand-200 sm:inline-flex"
            aria-label="Contact on WhatsApp"
          >
            WhatsApp
          </a>
          <ButtonLink href="/plan">Plan My Trip</ButtonLink>
        </div>
      </Container>
    </header>
  );
}

