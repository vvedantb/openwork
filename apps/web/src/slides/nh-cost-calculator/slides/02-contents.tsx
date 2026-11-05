import { Bullets, ContentSlide, b } from "../components/slideKit";

export function Slide02Contents() {
  return (
    <ContentSlide title="Contents">
      <Bullets
        numbered
        lines={[
          b("Defining state and machine"),
          b("What is a state machine?"),
          b("Basic state machine diagram + example"),
          b("What is state management?"),
          b("Types of state"),
          b("Introducing XState"),
          b("Reviewing NH implementation with XState (and its pros)"),
          b("DC implementation with the traditional approach (and its cons)"),
        ]}
      />
    </ContentSlide>
  );
}
