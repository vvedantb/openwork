import { Bullets, ContentSlide, b } from "../components/slideKit";

export function Slide11XState() {
  return (
    <ContentSlide title="6. Introducing XState">
      <Bullets
        size="sm"
        lines={[
          b(
            "XState is a library that we use to create and manage state machines",
          ),
          b(
            "Its main purpose is to ensure structured, predictable, and scalable state management",
          ),
          b(
            "We use Xstate to create state machines in code (well abstractions of it at least)",
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
