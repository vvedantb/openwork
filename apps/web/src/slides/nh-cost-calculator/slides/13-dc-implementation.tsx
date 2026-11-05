import { Bullets, ContentSlide, b } from "../components/slideKit";

export function Slide13DcImplementation() {
  return (
    <ContentSlide title="Domcare implementation">
      <Bullets
        lines={[
          b("Does not use state machines"),
          b("Uses a more ‘free form’ state management approach"),
          b("State is distributed across multiple locations"),
          b(
            "No explicit states defined like in a state machine – this means that transitions between states can happen with any action, the actions/events are not defined",
          ),
          b(
            "Multiple state changes can happen simultaneously (can lead to inconsistency)",
          ),
        ]}
      />
    </ContentSlide>
  );
}
