import { Bullets, ContentSlide, b, gap, plain } from "../components/slideKit";

export function Slide05Components() {
  return (
    <ContentSlide title="2.2 Key components of a state machine">
      <Bullets
        lines={[
          plain("States"),
          b(
            "These are the various situations a system can be in (which depends on the previous inputs)",
          ),
          gap,
          plain("Transitions"),
          b("These define how states change based on inputs"),
          gap,
          plain("Events"),
          b("These are triggers that cause state transitions"),
        ]}
      />
    </ContentSlide>
  );
}
