import { RotatingShowcase } from "../components/RotatingShowcase";

export function Slide34Surfaces() {
  return (
    <RotatingShowcase
      kicker="More of the app"
      title="Built for your whole workflow."
      panels={[
        { src: "/media/slides/intro-to-vmem/app-skills.png", label: "Skills" },
        { src: "/media/slides/intro-to-vmem/app-home.png", label: "Dashboard" },
        {
          src: "/media/slides/intro-to-vmem/app-connectors.png",
          label: "Connectors",
        },
      ]}
    />
  );
}
