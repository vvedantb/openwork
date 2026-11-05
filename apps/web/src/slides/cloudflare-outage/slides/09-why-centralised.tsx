import { Bullets, ContentSlide, b, sub } from "../components/slideKit";

export function Slide09WhyCentralised() {
  return (
    <ContentSlide title="Why is it so centralised?">
      <Bullets
        size="sm"
        lines={[
          b("Economies of scale"),
          b("They invest heavily in servers globally"),
          sub(
            "Smaller providers cannot match the price/performance that they offer",
          ),
          b("Network effects, positive feedback loop"),
          sub("Bigger → Cheaper → More customers → Grows even bigger"),
          b(
            "It’s easier, cheaper, safer, and faster than doing everything yourself",
          ),
          b(
            "Running your own instance of Cloudflare’s services is complex, pretty much impossible to the scale that Cloudflare offers unless you are big tech",
          ),
        ]}
      />
    </ContentSlide>
  );
}
