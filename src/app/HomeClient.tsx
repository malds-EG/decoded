"use client";

import { useState } from "react";
import { Loader } from "@/features/intro";
import { Nav } from "@/features/nav/Nav";
import { Hero } from "@/features/hero";
import { Formats } from "@/features/formats";
import { FormatDrawer } from "@/features/formats/FormatDrawer";
import { SpeakerFormModal } from "@/features/speaker-form";
import type { Format } from "@/features/formats/formats.data";

export function HomeClient({
  before,
  after,
  footer,
}: {
  before: React.ReactNode;
  after: React.ReactNode;
  footer: React.ReactNode;
}) {
  const [formOpen, setFormOpen] = useState(false);
  const [activeFormat, setActiveFormat] = useState<Format | null>(null);
  const open = () => setFormOpen(true);

  return (
    <>
      <Loader />
      <Nav onApply={open} />
      <main id="main-content" className="flex flex-1 flex-col">
        <Hero onApply={open} />
        <div className="relative z-[10]">
          {before}
          <Formats onApply={open} onOpenFormat={setActiveFormat} />
          {after}
        </div>
        <div className="h-[var(--footer-height)] pointer-events-none" aria-hidden="true" />
        {footer}
      </main>
      <SpeakerFormModal isOpen={formOpen} onClose={() => setFormOpen(false)} />
      <FormatDrawer format={activeFormat} onClose={() => setActiveFormat(null)} onApply={open} />
    </>
  );
}
