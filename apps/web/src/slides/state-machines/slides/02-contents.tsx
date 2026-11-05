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
          b("Worked example: a fictional cart with a state machine"),
          b("The same cart with a free-form approach (and its risks)"),
        ]}
      />
    </ContentSlide>
  );
}
