import {
  Bullets,
  ContentSlide,
  Figure,
  gap,
  plain,
} from "../components/slideKit";

export function Slide06Diagram() {
  return (
    <ContentSlide title="3.1 State machine diagram">
      <div className="flex min-h-0 flex-1 gap-12">
        <div className="flex-1">
          <Bullets
            lines={[
              plain("State is a circle"),
              gap,
              gap,
              plain("Transition is an arrow"),
              gap,
              gap,
              plain("What causes a transition to occur =  an event / action"),
            ]}
          />
        </div>
        <Figure
          src="/media/slides/state-machines/slide06-1.webp"
          alt="Hand-drawn key: a circle labelled state, an arrow labelled transition, and events/actions as what causes the transition"
          className="w-[440px]"
        />
      </div>
    </ContentSlide>
  );
}
