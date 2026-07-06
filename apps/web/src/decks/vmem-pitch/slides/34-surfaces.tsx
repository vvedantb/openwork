import { RotatingShowcase } from "../components/RotatingShowcase";

export function Slide34Surfaces() {
  return (
    <RotatingShowcase
      kicker="More of the app"
      title="Built for your whole workflow."
      panels={[
        { src: "/decks/vmem-pitch/app-skills.png", label: "Skills" },
        { src: "/decks/vmem-pitch/app-wiki.png", label: "Wiki" },
        { src: "/decks/vmem-pitch/app-connectors.png", label: "Connectors" },
      ]}
    />
  );
}
