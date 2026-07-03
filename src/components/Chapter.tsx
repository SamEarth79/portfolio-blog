import { ReactNode } from "react";

const BG_CLASS = {
  warm: "bg-warm text-ink",
  charcoal: "bg-charcoal text-offwhite",
  navy: "bg-navy text-offwhite",
  olive: "bg-olive text-offwhite",
} as const;

export type ChapterBackground = keyof typeof BG_CLASS;

export default function Chapter({
  background,
  children,
  className = "",
  id,
}: {
  background: ChapterBackground;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`relative flex min-h-screen w-full flex-col justify-center overflow-hidden ${BG_CLASS[background]} ${className}`}
    >
      {children}
    </section>
  );
}
