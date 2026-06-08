"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ApplyToSpeakButton } from "@/components";
import { heroContent } from "./hero.data";
import { HeroWave } from "./HeroWave";
import { useReducedMotion } from "@/hooks/useReducedMotion";


const FADE_TRANSITION = {
  duration: 0.8,
  ease: [0.4, 0, 0.2, 1] as const,
};

export function Hero({ onApply }: { onApply?: () => void }) {
  const reduced = useReducedMotion();

  const fadeIn = (delay: number) =>
    reduced ? {} : {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      transition: { ...FADE_TRANSITION, delay },
    };

  return (
      <section
        id="hero"
        className="relative z-[10] flex min-h-dvh w-full flex-col items-center justify-center gap-16 overflow-hidden bg-black px-0 py-[100px] text-white"
      >
      <div className="absolute inset-0 -z-[10]">
        <HeroWave />
      </div>
      <div className="relative z-[10] flex w-full max-w-[1440px] flex-col items-center justify-center overflow-hidden px-5 mt-12 md:px-8">
        <motion.div data-hero-logo className="flex w-full flex-col items-center justify-center" {...fadeIn(2.6)}>
          <Image
            src={heroContent.logo.src}
            alt={heroContent.logo.alt}
            width={heroContent.logo.width}
            height={heroContent.logo.height}
            priority
            style={{ width: "100%", maxWidth: "100%", height: "auto" }}
          />
        </motion.div>
        <div className="mt-12 md:mt-18 lg:mt-24 flex w-full md:w-[600px] lg:w-[1000px] flex-col items-center justify-center gap-8 text-center">
          <motion.h1
            className="w-[1000px] max-w-full font-body text-[16px] font-semibold leading-snug tracking-normal text-white lg:text-[20px]"
            {...fadeIn(3)}
          >
            {heroContent.headline}
          </motion.h1>
          <motion.div 
           className="flex flex-col items-center gap-[34px]"
            {...fadeIn(3.1)}
          > 
          <ApplyToSpeakButton onClick={onApply} />
           <div>
             <span className="font-body text-sm text-white">
              {heroContent.poweredBy.label}
            </span>
            <div className="flex items-center gap-[20px]">
              {heroContent.poweredBy.logos.map((logo) => (
                <Image
                  key={logo.alt}
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  style={{ height: "32px", width: "auto", filter: "brightness(0) invert(1)"}}
                />
              ))}
            </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}