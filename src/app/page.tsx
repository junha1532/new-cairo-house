import Link from "next/link";
import { Container } from "@/components/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { packages } from "@/content/packages";
import { testimonials } from "@/content/testimonials";

function formatUsd(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(amount);
}

export default function HomePage() {
  const featured = packages.slice(0, 2);

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <video
            className="h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            poster="/new-cairo-house/images/egypt-hero-placeholder.jpg"
          >
            <source src="/new-cairo-house/video/egypt-intro.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-transparent" />
        </div>

        <Container className="relative py-14 sm:py-18">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="text-white">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs font-medium text-sand-100">
                Snapshot of Egypt in one glance
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                See your Egypt week come alive — then plan it with our AI‑style travel planner.
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-sand-100/90">
                High‑resolution Egypt footage, a curated mix of Cairo, Nile, and Red Sea
                moments, and a clear path to turn it into a real, concierge‑level trip.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ButtonLink href="/plan">
                  Plan My Trip with AI Travel Planner
                </ButtonLink>
                <ButtonLink href="/packages" variant="secondary">
                  Explore sample 7‑day trips
                </ButtonLink>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
                <div className="rounded-2xl border border-white/20 bg-black/40 p-4">
                  <div className="font-semibold text-white">Cairo & Giza</div>
                  <div className="mt-1 text-sand-100/80">
                    Museum, old Cairo, and pyramids.
                  </div>
                </div>
                <div className="rounded-2xl border border-white/20 bg-black/40 p-4">
                  <div className="font-semibold text-white">Nile & temples</div>
                  <div className="mt-1 text-sand-100/80">
                    Luxor, Aswan, and golden light on the river.
                  </div>
                </div>
                <div className="hidden rounded-2xl border border-white/20 bg-black/40 p-4 sm:block">
                  <div className="font-semibold text-white">Red Sea unwind</div>
                  <div className="mt-1 text-sand-100/80">
                    Clear water, long evenings, and quiet recovery.
                  </div>
                </div>
              </div>
            </div>

            <div className="relative hidden md:block">
              <div className="rounded-3xl border border-white/20 bg-black/40 p-5 shadow-soft backdrop-blur">
                <div className="text-xs font-medium uppercase tracking-wide text-sand-100/80">
                  Live preview of what&apos;s possible
                </div>
                <div className="mt-2 text-lg font-semibold text-white">
                  Cairo → Luxor → Aswan → Red Sea
                </div>
                <div className="mt-1 text-xs text-sand-100/80">
                  A smooth, 7‑day arc combining history, river, and rest.
                </div>
                <div className="mt-4 grid grid-cols-4 gap-3 text-[11px] text-sand-100/80">
                  <div className="rounded-2xl bg-black/40 px-3 py-2">
                    Day 1–2 • Cairo & Giza
                  </div>
                  <div className="rounded-2xl bg-black/40 px-3 py-2">
                    Day 3–4 • Luxor temples
                  </div>
                  <div className="rounded-2xl bg-black/40 px-3 py-2">
                    Day 5 • Aswan & Nile
                  </div>
                  <div className="rounded-2xl bg-black/40 px-3 py-2">
                    Day 6–7 • Red Sea unwind
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14">
        <Container>
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Sample 7‑day packages
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-600">
                These are starting points. We customize based on your dates,
                comfort level, interests, and travel style.
              </p>
            </div>
            <div className="hidden sm:block">
              <ButtonLink href="/packages" variant="secondary">
                See all packages
              </ButtonLink>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {featured.map((p) => (
              <Card key={p.slug} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs font-medium text-sand-700">
                        {p.tier} • {p.duration}
                      </div>
                      <div className="mt-2 text-xl font-semibold tracking-tight">
                        {p.title}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-zinc-500">From</div>
                      <div className="text-lg font-semibold">
                        {formatUsd(p.fromPriceUsd)}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardBody>
                  <ul className="space-y-2 text-sm text-zinc-700">
                    {p.highlights.slice(0, 4).map((h) => (
                      <li key={h} className="flex gap-2">
                        <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-sand-500" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <ButtonLink href="/contact">Inquire</ButtonLink>
                    <Link
                      href="/packages"
                      className="text-sm font-medium text-zinc-700 underline decoration-zinc-300 underline-offset-4 hover:text-zinc-950"
                    >
                      View details
                    </Link>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-zinc-950/10 bg-sand-50 py-14">
        <Container>
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                A curated Cairo stay
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                We host a small number of guests in New Cairo. It’s not a
                marketplace listing — it’s a reliable, calm base that pairs well
                with premium planning.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ButtonLink href="/room">See the room rental</ButtonLink>
                <ButtonLink href="/contact" variant="secondary">
                  Ask about availability
                </ButtonLink>
              </div>
            </div>
            <div className="rounded-3xl border border-zinc-950/10 bg-white p-6 shadow-soft">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ["Quiet sleep", "Blackout curtains + calm street"],
                  ["Clean standard", "Hotel-grade linens + checks"],
                  ["Fast logistics", "Transfers and timing help"],
                  ["Local support", "On-call recommendations"]
                ].map(([title, sub]) => (
                  <div key={title} className="rounded-2xl bg-sand-50 p-4">
                    <div className="text-sm font-semibold text-zinc-950">
                      {title}
                    </div>
                    <div className="mt-1 text-xs leading-relaxed text-zinc-600">
                      {sub}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14">
        <Container>
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Trusted by travelers who value comfort
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-600">
                An MVP site needs trust signals. These are example testimonials
                you can replace with real reviews.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <Card key={t.name}>
                <CardHeader>
                  <div className="text-sm font-semibold text-zinc-950">
                    {t.name}
                  </div>
                  <div className="text-xs text-zinc-500">{t.location}</div>
                </CardHeader>
                <CardBody>
                  <p className="text-sm leading-relaxed text-zinc-700">
                    “{t.quote}”
                  </p>
                </CardBody>
              </Card>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-3xl border border-zinc-950/10 bg-zinc-950 p-8 text-white md:flex-row md:items-center">
            <div>
              <div className="text-lg font-semibold tracking-tight">
                Ready for a calm, premium Egypt plan?
              </div>
              <div className="mt-1 text-sm text-white/70">
                Send an inquiry — we’ll reply with next steps and a short
                questionnaire.
              </div>
            </div>
            <ButtonLink href="/contact" className="bg-white text-zinc-950 hover:bg-white/90">
              Plan My Trip
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}

