import { Bullets, ContentSlide, Figure, b, sub } from "../components/slideKit";

export function Slide11Mitigation() {
  return (
    <ContentSlide title="Impact mitigation - what can someone do?">
      <div className="flex min-h-0 flex-1 gap-10">
        <div className="flex-1">
          <Bullets
            size="sm"
            lines={[
              b(
                "Not many options available to fully prevent an outage, but some options to reduce the impact",
              ),
              b("Use cached data"),
              sub(
                "During the outage, the X app was still viewable, just couldn’t fetch new tweets or perform actions",
              ),
              b("Multi-cloud approach"),
              sub(
                "search for alternatives to Cloudflare and use them as backup during an outage",
              ),
            ]}
          />
        </div>
        <div className="flex min-h-0 w-[360px] flex-col gap-4">
          <Figure
            src="/media/slides/cloudflare-outage/slide11-1.webp"
            alt="A hand resting on grass"
            className="h-[150px]"
          />
          <Figure
            src="/media/slides/cloudflare-outage/slide11-2.webp"
            alt="Meme: “engineers everywhere pretending to ‘monitor the situation’ while refreshing the cloudflare status page”"
            className="flex-1"
          />
        </div>
      </div>
    </ContentSlide>
  );
}
