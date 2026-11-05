import {
  Bullets,
  ContentSlide,
  b,
  gap,
  plain,
  sub,
} from "../components/slideKit";

export function Slide14BenefitsCentralised() {
  return (
    <ContentSlide
      title="State machine approach: benefits"
      tag="Example app · fictional cart"
    >
      <Bullets
        size="sm"
        lines={[
          b("In the example cart, state (data) includes:"),
          sub("Item count, order total, each line item, the add-item draft"),
          sub("Is it currently calculating?"),
          gap,
          plain(
            "Predictable behaviour – every state and transition is defined up front, which prevents impossible states and race conditions",
          ),
          plain("All state is centralised in the machine"),
          plain(
            "The system can only be in 1 state at a time, and each state is explicit",
          ),
          plain(
            "Events are processed one at a time, so no race conditions can occur here",
          ),
          plain(
            "Atomic updates – related values (items, count, total) change together, so totals never go stale",
          ),
          plain("Calculations finish before the next state change starts"),
        ]}
      />
    </ContentSlide>
  );
}
