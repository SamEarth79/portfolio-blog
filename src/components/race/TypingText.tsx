"use client";

import { memo, useEffect, useRef } from "react";

function TypingText({
  passage,
  typed,
  wf,
}: {
  passage: string;
  typed: string;
  wf: string;
}) {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const caretRef = useRef<HTMLSpanElement | null>(null);

  // Keeps the caret on the second visible line as the text advances
  useEffect(() => {
    const box = boxRef.current;
    const caret = caretRef.current;
    if (!box || !caret) return;
    const lineHeight = parseFloat(getComputedStyle(box).lineHeight);
    const line = Math.floor(caret.offsetTop / lineHeight);
    box.scrollTop = Math.max(0, line - 1) * lineHeight;
  }, [typed, passage]);

  return (
    <div
      ref={boxRef}
      data-wf={wf}
      className="relative h-[6.6em] overflow-hidden font-mono text-base leading-[2.2em] text-offwhite/35 sm:text-lg"
    >
      {passage.split("").map((char, i) => {
        const isTyped = i < typed.length;
        const isWrong = isTyped && typed[i] !== char;
        return (
          <span key={i}>
            {i === typed.length && (
              <span ref={caretRef} className="relative">
                <span className="absolute -left-px top-[0.1em] h-[1.2em] w-0.5 bg-accent" />
              </span>
            )}
            <span
              className={
                isWrong
                  ? "bg-red-500/30 text-red-300 underline decoration-wavy"
                  : isTyped
                    ? "text-offwhite"
                    : undefined
              }
            >
              {char}
            </span>
          </span>
        );
      })}
    </div>
  );
}

export default memo(TypingText);
