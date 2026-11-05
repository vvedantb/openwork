import { Bullets, ContentSlide, b, gap, sub } from "../components/slideKit";

export function Slide16FreeFormRisks() {
  return (
    <ContentSlide
      title="Free-form approach: risks"
      tag="Example app · fictional cart"
    >
      <Bullets
        size="sm"
        lines={[
          b("Race conditions"),
          sub(
            "Adding an item triggers several async steps: fetch the unit price, recalculate the total, update the item count, save the cart",
          ),
          sub(
            "These can finish in any order – the total and the item count can get out of sync",
          ),
          sub("The same happens when editing or removing an item mid-update"),
          gap,
          b("Illegal states"),
          sub(
            "Partial updates: the user edits a row while a recalculation is pending, so the total no longer matches the rows",
          ),
          sub(
            "Display vs stored data: the page shows the right totals, but the stored form values differ – so checkout could submit something else",
          ),
        ]}
      />
    </ContentSlide>
  );
}
