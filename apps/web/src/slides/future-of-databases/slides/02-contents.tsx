import { Bullets, ContentSlide, b } from "../components/slideKit";

export function Slide02Contents() {
  return (
    <ContentSlide title="Contents">
      <Bullets
        lines={[
          b("Benefits"),
          b("Drawbacks"),
          b("AI features"),
          b("Using Convex with AI"),
        ]}
      />
    </ContentSlide>
  );
}
