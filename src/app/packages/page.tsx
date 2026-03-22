import { Container } from "@/components/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { packages } from "@/content/packages";

function formatUsd(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(amount);
}

export const metadata = {
  title: "Packages",
  description: "Sample 7‑day Egypt itineraries with premium pacing and support."
};

export default function PackagesPage() {
  return (
    <Container className="py-14">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight">
          Sample 1‑week Egypt packages
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-600">
          Choose a starting point, then we tailor it. Pricing is a rough guide
          and varies by season, hotel level, and private touring preferences.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {packages.map((p) => (
          <Card key={p.slug} className="flex flex-col">
            <CardHeader>
              <div className="text-xs font-medium text-sand-700">
                {p.tier} • {p.duration}
              </div>
              <div className="mt-2 text-xl font-semibold tracking-tight">
                {p.title}
              </div>
              <div className="mt-4 flex items-baseline justify-between">
                <div className="text-sm text-zinc-500">From</div>
                <div className="text-2xl font-semibold text-zinc-950">
                  {formatUsd(p.fromPriceUsd)}
                </div>
              </div>
            </CardHeader>
            <CardBody className="flex flex-1 flex-col">
              <ul className="space-y-2 text-sm text-zinc-700">
                {p.highlights.map((h) => (
                  <li key={h} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-sand-500" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-1 items-end">
                <ButtonLink href={`/contact?package=${encodeURIComponent(p.title)}`}>
                  Inquire about this package
                </ButtonLink>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="mt-12 rounded-3xl border border-zinc-950/10 bg-sand-50 p-8">
        <div className="text-sm font-semibold text-zinc-950">
          What’s included (typical)
        </div>
        <div className="mt-4 grid gap-4 text-sm text-zinc-700 sm:grid-cols-2">
          <div className="rounded-2xl bg-white p-5">
            Private driver coordination + transfers
          </div>
          <div className="rounded-2xl bg-white p-5">
            Vetted guide options (Egyptologist available)
          </div>
          <div className="rounded-2xl bg-white p-5">
            Hotel recommendations + booking guidance
          </div>
          <div className="rounded-2xl bg-white p-5">
            Day-by-day plan with pacing + backup options
          </div>
        </div>
      </div>
    </Container>
  );
}

