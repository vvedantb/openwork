import { Bullets, ContentSlide, b } from "../components/slideKit";

export function Slide17NoSql() {
  return (
    <ContentSlide title="Con 4 – Doesn’t run SQL">
      <Bullets
        lines={[
          b(
            "Convex uses a custom document store, which means it can’t run SQL queries",
          ),
          b("Issue for data exports that use SQL"),
          b("For data exports, would need to export data into somewhere else*"),
        ]}
      />
    </ContentSlide>
  );
}
