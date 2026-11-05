import { BeforeAfter } from "../components/BeforeAfter";
import { Bullets, ContentSlide, b } from "../components/slideKit";

export function Slide20Primitives() {
  return (
    <ContentSlide title="Using Convex with AI – Primitives">
      <Bullets
        size="sm"
        lines={[
          b(
            "Convex abstracts all the complexities that occur when interacting with a database at a lower level - it hides all this magic away so devs can focus on implementing features instead",
          ),
        ]}
      />
      <div className="mt-6 flex min-h-0 flex-1">
        <BeforeAfter
          before={{
            src: "/media/slides/future-of-databases/slide20-3.webp",
            alt: "Diagram: with other database providers, developers or AI handle schemas, application code, business logic, type safety, consistency, realtime updates and caching",
          }}
          after={{
            src: "/media/slides/future-of-databases/slide20-2.webp",
            alt: "Diagram: with Convex, developers or AI handle schemas, application code and business logic; Convex handles type safety, consistency, ACID, caching and realtime updates",
          }}
        />
      </div>
    </ContentSlide>
  );
}
