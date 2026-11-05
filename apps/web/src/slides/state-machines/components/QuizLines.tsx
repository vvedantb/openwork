import { Bullets, b } from "./slideKit";

/** Fill-in-the-blanks recap for the final slide. */
export function QuizLines() {
  return (
    <Bullets
      lines={[
        b("A state machine is ____"),
        b("They are used to ___"),
        b("In the cart machine, events are processed ___"),
        b("The free-form cart spreads its state across ____"),
        b("Two risks of the free-form approach are ____ and ____"),
        b("More benefits of state machines include: _____"),
      ]}
    />
  );
}
