import Chapter from "@/components/Chapter";
import ContourField from "@/components/ContourField";

export default function Outro() {
  return (
    <Chapter background="warm" className="items-center text-center">
      <ContourField />
      <div className="relative z-10 flex flex-col items-center gap-6 px-6">
        <p className="text-[10px] uppercase tracking-[0.35em] text-ink/50">
          More Below
        </p>
        <h2 className="font-display text-[9vw] font-bold uppercase leading-none tracking-tight text-ink sm:text-[6vw]">
          Projects, Experience &amp; Education
        </h2>
        <p className="font-serif text-lg italic text-ink/60">
          Coming in the next phase.
        </p>
      </div>
    </Chapter>
  );
}
