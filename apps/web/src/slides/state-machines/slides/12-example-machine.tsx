import { SlideReveal } from "@/slides/platform/SlideShell";
import { Bullets, ContentSlide, b, sub } from "../components/slideKit";

/** Illustrative XState v5 config — a fictional cart, not real app code. */
const MACHINE_SNIPPET = `const cartMachine = setup({ /* ... */ }).createMachine({
  id: "cart",
  initial: "idle",
  context: { items: [], itemCount: 0, total: 0 },
  states: {
    idle: {
      on: {
        INPUT_CHANGE: { actions: "updatePreview" },
        ADD_ITEM: "calculating",
        EDIT_ITEM: "calculating",
        REMOVE_ITEM: "calculating",
        RESET: { actions: "clearCart" },
      },
    },
    calculating: {
      invoke: {
        src: "recalculateTotals",
        onDone: { target: "idle", actions: "applyTotals" },
      },
    },
  },
});`;

export function Slide12ExampleMachine() {
  return (
    <ContentSlide
      title="7. Worked example: a cart machine"
      tag="Example app · fictional cart"
    >
      <div className="flex min-h-0 flex-1 gap-10">
        <div className="w-[480px] shrink-0">
          <Bullets
            size="sm"
            lines={[
              b("5 events"),
              sub("INPUT_CHANGE – preview the line total as the user types"),
              sub("ADD_ITEM – add a line item and recalculate totals"),
              sub("EDIT_ITEM – change one line item"),
              sub("REMOVE_ITEM – delete one line item"),
              sub("RESET – empty the cart"),
              b("2 states: idle and calculating"),
            ]}
          />
        </div>
        <SlideReveal delay={0.3} className="min-w-0 flex-1">
          <pre className="h-full overflow-hidden rounded-2xl bg-surface-secondary p-6 font-mono text-[13px] leading-normal text-foreground">
            {MACHINE_SNIPPET}
          </pre>
        </SlideReveal>
      </div>
    </ContentSlide>
  );
}
