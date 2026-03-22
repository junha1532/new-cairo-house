import { Container } from "@/components/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { cairoProperty } from "@/content/property";

export const metadata = {
  title: "Cairo Stay",
  description:
    "A curated room rental in New Cairo — quiet, premium, and concierge-supported."
};

export default function RoomRentalPage() {
  return (
    <Container className="py-14">
      <div className="grid gap-10 md:grid-cols-2 md:items-start">
        <div>
          <p className="text-xs font-medium text-sand-700">
            Curated room rental • {cairoProperty.neighborhood}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            {cairoProperty.name}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600">
            {cairoProperty.description}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="/contact?topic=room">Inquire about availability</ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Plan a full trip
            </ButtonLink>
          </div>

          <div className="mt-10">
            <div className="text-sm font-semibold text-zinc-950">
              What makes it special
            </div>
            <ul className="mt-4 space-y-3 text-sm text-zinc-700">
              {cairoProperty.whatMakesItSpecial.map((x) => (
                <li key={x} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-sand-500" />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <div className="aspect-[4/3] overflow-hidden rounded-3xl border border-zinc-950/10 bg-gradient-to-br from-sand-100 via-white to-sand-50 shadow-soft" />

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-zinc-950/10 bg-gradient-to-br from-white to-sand-50" />
            <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-zinc-950/10 bg-gradient-to-br from-white to-sand-50" />
            <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-zinc-950/10 bg-gradient-to-br from-white to-sand-50" />
            <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-zinc-950/10 bg-gradient-to-br from-white to-sand-50" />
          </div>

          <Card>
            <CardHeader>
              <div className="text-sm font-semibold text-zinc-950">Amenities</div>
              <div className="mt-1 text-xs text-zinc-500">
                Replace with your exact amenities list.
              </div>
            </CardHeader>
            <CardBody>
              <div className="grid gap-3 text-sm text-zinc-700 sm:grid-cols-2">
                {cairoProperty.amenities.map((a) => (
                  <div
                    key={a.label}
                    className="rounded-2xl border border-zinc-950/10 bg-white p-4"
                  >
                    <div className="font-medium text-zinc-950">{a.label}</div>
                    {a.description ? (
                      <div className="mt-1 text-xs leading-relaxed text-zinc-600">
                        {a.description}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card className="bg-sand-50">
            <CardHeader>
              <div className="text-sm font-semibold text-zinc-950">
                Image checklist (what you need)
              </div>
              <div className="mt-1 text-xs text-zinc-600">
                Put these files into `public/images/` (same filenames).
              </div>
            </CardHeader>
            <CardBody>
              <ul className="space-y-2 text-sm text-zinc-700">
                {cairoProperty.imageRequirements.map((img) => (
                  <li key={img.filename} className="flex items-start gap-3">
                    <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-sand-500" />
                    <div>
                      <div className="font-medium text-zinc-950">
                        {img.filename}
                      </div>
                      <div className="text-xs text-zinc-600">
                        {img.recommendedSize} • {img.alt}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        </div>
      </div>
    </Container>
  );
}

