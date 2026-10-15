import { RotatingShowcase } from "../components/RotatingShowcase";

export function Slide15Showcase() {
  return (
    <RotatingShowcase
      kicker="Showcase"
      title="The product, today."
      panels={[
        {
          src: "/media/slides/intro-to-vmem/app-graph.png",
          label: "Memory graph",
        },
        { src: "/media/slides/intro-to-vmem/app-home.png", label: "Dashboard" },
        {
          src: "/media/slides/intro-to-vmem/app-memories.png",
          label: "Memories",
        },
      ]}
    />
  );
}
