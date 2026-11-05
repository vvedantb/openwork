import { Bullets, ContentSlide, b, gap, plain } from "../components/slideKit";

export function Slide15BenefitsReliable() {
  return (
    <ContentSlide title="State machine approach: benefits">
      <Bullets
        size="sm"
        lines={[
          b("Less complex logic to run on each change"),
          b("Easier to understand the logic as it’s simpler and more readable"),
          b(
            "A state machine is essentially a flowchart that’s being enforced in code – the user can only move through predefined valid paths",
          ),
          b("Changes follow a strict path"),
          b("Invalid states are impossible to enter by design"),
          gap,
          plain("Reduced future maintenance"),
          plain("+ Faster to implement features"),
          plain("= A more reliable system (and a happy developer ☺)"),
        ]}
      />
    </ContentSlide>
  );
}
