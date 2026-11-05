import { Bullets, ContentSlide, b, sub } from "../components/slideKit";

export function Slide13Outsourcing() {
  return (
    <ContentSlide title="Finding the balance of outsourcing work">
      <Bullets
        size="sm"
        lines={[
          b("Solution is not to develop everything ourselves"),
          b(
            "We must rely on third-party services for parts of a system, not everything can be done locally",
          ),
          b(
            "We have authentication because we need it, but we aren’t experts in auth, so it is better to outsource this to someone else who does specialise in it",
          ),
          sub("WorkOS"),
          b("If they have an outage, then so do you"),
          b(
            "Finding the right balance between outsourcing and developing locally is key",
          ),
        ]}
      />
    </ContentSlide>
  );
}
