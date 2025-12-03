// src/components/Careers.tsx
import React from "react";
import { Link } from "react-router-dom";

type RoleId = "frontend" | "backend" | "marketing";

type Position = {
  id: RoleId;
  title: string;
  department: string;
  location: string;
  type: string;
  seatsTotal: number;
  seatsOpen: number;
};

const POSITIONS: Position[] = [
  {
    id: "frontend",
    title: "Front-End Developer — Product Interfaces (Intern)",
    department: "ENGINEERING",
    location: "Remote Worldwide",
    type: "Paid Internship",
    seatsTotal: 4,
    seatsOpen: 4,
  },
  {
    id: "backend",
    title: "Back-End Developer — Payments & Data (Intern)",
    department: "ENGINEERING",
    location: "Remote Worldwide",
    type: "Paid Internship",
    seatsTotal: 4,
    seatsOpen: 4,
  },
  {
    id: "marketing",
    title: "Marketing & Community — Growth Intern",
    department: "GROWTH",
    location: "Remote Worldwide",
    type: "Paid Internship",
    seatsTotal: 4,
    seatsOpen: 4,
  },
];

export default function Careers() {
  return (
    <section className="w-full bg-black text-white">
      <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 py-16 sm:py-20 md:py-24">
        {/* HEADER */}
        <header className="text-center mb-10 sm:mb-12 md:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-none">
            Open Internships
          </h1>
          <p className="mt-3 text-sm sm:text-base text-white/60 max-w-xl mx-auto">
            Early builders for DNDX and SRL L2. Paid, remote-friendly internships
            where you ship real things, not fake side projects.
          </p>
          <p className="mt-4 text-xs sm:text-sm text-white/55 max-w-2xl mx-auto">
            Already have a resume or deck ready? Email it directly to{" "}
            <a
              href="mailto:hello@dendrites.ai"
              className="underline decoration-white/30 hover:decoration-[#1850ebff]"
            >
              hello@dendrites.ai
            </a>
            {" "}
            with a quick note on what you want to build here.
          </p>

          {/* Top rule */}
          <div className="mt-10 h-px w-full bg-white/12" />
        </header>

        {/* LIST */}
        <div>
          {POSITIONS.map((role) => (
            <article
              key={role.id}
              className="group relative py-7 sm:py-8 md:py-9"
            >
              <div className="flex flex-col gap-4 sm:grid sm:grid-cols-[140px,minmax(0,1fr),210px] sm:items-center">
                {/* LEFT: department pill */}
                <div className="sm:justify-self-start">
                  <span className="inline-flex items-center rounded-full border border-white/16 px-4 py-1 text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-white/60">
                    {role.department}
                  </span>
                </div>

                {/* MIDDLE: title + meta */}
                <div>
                  <h2 className="text-lg sm:text-xl md:text-[22px] font-semibold leading-tight">
                    {role.title}
                  </h2>
                  <p className="mt-1 text-sm sm:text-base text-white/55">
                    {role.location}
                    <span className="mx-2 text-white/30">|</span>
                    {role.type}
                  </p>
                  <p className="mt-1.5 text-xs sm:text-sm text-white/45">
                    {role.seatsOpen} of {role.seatsTotal} seats currently open
                  </p>
                </div>

                {/* RIGHT: Apply */}
                <div className="sm:justify-self-end flex sm:block">
                  <div className="ml-auto flex flex-col items-end gap-1 group/apply">
                    <Link
                      to={`/careers/apply/${role.id}`}
                      className="inline-flex items-center gap-2 text-sm sm:text-base font-medium text-white/80 group-hover:text-white group-hover/apply:text-white transition-colors"
                    >
                      <span className="border-b border-transparent group-hover/apply:border-[#1850ebff] transition-colors">
                        Apply now
                      </span>
                      <span className="inline-block text-base leading-none transform transition-transform group-hover/apply:translate-x-0.5 group-hover/apply:-translate-y-0.5">
                        ↗
                      </span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* BOTTOM RULE */}
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-white/10 sm:left-[140px] group-hover:bg-white/20 transition-colors" />
            </article>
          ))}
        </div>

        {/* FOOTER NOTE */}
        <p className="mt-10 text-xs sm:text-sm text-white/40 text-center">
          Don’t see the right track?{" "}
          <a
            href="mailto:hello@dendrites.ai?subject=General%20interest%20@%20Dendrites&body=Hi%20Dendrites%20team%2C%0A%0AHere%E2%80%99s%20my%20resume%20%2F%20portfolio%20for%20future%20internship%20or%20full-time%20roles.%20Quick%20snapshot%3A%0A-%20Background%20and%20focus%3A%0A-%20Links%20(resume%20%2B%20portfolio)%3A%0A-%20Where%20I%20can%20add%20leverage%3A%0A%0ALooking%20forward%20to%20connecting!%0A%0ABest%2C%0A%5BYour%20name%5D"
            className="underline decoration-white/30 hover:decoration-[#1850ebff] hover:text-white/80 transition-colors"
          >
            Send a general application
          </a>
          .
        </p>
      </div>
    </section>
  );
}
