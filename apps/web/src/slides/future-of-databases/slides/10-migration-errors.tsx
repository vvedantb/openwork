import { Bullets, ContentSlide, b, gap } from "../components/slideKit";

export function Slide10MigrationErrors() {
  return (
    <ContentSlide
      title="Benefit 5 – Handling migration errors"
      tag="DEV TEAM’S PERSPECTIVE"
    >
      <Bullets
        lines={[
          b("No migrations needed during review anymore"),
          gap,
          b(
            "Migrations could fail – would require resetting and reseeding the database",
          ),
          gap,
          b("Convex gives us warnings and prevents changes being applied"),
          gap,
          b(
            "With Convex, migrations are now decentralised - no reliance on Krzys to handle this for us anymore",
          ),
        ]}
      />
    </ContentSlide>
  );
}
