import React from "react";

type StackedProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Stacks each child as a full-viewport sticky "slide".
 * Later slides sit above earlier ones as you scroll down.
 * NOTE: Keep the wrapper free of transform/perspective/filter/overflow:hidden.
 */
export default function StackedScrollLayout({ children, className }: StackedProps) {
  const slides = React.Children.toArray(children);
  return (
    <div className={`relative w-full isolate ${className ?? ""}`}>
      {slides.map((child, i) => (
        <section
          key={i}
          className="sticky top-0 h-[100svh] w-full"
          style={{ zIndex: i + 1 }}
        >
          <div className="h-full w-full">{child}</div>
        </section>
      ))}
    </div>
  );
}
