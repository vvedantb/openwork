import { Bullets, ContentSlide, b, gap, sub } from "../components/slideKit";

export function Slide09TypesOfState() {
  return (
    <ContentSlide title="5. Types of state">
      <Bullets
        size="sm"
        lines={[
          b("Local state"),
          sub("Exists only within a component"),
          sub("Used for basic components"),
          sub("E.g. simple forms with only a couple inputs, UI toggles"),
          gap,
          b("Global state"),
          sub("Shared across multiple components"),
          sub(
            "E.g. Calculator row component and Details calculation component on cost calculator",
          ),
          sub("Usually managed using libraries (e.g. XState)"),
          gap,
          b("URL state (e.g. /sent-supas/?page=2)"),
        ]}
      />
    </ContentSlide>
  );
}
