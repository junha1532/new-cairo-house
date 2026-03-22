import type { Metadata } from "next";
import { PlanTripApp } from "@/app/plan/PlanTripApp";

export const metadata: Metadata = {
  title: "Plan My Trip",
  description:
    "Interactive Egypt trip planner that turns your dates and season into a visual 7‑day timeline."
};

export default function PlanPage() {
  return <PlanTripApp />;
}

