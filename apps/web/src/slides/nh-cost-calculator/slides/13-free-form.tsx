import { Bullets, ContentSlide, b } from "../components/slideKit";

export function Slide13FreeForm() {
  return (
    <ContentSlide
      title="8. The same cart, free-form"
      tag="Example app · fictional cart"
    >
      <Bullets
        lines={[
          b("Does not use a state machine"),
          b(
            "Uses a ‘free form’ approach: several useState and useEffect hooks",
          ),
          b("State is distributed across multiple components"),
          b(
            "No explicit states defined like in a state machine – transitions can happen on any action, because the events are not defined",
          ),
          b(
            "Multiple state changes can happen simultaneously (can lead to inconsistency)",
          ),
        ]}
      />
    </ContentSlide>
  );
}
