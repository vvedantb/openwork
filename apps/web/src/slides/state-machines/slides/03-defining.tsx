import { Bullets, ContentSlide, b } from "../components/slideKit";

export function Slide03Defining() {
  return (
    <ContentSlide title="1. Defining state and machine">
      <Bullets
        lines={[
          b(
            "A state in software is used to represent all the data that can change on a page",
          ),
          b(
            "State represents all the data that changes between opening and closing a page",
          ),
          b(
            "State describes what the system is doing and how it should behave",
          ),
          b("A machine is a system that takes inputs and produces outputs"),
          b(
            "Machines are defined by rules that we create that determine how it reacts to any change",
          ),
        ]}
      />
    </ContentSlide>
  );
}
