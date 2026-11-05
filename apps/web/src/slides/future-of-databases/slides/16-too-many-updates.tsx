import { Bullets, ContentSlide, b, gap, sub } from "../components/slideKit";

export function Slide16TooManyUpdates() {
  return (
    <ContentSlide title="Con 3 – Too many live updates!">
      <Bullets
        lines={[
          b(
            "Page can be too reactive if too many updates occur at the same time",
          ),
          b("Would be an issue for filters/sorting methods in a list"),
          b("Case by case issue"),
          sub("only applies for pages that have significant updates actions"),
          sub(
            "E.g. 100 users updating the status of something at the same time",
          ),
          gap,
          b("Example: AQP list"),
        ]}
      />
    </ContentSlide>
  );
}
