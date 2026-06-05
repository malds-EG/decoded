"use client";

import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { tickerWords } from "./ticker.data";

function TickerContent() {
  // Repeat words enough times so one segment is very wide.
  const items = useMemo(
    () => Array.from({ length: 8 }).flatMap(() => tickerWords),
    []
  );

  return (
    <div className="flex shrink-0 items-center gap-8 pr-8 md:gap-[30px] md:pr-[30px]">
      {items.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span className="font-headline text-[48px] font-semibold tracking-tight text-black uppercase">
            {word}
          </span>

          <Image
            src="/red-logo.svg"
            alt=""
            aria-hidden
            width={72}
            height={72}
            className="block size-[72px] shrink-0 md:size-[64px]"
          />
        </Fragment>
      ))}
    </div>
  );
}

export function Ticker() {
  const measureRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (measureRef.current) {
        setContentWidth(measureRef.current.scrollWidth);
      }
    };

    updateWidth();

    const resizeObserver = new ResizeObserver(updateWidth);

    if (measureRef.current) {
      resizeObserver.observe(measureRef.current);
    }

    window.addEventListener("resize", updateWidth);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  return (
    <section
      aria-hidden
      className="relative z-[10] flex h-[75px] items-center overflow-hidden bg-white"
    >
      {/* Hidden measuring copy */}
      <div
        ref={measureRef}
        className="absolute invisible left-0 top-0"
      >
        <TickerContent />
      </div>

      {contentWidth > 0 && (
        <motion.div
          className="flex"
          animate={{ x: [0, -contentWidth] }}
          transition={{
            duration: 90,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          <TickerContent />
          <TickerContent />
        </motion.div>
      )}
    </section>
  );
}