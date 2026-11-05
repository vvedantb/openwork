import { Bullets, ContentSlide, b, sub } from "../components/slideKit";

export function Slide12NhImplementation() {
  return (
    <ContentSlide title="Nursing homes implementation">
      <Bullets
        lines={[
          b("5 event handlers"),
          sub(
            "Input change – This occurs every time a user enter hours into the calculator, it calculates the cost and displays this in the preview card",
          ),
          sub(
            "Calculate – This calculates the total cost and adds a care row entry in the total cost",
          ),
          sub("Edit care – Used to edit a specific row"),
          sub("Delete care – Delete a specific row"),
          sub("Reset – Delete all rows"),
        ]}
      />
    </ContentSlide>
  );
}
