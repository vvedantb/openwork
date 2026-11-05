import { Bullets, ContentSlide, Figure, b, gap } from "../components/slideKit";

export function Slide16PoliticalImpact() {
  return (
    <ContentSlide title="Political impact">
      <div className="flex min-h-0 flex-1 gap-10">
        <div className="flex-1">
          <Bullets
            lines={[
              b("Fragmentation will only hurt the user"),
              b(
                "Less investment into global infra = Lower availability and More downtime",
              ),
              gap,
              b(
                "We haven’t seen even more downtime because these companies have a lot at stake",
              ),
              b("More customers, more revenue, and more scrutiny"),
              b("They need to prevent outages and maintain >99% uptime"),
            ]}
          />
        </div>
        <Figure
          src="/media/slides/cloudflare-outage/slide16-1.webp"
          alt="Benzinga headline: Elizabeth Warren blasts Amazon for internet meltdown, says “If a company can break the entire internet, they are too big”"
          className="w-[340px]"
        />
      </div>
    </ContentSlide>
  );
}
