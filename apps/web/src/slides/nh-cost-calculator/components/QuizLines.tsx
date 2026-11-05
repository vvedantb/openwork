import { Bullets, b } from "./slideKit";

/** Fill-in-the-blanks recap shared by the last two slides (same in source). */
export function QuizLines() {
  return (
    <Bullets
      lines={[
        b("State machine is ____"),
        b("They are used to ___"),
        b("Used in NH implementation so that ___"),
        b("DC implementation uses ____"),
        b("Benefit it provides over DC implementation is ____"),
        b("More benefits of state machines include: _____"),
      ]}
    />
  );
}
