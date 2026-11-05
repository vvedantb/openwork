import { ContentSlide, Figure } from "../components/slideKit";

export function Slide07DiagramExample() {
  return (
    <ContentSlide title="3.2 State machine diagram example">
      <Figure
        src="/media/slides/nh-cost-calculator/slide07-1.webp"
        alt="Traffic light state machine: red, red + amber, green and amber states, each moved on by a timer-expires action"
        className="flex-1"
      />
    </ContentSlide>
  );
}
