import { Bullets, ContentSlide, b } from "../components/slideKit";

export function Slide10Consequences() {
  return (
    <ContentSlide title="Consequences of centralisation">
      <Bullets
        lines={[
          b("Blast radius"),
          b(
            "Single provider outage produces simultaneous failures across many customers",
          ),
          b(
            "CDN is not only used for speed, but also security and authentication",
          ),
          b("When those features become unavailable, services can fail"),
        ]}
      />
    </ContentSlide>
  );
}
