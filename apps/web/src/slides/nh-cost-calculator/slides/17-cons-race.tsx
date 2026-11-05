import { Bullets, ContentSlide, b, gap, sub } from "../components/slideKit";

export function Slide17ConsRace() {
  return (
    <ContentSlide title="Cons of DC implementation vs NH">
      <Bullets
        size="sm"
        lines={[
          b("Race conditions"),
          gap,
          b("Cost calculator race:"),
          sub(
            "When adding entry, 3 actions happen: Retrieve care rates from server, Calculate cost, Update total hours, Save calculation",
          ),
          b(
            "These changes can happen in any order - Total cost + total hours could get out of sync",
          ),
          gap,
          b("Edit/delete race"),
          gap,
          b("What if the above complete in the wrong order?"),
          b("It will save wrong data or show incorrect totals"),
        ]}
      />
    </ContentSlide>
  );
}
