import { Bullets, ContentSlide, b } from "../components/slideKit";

export function Slide19Contents() {
  return (
    <ContentSlide title="Contents">
      <Bullets
        size="sm"
        lines={[
          b("What is a cdn"),
          b("Why cloudflare has bigmarkshare, 60%, explain other % makeup"),
          b("Why is it so centralised"),
          b("Consequence of centralised"),
          b("Impact, what can we do?"),
          b(
            "Multi cloud is not a solution to this, ends up w lower uptime + slower velocity",
          ),
          b("Impact on us"),
          b("Postcode search going down"),
          b(
            "Surface areamatters, easy to have backups for smaller surface areas",
          ),
          b("Cloudflare vs Vercel"),
          b("Politics fragmentation hurts the user"),
        ]}
      />
    </ContentSlide>
  );
}
