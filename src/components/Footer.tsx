import Link from "next/link";
import { Container } from "@/components/Container";

export function Footer() {
  return (
    <footer className="border-t border-zinc-950/10 bg-white">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="text-sm font-semibold tracking-tight">
              New Cairo House
            </div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-zinc-600">
              Boutique Egypt travel concierge for travelers who value comfort,
              authenticity, and a well-paced 7‑day plan.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 text-sm">
            <div className="space-y-2">
              <div className="font-medium text-zinc-950">Explore</div>
              <ul className="space-y-2 text-zinc-600">
                <li>
                  <Link className="hover:text-zinc-950" href="/packages">
                    Packages
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-zinc-950" href="/room">
                    Cairo Stay
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-zinc-950" href="/contact">
                    Inquiry
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <div className="font-medium text-zinc-950">Contact</div>
              <ul className="space-y-2 text-zinc-600">
                <li>
                  <a className="hover:text-zinc-950" href="mailto:hello@example.com">
                    hello@example.com
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-zinc-950"
                    href="https://wa.me/201000000000"
                    target="_blank"
                    rel="noreferrer"
                  >
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-950/10 bg-sand-50 p-6">
            <div className="text-sm font-medium text-zinc-950">
              What you’ll get
            </div>
            <ul className="mt-3 space-y-2 text-sm text-zinc-700">
              <li>Custom 7‑day itinerary + pacing</li>
              <li>Trusted drivers, guides, and bookings</li>
              <li>Curated Cairo stay (limited rooms)</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-zinc-950/10 pt-6 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} New Cairo House. All rights reserved.</p>
          <p>Not a marketplace. We plan and host in small numbers.</p>
        </div>
      </Container>
    </footer>
  );
}

