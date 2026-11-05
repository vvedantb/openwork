import { Bullets, ContentSlide, b, sub } from "../components/slideKit";

export function Slide13Responsive() {
  return (
    <ContentSlide title="Benefit 6 – More responsive" tag="USERS PERSPECTIVE">
      <Bullets
        size="sm"
        lines={[
          b("Automatic caching"),
          b(
            "Convex automatically caches user actions, so the next time you visit a page it should be faster than the first",
          ),
          b("May not be completely visible right now"),
          sub(
            "Convex only has US regions available but once EU regions are added it should be even faster",
            true,
          ),
          b(
            "Pages should load (almost) INSTANTLY (reducing the usage of a loading spinning UI indicator)",
          ),
          b("Most of our performance issues came from Supabase (what we use)"),
        ]}
      />
    </ContentSlide>
  );
}
