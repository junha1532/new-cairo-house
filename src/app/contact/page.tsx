import type { Metadata } from "next";
import { ContactForm } from "@/app/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Send an inquiry for a custom Egypt itinerary or Cairo stay."
};

export default function ContactPage() {
  return <ContactForm />;
}

