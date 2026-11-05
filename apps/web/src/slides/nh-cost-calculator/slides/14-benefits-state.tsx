import { Bullets, ContentSlide, b, plain, sub } from "../components/slideKit";

export function Slide14BenefitsState() {
  return (
    <ContentSlide title="Benefits of NH implementation vs DC">
      <Bullets
        size="sm"
        lines={[
          b("In our calculator, state (data) here includes:"),
          sub("Total Care hours"),
          sub("Total weekly cost"),
          sub("Each care row data"),
          sub("Add care data"),
          sub("Is it currently calculating?"),
          plain(
            "Predictable behaviour (because I have defined all the states and transitions that there can be) – this prevents impossible states and race conditions",
          ),
          plain("All state is centralised in the machine"),
          plain(
            "System can only be in 1 state at a time (and these states are defined explicitly)",
          ),
          plain("State updates follow transitions described above"),
          plain(
            "Actions are processed sequentially only, meaning no race conditions can occur here",
          ),
        ]}
      />
    </ContentSlide>
  );
}
