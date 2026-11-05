import { SlideItem, SlideStagger } from "@/slides/platform/SlideShell";
import { ContentSlide } from "../components/slideKit";

const CHILDREN = [
  {
    name: "LineItemList",
    note: "One row per item: name, quantity, line total",
  },
  { name: "AddItemForm", note: "Draft item the user is typing in" },
  { name: "TotalsPanel", note: "Item count and order total" },
];

/** Generic parent/child diagram: which components read the shared state. */
export function Slide10ComponentTree() {
  return (
    <ContentSlide title="5. Types of state" tag="Example app · fictional cart">
      <SlideStagger
        className="flex flex-1 flex-col items-center justify-center gap-10"
        delayChildren={0.15}
      >
        <SlideItem>
          <div className="rounded-2xl bg-surface-secondary px-10 py-5 text-center">
            <p className="font-mono text-2xl font-semibold text-foreground">
              CartPage
            </p>
            <p className="mt-1 text-base text-muted">
              Parent — owns the global cart state
            </p>
          </div>
        </SlideItem>
        <SlideItem>
          <div className="grid grid-cols-3 gap-6">
            {CHILDREN.map((child) => (
              <div
                key={child.name}
                className="w-80 rounded-2xl border border-border px-6 py-5 text-center"
              >
                <p className="font-mono text-xl font-semibold text-foreground">
                  {child.name}
                </p>
                <p className="mt-2 text-base text-muted">{child.note}</p>
              </div>
            ))}
          </div>
        </SlideItem>
        <SlideItem>
          <p className="text-lg text-muted">
            All three children read and update the same state, so it has to live
            above them
          </p>
        </SlideItem>
      </SlideStagger>
    </ContentSlide>
  );
}
