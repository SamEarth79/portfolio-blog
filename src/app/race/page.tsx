import type { Metadata } from "next";
import TypingRace from "@/components/race/TypingRace";

export const metadata: Metadata = {
  title: "Race Me | Samarth M M",
  description: "Think you can beat me? A 30 second typing race.",
};

export default function RacePage() {
  return <TypingRace />;
}
