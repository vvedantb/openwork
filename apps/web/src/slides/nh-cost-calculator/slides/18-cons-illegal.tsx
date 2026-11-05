import { Bullets, ContentSlide, b, gap, sub } from "../components/slideKit";

export function Slide18ConsIllegal() {
  return (
    <ContentSlide title="Cons of DC implementation vs NH">
      <Bullets
        lines={[
          b("Illegal states"),
          gap,
          b("Partial updates during calculations"),
          sub(
            "Users can modify rows while a calculation is pending -> total cost doesn’t match actual row calculations",
          ),
          gap,
          b("Inconsistent form and calculator states"),
          sub(
            "Page might show correct values but the form could actually store different values, so it shows correct but when submitting a SUPA it could potentially be different (if any action becomes out of sync)",
          ),
        ]}
      />
    </ContentSlide>
  );
}
