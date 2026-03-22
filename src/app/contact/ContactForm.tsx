"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/Container";
import { Button } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { FieldHint, Input, Label, Textarea } from "@/components/ui/Field";

type InquiryPayload = {
  name: string;
  email: string;
  travelDates: string;
  budget: string;
  message: string;
  inquiryType: "general" | "trip";
  people?: string;
  rooms?: string;
  packageInterest?: string;
  topic?: string;
  plannerSummary?: string;
  approxQuoteUsd?: number;
};

function isEmail(value: string) {
  return /^\S+@\S+\.\S+$/.test(value);
}

export function ContactForm() {
  const searchParams = useSearchParams();

  const prefill = useMemo(() => {
    const typeParam = searchParams.get("type");
    return {
      packageInterest: searchParams.get("package") ?? "",
      topic: searchParams.get("topic") ?? "",
      type: (typeParam === "trip" ? "trip" : "general") as "trip" | "general",
      travelDates: searchParams.get("travelDates") ?? "",
      plannerSummary: searchParams.get("plan"),
      approxQuote: searchParams.get("approxQuote")
    };
  }, [searchParams]);

  const [form, setForm] = useState<InquiryPayload>({
    name: "",
    email: "",
    travelDates: prefill.travelDates || "",
    budget: prefill.approxQuote || "",
    message:
      prefill.type === "trip" && prefill.plannerSummary
        ? "Trip inquiry created from the planner. Your draft plan is attached — feel free to add context or preferences below."
        : "",
    inquiryType: prefill.type,
    people: undefined,
    rooms: undefined,
    packageInterest: prefill.packageInterest || undefined,
    topic: prefill.topic || undefined,
    plannerSummary: prefill.plannerSummary || undefined,
    approxQuoteUsd: prefill.approxQuote ? Number(prefill.approxQuote) || undefined : undefined
  });

  const [status, setStatus] = useState<
    | { state: "idle" }
    | { state: "submitting" }
    | { state: "success" }
    | { state: "error"; message: string }
  >({ state: "idle" });

  const isValid =
    form.name.trim().length >= 2 &&
    isEmail(form.email.trim()) &&
    form.message.trim().length >= 10;

  async function submit() {
    setStatus({ state: "submitting" });
    try {
      const res = await fetch("https://formspree.io/f/YOUR_FORMSPREE_ID", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form)
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(body?.error || "Something went wrong.");
      }
      setStatus({ state: "success" });
      setForm({
        name: "",
        email: "",
        travelDates: "",
        budget: "",
        message: "",
        inquiryType: prefill.type,
        people: undefined,
        rooms: undefined,
        packageInterest: prefill.packageInterest || undefined,
        topic: prefill.topic || undefined,
        plannerSummary: prefill.plannerSummary || undefined,
        approxQuoteUsd: prefill.approxQuote ? Number(prefill.approxQuote) || undefined : undefined
      });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Something went wrong.";
      setStatus({ state: "error", message: msg });
    }
  }

  return (
    <Container className="py-14">
      <div className="grid gap-10 md:grid-cols-2 md:items-start">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Plan your Egypt trip
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600">
            Tell us your dates, budget range, and what you care about (comfort,
            photography, history, food, shopping, slow pace). We’ll reply with
            next steps within 24–48 hours.
          </p>

          <div className="mt-8 rounded-3xl border border-zinc-950/10 bg-sand-50 p-6">
            <div className="text-sm font-semibold text-zinc-950">
              Prefer WhatsApp?
            </div>
            <p className="mt-2 text-sm text-zinc-700">
              You can message us directly for quick questions or availability.
            </p>
            <a
              className="mt-4 inline-flex items-center justify-center rounded-full bg-zinc-950 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-800"
              href="https://wa.me/201000000000"
              target="_blank"
              rel="noreferrer"
            >
              Message on WhatsApp
            </a>
            <FieldHint>
              Replace the phone number in `Navbar`, `Footer`, and this page.
            </FieldHint>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="text-sm font-semibold text-zinc-950">Inquiry</div>
            <div className="mt-1 text-xs text-zinc-500">
              This MVP submits to a mock endpoint that logs server-side.
            </div>
          </CardHeader>
          <CardBody>
            {status.state === "success" ? (
              <div className="rounded-2xl border border-emerald-900/10 bg-emerald-50 p-4 text-sm text-emerald-900">
                Received — thank you. We’ll reply soon.
              </div>
            ) : null}
            {status.state === "error" ? (
              <div className="rounded-2xl border border-red-900/10 bg-red-50 p-4 text-sm text-red-900">
                {status.message}
              </div>
            ) : null}

            <div className="mt-6 grid gap-5">
              <div>
                <Label htmlFor="inquiryType">Inquiry type</Label>
                <select
                  id="inquiryType"
                  name="inquiryType"
                  className="mt-2 w-full rounded-xl border border-zinc-950/10 bg-white px-3 py-2.5 text-sm text-zinc-950 shadow-sm outline-none transition focus:border-sand-300 focus:ring-4 focus:ring-sand-100"
                  value={form.inquiryType}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      inquiryType: e.target.value as "general" | "trip"
                    }))
                  }
                >
                  <option value="general">General inquiry</option>
                  <option value="trip">Trip inquiry (from planner)</option>
                </select>
                <FieldHint>
                  Trip inquiries are our main focus — choose this if you used
                  the planner or have specific dates in mind.
                </FieldHint>
              </div>

              {form.inquiryType === "trip" && form.plannerSummary ? (
                <div className="rounded-2xl border border-sand-300 bg-sand-50 p-5 text-xs text-zinc-700 shadow-sm mt-4">
                  <div className="font-semibold text-zinc-950 text-sm mb-3">Your Planned Trip Summary</div>
                  {(() => {
                    try {
                      const parsed = JSON.parse(form.plannerSummary);
                      return (
                        <>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                            <div>
                              <div className="text-zinc-500 font-medium">Dates</div>
                              <div className="font-semibold text-zinc-950">
                                {parsed.startDate ? new Date(parsed.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "--"}
                                {parsed.nights ? ` (${parsed.nights} nights)` : ""}
                              </div>
                            </div>
                            <div>
                              <div className="text-zinc-500 font-medium">People</div>
                              <div className="font-semibold text-zinc-950">{parsed.people || "--"}</div>
                            </div>
                            <div>
                              <div className="text-zinc-500 font-medium">Rooms</div>
                              <div className="font-semibold text-zinc-950">{parsed.rooms || "--"}</div>
                            </div>
                            <div>
                              <div className="text-zinc-500 font-medium">Approx. Quote</div>
                              <div className="font-semibold text-zinc-950">
                                {parsed.approxTotalUsd ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(parsed.approxTotalUsd) : "--"}
                              </div>
                            </div>
                          </div>
                          {parsed.segments && parsed.segments.length > 0 && (
                            <div className="space-y-2 mt-2">
                              {parsed.segments.map((seg: any, idx: number) => (
                                <div key={idx} className="bg-white rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border border-zinc-950/5 shadow-soft">
                                  <div>
                                    <div className="font-semibold text-zinc-950">{seg.title}</div>
                                    <div className="text-zinc-500">{seg.location}</div>
                                  </div>
                                  <div className="text-right">
                                    <div className="font-medium text-zinc-900">{seg.days} days</div>
                                    <div className="text-zinc-500 font-semibold">{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(seg.approxCostUsd)}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </>
                      );
                    } catch {
                      return (
                        <div>
                          We received your draft trip from the planner, including dates,
                          selected blocks, and approximate quote. We&apos;ll use this as
                          a starting point when we reply.
                        </div>
                      );
                    }
                  })()}
                </div>
              ) : null}

              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  autoComplete="name"
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, email: e.target.value }))
                  }
                  autoComplete="email"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="travelDates">Travel dates</Label>
                  <Input
                    id="travelDates"
                    name="travelDates"
                    placeholder="e.g. Oct 10–17"
                    value={form.travelDates}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, travelDates: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="budget">Budget</Label>
                  <Input
                    id="budget"
                    name="budget"
                    placeholder="e.g. $5k–$8k for two"
                    value={form.budget}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, budget: e.target.value }))
                    }
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Tell us what you want to do, your comfort level, and any must-sees."
                  value={form.message}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, message: e.target.value }))
                  }
                />
                <FieldHint>
                  Minimum 10 characters. We’ll follow up with a short
                  questionnaire.
                </FieldHint>
              </div>

              <Button
                type="submit"
                disabled={!isValid || status.state === "submitting"}
                onClick={submit}
                className="w-full"
              >
                {status.state === "submitting" ? "Sending…" : "Send inquiry"}
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </Container>
  );
}

