"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/Container";
import { Button } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { FieldHint, Input, Label } from "@/components/ui/Field";
import { travelItems } from "@/content/travelItems";

type PlannerState = {
  startDate: string;
  nights: string;
  people: string;
  rooms: string;
};

type SelectedItem = {
  id: string;
  days: number;
};

function getSeason(date: Date | null): "Winter" | "Spring" | "Summer" | "Autumn" | null {
  if (!date) return null;
  const month = date.getMonth() + 1;
  if (month === 12 || month <= 2) return "Winter";
  if (month >= 3 && month <= 5) return "Spring";
  if (month >= 6 && month <= 8) return "Summer";
  return "Autumn";
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric"
  });
}

export function PlanTripApp() {
  const router = useRouter();
  const [state, setState] = useState<PlannerState>({
    startDate: "",
    nights: "",
    people: "",
    rooms: ""
  });
  const [selected, setSelected] = useState<SelectedItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [daysByItem, setDaysByItem] = useState<Record<string, string>>({});
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const startDate = useMemo(
    () => (state.startDate ? new Date(state.startDate) : null),
    [state.startDate]
  );
  const nights = Number(state.nights) || 0;
  const people = Number(state.people) || 0;
  const rooms = Number(state.rooms) || 0;
  const season = getSeason(startDate);

  const totalDaysUsed = selected.reduce((sum, item) => sum + item.days, 0);

  const canRecommend = !!startDate && nights > 0;

  const filteredItems = useMemo(() => {
    if (!season) return travelItems;
    return travelItems.filter((item) => item.idealSeasons.includes(season));
  }, [season]);

  const [openCostId, setOpenCostId] = useState<string | null>(null);

  function formatUsd(amount: number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    }).format(amount);
  }

  function computeApproxCostUsd(itemId: string, days: number): number {
    const spec = travelItems.find((t) => t.id === itemId);
    if (!spec) return 0;
    const effectivePeople = people > 0 ? people : 2;
    const effectiveRooms = rooms > 0 ? rooms : 1;
    const carRate =
      effectivePeople > 3
        ? spec.baseCarUsdVanPerDay
        : spec.baseCarUsdSedanPerDay;
    const guide = spec.baseGuideUsd;
    const car = carRate * days;
    const hotel = spec.perRoomPerNightUsd * effectiveRooms * days;
    const activities = spec.perPersonActivityPerDayUsd * effectivePeople * days;
    return guide + car + hotel + activities;
  }

  function computeCostBreakdown(itemId: string, days: number) {
    const spec = travelItems.find((t) => t.id === itemId);
    if (!spec) return null;
    const effectivePeople = people > 0 ? people : 2;
    const effectiveRooms = rooms > 0 ? rooms : 1;
    const carIsVan = effectivePeople > 3;
    const carRate = carIsVan ? spec.baseCarUsdVanPerDay : spec.baseCarUsdSedanPerDay;
    const guide = spec.baseGuideUsd;
    const car = carRate * days;
    const roomsCost = spec.perRoomPerNightUsd * effectiveRooms * days;
    const activities = spec.perPersonActivityPerDayUsd * effectivePeople * days;
    return {
      carIsVan,
      effectivePeople,
      effectiveRooms,
      guide,
      carRate,
      car,
      roomsCost,
      activities,
      total: guide + car + roomsCost + activities
    };
  }

  function handleAdd(id: string) {
    setError(null);
    const spec = travelItems.find((t) => t.id === id);
    if (!spec) return;

    if (!startDate || nights <= 0) {
      setError(
        "Enter your dates and total nights first — the planner needs them before adding items."
      );
      return;
    }

    const rawDays = Number(daysByItem[id]) || spec.minDays;
    const chosenDays = Math.max(spec.minDays, rawDays);

    if (nights < chosenDays) {
      setError(
        `"${spec.title}" is set to ${chosenDays} days but your total stay is only ${nights} nights. Increase your total days in Egypt to include it.`
      );
      return;
    }

    if (totalDaysUsed + chosenDays > nights) {
      setError(
        `Your current plan uses ${totalDaysUsed} of ${nights} nights. Remove something or add more days to include "${spec.title}".`
      );
      return;
    }

    if (selected.some((s) => s.id === id)) {
      setError("This item is already in your planned trip.");
      return;
    }

    setSelected((prev) => [...prev, { id, days: chosenDays }]);
  }

  function handleRemove(id: string) {
    setError(null);
    setSelected((prev) => prev.filter((x) => x.id !== id));
  }

  function scroll(direction: "left" | "right") {
    const node = scrollRef.current;
    if (!node) return;
    const amount = node.clientWidth * 0.7;
    node.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth"
    });
  }

  const segments = useMemo(() => {
    if (!startDate || selected.length === 0) return [];
    const segs: Array<{
      id: string;
      title: string;
      location: string;
      start: Date;
      end: Date;
      days: number;
      approxCostUsd: number;
    }> = [];
    let cursor = new Date(startDate);
    for (const entry of selected) {
      const spec = travelItems.find((t) => t.id === entry.id);
      if (!spec) continue;
      const end = addDays(cursor, entry.days);
      segs.push({
        id: spec.id,
        title: spec.title,
        location: spec.location,
        start: cursor,
        end,
        days: entry.days,
        approxCostUsd: computeApproxCostUsd(spec.id, entry.days)
      });
      cursor = end;
    }
    return segs;
  }, [startDate, selected]);

  const endDate =
    startDate && nights > 0 ? addDays(startDate, nights) : null;

  const approxTotalUsd = segments.reduce(
    (sum, seg) => sum + seg.approxCostUsd,
    0
  );

  function handleGoToContact() {
    if (!startDate || nights <= 0 || segments.length === 0) {
      setError(
        "Add at least one Egypt block and make sure dates are set before sending this plan."
      );
      return;
    }
    const payload = {
      startDate: state.startDate,
      nights,
      people: state.people,
      rooms: state.rooms,
      approxTotalUsd,
      segments: segments.map((seg) => ({
        id: seg.id,
        title: seg.title,
        location: seg.location,
        days: seg.days,
        start: seg.start.toISOString(),
        end: seg.end.toISOString(),
        approxCostUsd: seg.approxCostUsd
      }))
    };
    const encoded = encodeURIComponent(JSON.stringify(payload));
    router.push(
      `/contact?type=trip&plan=${encoded}&approxQuote=${encodeURIComponent(
        String(Math.round(approxTotalUsd))
      )}&travelDates=${encodeURIComponent(
        `${formatDate(startDate)} – ${endDate ? formatDate(endDate) : ""}`
      )}`
    );
  }

  return (
    <Container className="py-14 space-y-8">
      <div className="text-center">
        <p className="text-xs font-medium text-sand-700 uppercase tracking-wide">
          AI‑style planner (no login)
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">
          Plan your Egypt week in minutes.
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-600 max-w-2xl mx-auto">
          Answer a few questions, then drag‑free build a visual Egypt calendar.
          When you like the shape, send it to us and we’ll turn it into a
          hosted, concierge‑level itinerary.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col items-center justify-center gap-2 mb-6">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-sand-500 animate-bounce" />
            <h2 className="text-xl font-semibold text-zinc-950">
              Planned trip summary
            </h2>
          </div>
          <div className="text-sm text-zinc-500 text-center max-w-xl">
            Your calendar‑style snapshot. It updates live as you add Egypt blocks below.
          </div>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="hidden items-center gap-2 sm:flex ml-auto">
            <Button variant="ghost" onClick={() => scroll("left")}>
              ←
            </Button>
            <Button variant="ghost" onClick={() => scroll("right")}>
              →
            </Button>
          </div>
        </div>

        <Card>
          <CardBody className="space-y-4">
            <div className="flex flex-col gap-2 text-xs text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
              <div>
                {startDate && endDate ? (
                  <>
                    Trip window:{" "}
                    <span className="font-semibold">
                      {formatDate(startDate)} → {formatDate(endDate)}
                    </span>{" "}
                    ({nights} nights)
                  </>
                ) : (
                  <>Set a start date and nights to see your calendar fill in.</>
                )}
              </div>
              <div className="text-xs text-zinc-500">
                Used:{" "}
                <span className="font-semibold">
                  {totalDaysUsed} / {nights || "?"}
                </span>{" "}
                nights (based on your chosen days)
              </div>
            </div>

            <div className="relative">
              <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto rounded-2xl border border-dashed border-sand-300 bg-sand-50/60 px-4 py-4"
              >
                {segments.length === 0 ? (
                  <div className="flex min-w-full flex-col items-center justify-center text-xs text-zinc-500">
                    <div>We’re waiting for your input.</div>
                    <div className="mt-1">
                      Add Egypt blocks below to see your trip build itself
                      across the calendar.
                    </div>
                  </div>
                ) : (
                  segments.map((seg, index) => {
                    const startDay =
                      index === 0
                        ? 1
                        : segments
                            .slice(0, index)
                            .reduce((sum, s) => sum + s.days, 1);
                    const endDay = segments
                      .slice(0, index + 1)
                      .reduce((sum, s) => sum + s.days, 0);
                    return (
                      <div
                        key={seg.id}
                        className="flex min-w-[230px] flex-col rounded-2xl bg-white/95 px-4 py-3 text-xs shadow-soft ring-1 ring-sand-100"
                      >
                      {(() => {
                        const spec = travelItems.find((t) => t.id === seg.id);
                        if (!spec) return null;
                        return (
                          <div className="-mx-4 -mt-3 mb-3 overflow-hidden rounded-t-2xl border-b border-zinc-950/10 bg-black/80">
                            <video
                              className="h-24 w-full object-cover"
                              autoPlay
                              loop
                              muted
                              playsInline
                              poster={spec.posterSrc}
                            >
                              <source src={spec.videoSrc} type="video/mp4" />
                            </video>
                          </div>
                        );
                      })()}
                        <div className="text-[11px] uppercase text-sand-700">
                          Day {startDay} – {endDay}
                        </div>
                        <div className="mt-1 text-sm font-semibold text-zinc-950">
                          {seg.title}
                        </div>
                        <div className="text-[11px] text-zinc-500">
                          {seg.location}
                        </div>
                        <div className="mt-2 text-[11px] text-zinc-700">
                          {formatDate(seg.start)} → {formatDate(seg.end)}
                        </div>
                        <div className="mt-1 text-[11px] text-zinc-500">
                          {seg.days} night{seg.days === 1 ? "" : "s"}
                        </div>
                        <div className="mt-2 text-[11px] font-semibold text-zinc-900">
                          ~{" "}
                          {formatUsd(seg.approxCostUsd)}
                        </div>
                        <button
                          type="button"
                          className="mt-2 self-start text-[11px] font-medium text-red-700 underline underline-offset-4"
                          onClick={() => handleRemove(seg.id)}
                        >
                          Remove from plan
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {segments.length > 0 && (
              <div className="flex flex-col gap-3 border-t border-sand-200 pt-3 text-xs text-zinc-700 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  Approximate total for selected blocks:{" "}
                  <span className="font-semibold">
                    {formatUsd(approxTotalUsd)}
                  </span>
                  . This is a planning estimate only.
                </div>
                <Button
                  variant="primary"
                  className="sm:w-auto w-full"
                  onClick={handleGoToContact}
                >
                  Inquire about this trip
                </Button>
              </div>
            )}

            <FieldHint>
              This is a planning tool only. When you like the shape of your
              week, hit “Inquire about this trip” and we’ll receive these
              details with your message.
            </FieldHint>
          </CardBody>
        </Card>
      </div>

      <div className="mx-auto max-w-5xl space-y-10">
        <div className="space-y-10">
          <Card className="ring-2 ring-emerald-500/20 shadow-lg shadow-emerald-500/10">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="relative flex h-10 w-10 flex-none items-center justify-center rounded-full bg-emerald-50 ring-4 ring-emerald-50 shadow-sm overflow-hidden animate-bounce">
                  <div className="text-xl">🤖</div>
                </div>
                <div>
                  <div className="text-base font-semibold text-zinc-950">
                    Trip basics
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-[11px] font-medium text-emerald-600">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    Agent is waiting for your input...
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <div className="grid gap-4 sm:grid-cols-4">
                <div className="sm:col-span-1">
                  <Label htmlFor="startDate">Start date (Egypt)</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={state.startDate}
                    onChange={(e) =>
                      setState((s) => ({ ...s, startDate: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="nights">How many nights?</Label>
                  <Input
                    id="nights"
                    type="number"
                    min={1}
                    placeholder="e.g. 7"
                    value={state.nights}
                    onChange={(e) =>
                      setState((s) => ({ ...s, nights: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="people">How many people?</Label>
                  <Input
                    id="people"
                    type="number"
                    min={1}
                    placeholder="e.g. 2"
                    value={state.people}
                    onChange={(e) =>
                      setState((s) => ({ ...s, people: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="rooms">How many rooms?</Label>
                  <Input
                    id="rooms"
                    type="number"
                    min={1}
                    placeholder="e.g. 1"
                    value={state.rooms}
                    onChange={(e) =>
                      setState((s) => ({ ...s, rooms: e.target.value }))
                    }
                  />
                </div>
              </div>

              <FieldHint>
                We’re waiting on your answers — once you fill these in, the
                recommendations below will adapt automatically.
              </FieldHint>

              <div className="mt-3 rounded-2xl bg-sand-50 px-4 py-3 text-xs text-zinc-700">
                {canRecommend && season ? (
                  <>
                    Planning for{" "}
                    <span className="font-semibold">
                      {nights} night{nights === 1 ? "" : "s"}
                    </span>{" "}
                    in{" "}
                    <span className="font-semibold">
                      {season.toLowerCase()} season
                    </span>
                    . Suggestions below are tuned for this timing — feel free to
                    mix and match.
                  </>
                ) : (
                  <>
                    Once you set a start date and nights in Egypt, we’ll clearly
                    label that the itinerary is **based on your dates and
                    season** and unlock tailored building blocks.
                  </>
                )}
              </div>

              {people > 3 && (
                <div className="mt-2 rounded-2xl bg-zinc-950 px-4 py-3 text-xs text-sand-100">
                  With more than 3 travelers we’ll automatically switch you to a{" "}
                  <span className="font-semibold">van‑level vehicle</span> in
                  cost estimates and logistics.
                </div>
              )}
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <div className="text-base font-semibold text-zinc-950">
                Recommended Egypt building blocks
              </div>
              <div className="mt-1 text-xs text-zinc-500">
                Add items into your trip basket. Set how many days you&apos;d
                like to spend in each — we enforce minimums so you don&apos;t
                over‑pack.
              </div>
            </CardHeader>
            <CardBody>
              {error ? (
                <div className="mb-4 rounded-2xl border border-red-900/10 bg-red-50 p-3 text-xs text-red-900">
                  {error}
                </div>
              ) : null}
              <div className="grid gap-4 sm:grid-cols-2">
                {filteredItems.map((item) => {
                  const inTrip = selected.some((s) => s.id === item.id);
                  const chosenDaysRaw =
                    Number(daysByItem[item.id]) || item.minDays;
                  const chosenDays =
                    chosenDaysRaw < item.minDays ? item.minDays : chosenDaysRaw;
                  const approxCost = computeApproxCostUsd(item.id, chosenDays);
                  const breakdown = computeCostBreakdown(item.id, chosenDays);
                  return (
                    <div
                      key={item.id}
                      className="flex flex-col rounded-2xl border border-zinc-950/10 bg-white p-4"
                    >
                      <div className="text-sm font-semibold text-zinc-950">
                        {item.title}
                      </div>
                      <div className="mt-0.5 text-xs text-zinc-500">
                        {item.location}
                      </div>
                      <div className="mt-2 text-xs text-zinc-600">
                        {item.summary}
                      </div>
                      <div className="mt-3 flex items-center justify-between gap-3 text-xs text-zinc-700">
                        <div className="font-medium text-sand-700">
                          Min. {item.minDays} day
                          {item.minDays === 1 ? "" : "s"}
                        </div>
                        <div className="flex items-center gap-2">
                          <span>Days in plan:</span>
                          <Input
                            type="number"
                            min={item.minDays}
                            value={daysByItem[item.id] ?? String(item.minDays)}
                            onChange={(e) =>
                              setDaysByItem((prev) => ({
                                ...prev,
                                [item.id]: e.target.value
                              }))
                            }
                            className="h-8 w-16 px-2 py-1 text-xs"
                          />
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between gap-3 text-xs text-zinc-700">
                        <div>
                          ~ {formatUsd(approxCost)}
                        </div>
                        <div className="text-[11px] text-zinc-500">
                          Includes guide, car
                          {people > 3 ? " (van)," : ","} rooms & activities.
                        </div>
                      </div>
                      <div className="mt-2">
                        <button
                          type="button"
                          className="inline-flex items-center gap-2 text-[11px] font-medium text-zinc-700 underline decoration-zinc-300 underline-offset-4 hover:text-zinc-950"
                          onClick={() =>
                            setOpenCostId((prev) => (prev === item.id ? null : item.id))
                          }
                        >
                          <span
                            className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-zinc-950/10 bg-white text-[11px]"
                            aria-hidden="true"
                          >
                            i
                          </span>
                          Cost breakdown
                        </button>
                        {openCostId === item.id && breakdown ? (
                          <div className="mt-2 rounded-2xl border border-zinc-950/10 bg-sand-50 p-3 text-[11px] text-zinc-700">
                            <div className="font-semibold text-zinc-950">
                              Approximate breakdown ({chosenDays} day
                              {chosenDays === 1 ? "" : "s"})
                            </div>
                            <ul className="mt-2 space-y-1">
                              <li>
                                Guide (one-time): <span className="font-medium">{formatUsd(breakdown.guide)}</span>
                              </li>
                              <li>
                                Car ({breakdown.carIsVan ? "van" : "sedan"}):{" "}
                                <span className="font-medium">
                                  {formatUsd(breakdown.carRate)}/day × {chosenDays} = {formatUsd(breakdown.car)}
                                </span>
                              </li>
                              <li>
                                Rooms:{" "}
                                <span className="font-medium">
                                  {formatUsd(item.perRoomPerNightUsd)}/night × {breakdown.effectiveRooms} room
                                  {breakdown.effectiveRooms === 1 ? "" : "s"} × {chosenDays} ={" "}
                                  {formatUsd(breakdown.roomsCost)}
                                </span>
                              </li>
                              <li>
                                Activities/entrance (estimate):{" "}
                                <span className="font-medium">
                                  {formatUsd(item.perPersonActivityPerDayUsd)}/person/day × {breakdown.effectivePeople} × {chosenDays} ={" "}
                                  {formatUsd(breakdown.activities)}
                                </span>
                              </li>
                            </ul>
                            <div className="mt-2 border-t border-sand-200 pt-2 font-semibold text-zinc-950">
                              Total: {formatUsd(breakdown.total)}
                            </div>
                            <div className="mt-1 text-zinc-500">
                              This is not a final quote—season, hotels, and private touring preferences change totals.
                            </div>
                          </div>
                        ) : null}
                      </div>
                      <div className="mt-3 overflow-hidden rounded-2xl border border-zinc-950/10 bg-black/80">
                        <video
                          className="h-32 w-full object-cover"
                          autoPlay
                          loop
                          muted
                          playsInline
                          poster={item.posterSrc}
                        >
                          <source src={item.videoSrc} type="video/mp4" />
                        </video>
                      </div>
                      <Button
                        className="mt-4 w-full text-sm"
                        variant={inTrip ? "secondary" : "primary"}
                        disabled={inTrip}
                        onClick={() => handleAdd(item.id)}
                      >
                        {inTrip ? "In planned trip" : "Add to planned trip"}
                      </Button>
                    </div>
                  );
                })}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </Container>
  );
}

