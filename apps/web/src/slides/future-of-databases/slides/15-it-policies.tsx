import { Bullets, ContentSlide, b } from "../components/slideKit";

export function Slide15ItPolicies() {
  return (
    <ContentSlide title="Con 2 – IT policies in other organisations">
      <Bullets
        lines={[
          b(
            "Convex uses WebSockets to connect to the database (which makes it live)",
          ),
          b(
            "Could be unencrypted in the past, IT policies blocked them for safety",
          ),
          b(
            "Today encryption is always used, but some orgs may still have old policies in place",
          ),
          b("Impact: Won’t affect majority, could affect a small minority"),
          b(
            "Should this be a concern? If we worry about this, should we also worry about supporting Internet Explorer users?",
            true,
          ),
        ]}
      />
    </ContentSlide>
  );
}
