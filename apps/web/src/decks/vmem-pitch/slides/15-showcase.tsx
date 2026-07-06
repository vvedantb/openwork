import { RotatingShowcase } from "../components/RotatingShowcase";

export function Slide15Showcase() {
  return (
    <RotatingShowcase
      kicker="Showcase"
      title="The product, today."
      panels={[
        { src: "/decks/vmem-pitch/app-graph.png", label: "Memory graph" },
        { src: "/decks/vmem-pitch/app-home.png", label: "Dashboard" },
        { src: "/decks/vmem-pitch/app-memories.png", label: "Memories" },
      ]}
    />
  );
}
