import { Bullets, ContentSlide, b, gap, plain } from "../components/slideKit";

export function Slide16BenefitsReliable() {
  return (
    <ContentSlide title="Benefits of NH implementation vs DC">
      <Bullets
        size="sm"
        lines={[
          b("Faster calculations due to reduced complexity"),
          b("Easier to understand the logic as it’s simpler and more readable"),
          b(
            "A state machine is essentially flowchart that’s being enforced in code – the user can only move through predefined valid paths",
          ),
          b("Changes follow a strict path"),
          b("Invalid state are impossible to enter by design"),
          gap,
          plain("Reduced future maintenance"),
          plain("+ Faster to implement features"),
          plain("= A more reliable system (and a happy developer ☺)"),
        ]}
      />
    </ContentSlide>
  );
}
