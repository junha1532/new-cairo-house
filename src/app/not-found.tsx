import Link from "next/link";
import { Container } from "@/components/Container";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="py-16">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-sm font-medium text-sand-700">404</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          This page doesn’t exist.
        </h1>
        <p className="mt-3 text-zinc-600">
          If you were looking for a package or the Cairo stay, head back home and
          start from there.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <ButtonLink href="/">Back to Home</ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Contact
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}

