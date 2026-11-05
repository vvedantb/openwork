import { Bullets, ContentSlide, b } from "../components/slideKit";

export function Slide08StateManagement() {
  return (
    <ContentSlide title="4. State management">
      <Bullets
        size="sm"
        lines={[
          b(
            "As mentioned before, state is the current status of an application at any given time",
          ),
          b(
            "State management = controlling how that state changes over time in a predictable way",
          ),
          b(
            "This means having control over the state changes in an application",
          ),
          b(
            "By using state machines, we give control to the developers to reduce side effects and edge cases by enforcing strict state transitions",
          ),
          b("There are popular libraries that allow us to manage state"),
          b("XState is what we use to create these state machines in code"),
          b("Different types of state,"),
        ]}
      />
    </ContentSlide>
  );
}
