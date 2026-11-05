import { Bullets, ContentSlide, b } from "../components/slideKit";

export function Slide03LiveUpdates() {
  return (
    <ContentSlide title="Benefit 1 – Live updates">
      <Bullets
        lines={[
          b(
            "Example: User A posts an announcement. User B is already on the announcements page.",
          ),
          b(
            "Without live updates → User B needs to refresh the page to view the latest announcement",
          ),
          b(
            "Benefit: With Convex, updates appear instantly, no refresh is needed",
          ),
          b("Problem it solves: Prevents users from acting on outdated data"),
          b(
            "User A and User B viewing different latest announcements is called data inconsistency (outdated data)",
            true,
          ),
        ]}
      />
    </ContentSlide>
  );
}
