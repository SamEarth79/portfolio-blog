import Chapter from "@/components/Chapter";

export default function ShowcasePlaceholder() {
  return (
    <Chapter background="navy" className="items-start px-6 sm:px-10">
      <p className="text-xs uppercase tracking-[0.35em] text-accent">
        Showcase
      </p>
      <h2 className="mt-4 max-w-2xl font-display text-4xl font-bold uppercase leading-tight text-offwhite sm:text-6xl">
        Selected work lands here next.
      </h2>
    </Chapter>
  );
}
