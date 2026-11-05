import { Bullets, ContentSlide, b } from "../components/slideKit";

export function Slide11XState() {
  return (
    <ContentSlide title="6. Introducing XState">
      <Bullets
        size="sm"
        lines={[
          b("XState is a library for creating and managing state machines"),
          b(
            "Its main purpose is to ensure structured, predictable, and scalable state management",
          ),
          b(
            "You use XState to define state machines in code (well, abstractions of them at least)",
          ),
          b("It offers developers a simpler way to define complex state logic"),
          b(
            "Just need to define the states, transitions, event handlers, and inputs/outputs of the machine",
          ),
          b(
            "Replaces traditional state management techniques and removes need for complex operation use (useState and useEffect combinations)",
          ),
        ]}
      />
    </ContentSlide>
  );
}
