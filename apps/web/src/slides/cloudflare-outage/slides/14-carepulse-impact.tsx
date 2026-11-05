import { Bullets, ContentSlide, b } from "../components/slideKit";

export function Slide14CarePulseImpact() {
  return (
    <ContentSlide title="Impact on CarePulse - what can we do?">
      <Bullets
        lines={[
          b("Postcode search went down"),
          b(
            "Blast radius/Surface area matters, easy to have backups for smaller surface areas",
          ),
          b(
            "If postcode search is down, use different API to keep the search available",
          ),
          b(
            "Fine to manage for small stuff, operational overhead increases as blast radius widens",
          ),
          b(
            "Having backups for everything is unrealistic, need to be more selective",
          ),
        ]}
      />
    </ContentSlide>
  );
}
