import { Bullets, ContentSlide, b, gap } from "../components/slideKit";

export function Slide04WhatIs() {
  return (
    <ContentSlide title="2.1 What is a state machine?">
      <Bullets
        lines={[
          b(
            "A state machine is a model that contains a finite set of a states, transitions, and actions based on events",
          ),
          gap,
          b("It is a very powerful tool for managing complex logic"),
          gap,
          b(
            "State machines have various use cases, but the main use case here is state management",
          ),
          gap,
          b("There are 3 main components to a state machine…"),
        ]}
      />
    </ContentSlide>
  );
}
